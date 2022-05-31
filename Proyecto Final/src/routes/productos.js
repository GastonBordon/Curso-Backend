const express = require("express");
const router = express.Router();
const { ContenedorProductos } = require("../../controllers/productHandler.js");

router.get("/", async (req, res) => {
  let products = await ContenedorProductos.getAllFile();
  res.json({
    data: products,
  });
});

router.get("/:id", async (req, res) => {
  let productById = await ContenedorProductos.getById(req.params.id);
  if (!productById) {
    res.status(404).json({
      error: "NOT FOUND!!! 404 producto no encontrado",
    });
  } else {
    res.json({
      data: productById,
    });
  }
});

router.post("/", async (req, res) => {
  let addProduct = await ContenedorProductos.saveInFile(req.body);
  res.json({
    data: addProduct,
  });
});

router.put("/:id", async (req, res) => {
  let productById = await ContenedorProductos.getById(req.params.id);
  if (!productById) {
    res.status(404).json({
      error: "NOT FOUND!!! 404 producto no encontrado",
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
    await ContenedorProductos.deleteById(req.params.id);
    await ContenedorProductos.updateFile(productById);
    res.json({
      msg: productById,
    });
  }
});

router.delete("/:id", async (req, res) => {
  let productById = await ContenedorProductos.getById(req.params.id);
  if (!productById) {
    res.status(404).json({
      error: "NOT FOUND!!! 404 producto no encontrado",
    });
  } else {
    await ContenedorProductos.deleteById(req.params.id);
    res.json({
      msg: "Se ha eliminado:",
      productById,
    });
  }
});

module.exports = router;
