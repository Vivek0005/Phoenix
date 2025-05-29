const express = require("express");
const router = express.Router();
const generateCodename = require("../../utils/codeNameGenerator");
const generateProbabilty = require("../../utils/randomProbabilityGen");

// sample data
const gadgets = [
    { id: 1, name: "The Nightingale", status: "available" },
    { id: 2, name: "The Doraemon", status: "deployed" }
];

// get /gadgets route
router.get('/', (req, res) => {

    const response = gadgets.map(gadgets => ({
        ...gadgets,
        successRate: generateProbabilty()
    }));

    res.json(response);

})

// get particular gadget
router.get('/:id', (req, res) => {

    const gadgetId = parseInt(req.params.id);

    const gadget = gadgets.find(g => g.id === gadgetId)

    // check if gadget present
    if (gadget == null) {
        return res.status(404).json({ message: ` Gadget with id ${gadgetId} not found ` })
    }

    res.json(gadget);
})

// post request route
router.post('/', (req, res) => {
    const { status } = req.body;

    const newGadget = {
        id: gadgets.length + 1,
        name: generateCodename(),
        status: status || "available"
    }

    gadgets.push(newGadget);

    console.log("Gadget successfully created")

    res.status(201).json(newGadget);
})

// patch request route
router.patch('/:id', (req, res) => {
    const gadgetId = parseInt(req.params.id)
    const { name, status } = req.body;

    const gadget = gadgets.find(g => g.id === gadgetId);

    // check if gadget present
    if (gadget == null) {
        return res.status(404).json({ message: ` Gadget with id ${gadgetId} not found ` })
    }

    // check which field has been sent and just change them
    if (name) {
        gadget.name = name;
    }

    if (status) {
        gadget.status = status;
    }

    console.log("Gadget details modified successfully")

    res.json(gadget);
})

// delete request route (changing status to decomissioned)
router.delete('/:id', (req, res) => {
    const gadgetId = parseInt(req.params.id);
    // const { status } = req.body;

    const gadget = gadgets.find(g => g.id === gadgetId);

    // check if gadget present
    if (gadget == null) {
        return res.status(404).json({ message: ` Gadget with id ${gadgetId} not found ` })
    }

    // if already decomissioned let it be
    if (gadget.status === "decommissioned") {
        return res.status(400).json({ message: "Gadget is already decommissioned" })
    }

    gadget.status = "decommissioned"
    gadget.decommissionedAt = new Date().toISOString();

    res.status(201).json({ message: `Gadget ${gadget.name} successfully decommissioned` })
})

//post req to simulate self destrucution
router.post('/:id/self-destruct', (req, res) => {

    const gadgetId = parseInt(req.params.id);
    const gadget = gadgets.find(g => g.id === gadgetId);

    if (gadget == null) {
        return res.status(404).json({ message: `Gadget with id ${gadgetId} not found` });
    }

    // Generate a random confirmation code
    const confirmationCode = `DESTRUCT-IMF-${Math.floor(1000 + Math.random() * 90000)}`;

    res.json({
        message: `Self-destruct sequence initiated for ${gadget.name}`,
        confirmationCode
    });
});


// exporting all routes
module.exports = router;