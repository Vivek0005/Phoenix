const express = require("express");
const app = express();
const gadgetsRoutes = require("./src/routes/gadgetR");
const authRoutes = require("./src/routes/userR");

//middlewares
app.use(express.json());
app.use("/gadgets", gadgetsRoutes);
app.use("/auth", authRoutes);

// home page
app.get("/", (req, res) => {
    res.send("IMF GADGETS HOME PAGE, Please go to /gadgets");
})

// start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log("listening to incoming requests on port " + PORT)
})