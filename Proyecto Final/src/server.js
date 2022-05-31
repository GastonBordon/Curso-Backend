const express = require("express");
const mainRouter = require("./routes/index.js");

const app = express();

const port = 8080;

const server = app.listen(port, () => console.log("server up en puerto", port));

server.on("error", (err) => {
  console.log("Error de servidor atajado", err);
});

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Hola");
});

app.use("/api", mainRouter);
