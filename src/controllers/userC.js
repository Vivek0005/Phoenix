const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "carrierbird";

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: "Email already in use and registered" });

        const hashedPassword = await bcrypt.hash(password, 15);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: "User registered Successfully", user: { id: user.id, email: user.email } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Registration failed" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: "User not registerd" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Login failed due to internal server error" });
    }
};
