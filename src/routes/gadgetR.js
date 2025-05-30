const express = require("express");
const router = express.Router();
const gadgetController = require("../controllers/gadgetC");
const authenticate = require("../middleware/authM");

// router.use(authenticate);

// GET /gadgets with optional status filter
router.get("/", gadgetController.getAllGadgets);

// GET a particular gadget
router.get("/:id", gadgetController.getGadgetById);

// POST a new gadget
router.post("/", authenticate, gadgetController.createGadget);

// PATCH to update a gadget
router.patch("/:id", authenticate, gadgetController.updateGadget);

// DELETE to decomission a gadget
router.delete("/:id", authenticate, gadgetController.decommissionGadget);

// POST to simulate self-destructionn
router.post("/:id/self-destruct", authenticate, gadgetController.selfDestruct);

module.exports = router;
