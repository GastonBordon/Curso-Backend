const express = require("express");
const { CartContainer } = require("../../controllers/cartHandler.js");
const router = express.Router();

router.post("/", async (req, res) => {
  //CREA UN CARRITO Y DEVUELVE SU ID
  const cartId = await CartContainer.saveInFile();
  res.json({
    data: cartId,
  });
});

router.delete("/:id", (req, res) => {
  //VACIA UN CARRITO Y LO ELIMINA
});

router.get("/:id/productos", (req, res) => {
  //Lista DE TODOS LOS PRODUCTOS DENTRO DE ESTE CARRITO
});

router.post("/:id/productos", async (req, res) => {
  //INCORPORAR PRODUCTOS AL CARRITO POR EL PROD.ID
  const cart = await CartContainer.getById(req.params.id);
  console.log(cart);
  cart.productos.push(req.body.id);
  // CartContainer.deleteById(cart.id);
  // await CartContainer.updateFile(cart);
  res.send(console.log(cart));
});

router.delete("/:id/productos/:id_prod", (req, res) => {
  //ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y ID DE PRODUCTO
});

module.exports = router;
