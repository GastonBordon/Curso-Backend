const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const mainRouter = require("./routes/index");
const path = require("path");
const { engine } = require("express-handlebars");
const { Contenedor } = require("./contenedor.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const port = 8080;

const publicFolderPath = path.resolve(__dirname, "../public");
const layoutsFolderPath = path.resolve(__dirname, "./../views/layouts");
const defaultLayoutPath = path.resolve(
  __dirname,
  "./../views/layouts/index.hbs"
);

app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    layoutsDir: layoutsFolderPath,
    extname: "hbs",
    defaultLayout: defaultLayoutPath,
  })
);
app.use(express.static(publicFolderPath));

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("main", { layout: "index" });
});

let products = [];
let mensajes = [];
Contenedor.getAllFile()
  .then((data) => (products = data))
  .catch((error) => console.log(error));

app.use("/api", mainRouter);

const server = httpServer.listen(port, () => {
  console.log(`Escuchando en puerto ${server.address().port}`);
});

server.on("error", (err) => {
  console.log("Error de servidor atajado", err);
});

io.on("connection", (socket) => {
  console.log("alguien se conecto");

  //Enviar la info
  socket.emit("productos", products);

  //Escucha los cambios
  socket.on("product", (data) => {
    products = [...products, data];
    io.sockets.emit("productos", products);
  });

  socket.emit("chat", mensajes);
  socket.on("nuevoMensaje", (data) => {
    mensajes = [...mensajes, data];
    io.sockets.emit("chat", mensajes);
  });
});
