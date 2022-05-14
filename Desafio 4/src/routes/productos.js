const express = require("express");
const router = express.Router();
const { Contenedor } = require("../contenedor.js");

router.get("/", async (req, res) => {
  let products = await Contenedor.getAllFile();
  res.json({
    data: products,
  });
});

router.get("/:id", async (req, res) => {
  let productById = await Contenedor.getById(req.params.id);
  if (!productById) {
    res.json({
      error: "producto no encontrado",
    });
  } else {
    res.json({
      data: productById,
    });
  }
});

router.post("/", async (req, res) => {
  let addProduct = await Contenedor.saveInFile(req.body);
  res.json({
    data: addProduct,
  });
});

router.put("/:id", async (req, res) => {
  let productById = await Contenedor.getById(req.params.id);
  if (!productById) {
    res.json({
      error: "producto no encontrado",
    });
  } else {
    let newValues = req.body;
    for (const element in productById) {
      for (const elem in newValues) {
        if (element == elem) {
          productById[element] = newValues[elem];
        }
      }
    }
    await Contenedor.deleteById(req.params.id);
    await Contenedor.updateFile(productById);
    res.json({
      msg: productById,
    });
  }
});

router.delete("/:id", async (req, res) => {
  let productById = await Contenedor.getById(req.params.id);
  if (!productById) {
    res.json({
      error: "producto no encontrado",
    });
  } else {
    await Contenedor.deleteById(req.params.id);
    res.json({
      msg: "Se ha eliminado:",
      productById,
    });
  }
});

module.exports = router;
