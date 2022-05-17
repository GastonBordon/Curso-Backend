const express = require("express");
const router = express.Router();
const productosRouter = require("./productos.js");

router.use("/productos", productosRouter);

module.exports = router;
