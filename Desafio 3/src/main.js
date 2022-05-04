const express = require("express");
const path = require("path");
const { Contenedor } = require("./contenedor.js");

const app = express();

const port = 8080;

const server = app.listen(port, () => {
  console.log("server listo. Escuchando en el puerto", port);
});

server.on("error", (error) => console.log(`error en servidor ${error}`));

app.get("/", (request, response) => {
  response.json({
    menssage: "hola desde la ruta principal",
  });
});

app.get("/productos", async (request, response) => {
  const products = await Contenedor.getAllFile();
  response.json({
    data: products,
  });
});

app.get("/productoRandom", async (request, response) => {
  const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const products = await Contenedor.getAllFile();
  const allIds = products.map((e) => e.id);
  const random = between(0, allIds.length);
  const idRandom = allIds[random];

  const productRandom = await Contenedor.getById(idRandom);
  response.json({
    data: productRandom,
  });
});
