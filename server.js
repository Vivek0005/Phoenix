const express = require("express");
const app = express();
const gadgetsRoutes = require("./src/routes/gadgetR");

//middlewares
app.use(express.json());
app.use("/gadgets", gadgetsRoutes);

// home page
app.get("/", (req, res) => {
    res.send("IMF GADGETS HOME PAGE");
})

// start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log("listening to incoming requests on port " + PORT)
})