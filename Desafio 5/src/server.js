const express = require("express");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const path = require("path");
const { engine } = require("express-handlebars");
const { Contenedor } = require("./");

const app = express();
const port = 8080;
const server = app.listen(port, () => console.log("server up en puerto", port));

server.on("error", (err) => {
  console.log("Error de servidor atajado", err);
});

const publicFolderPath = path.resolve(__dirname, "../public");
const layoutsFolderPath = path.resolve(__dirname, "./../views/layouts");
const defaultLayoutPath = path.resolve(
  __dirname,
  "./../views/layouts/index.hbs"
);
app.set("view engine", "ejs");
//app.set("view engine", "hbs");   CONFIGURACION PARA HBS
// app.engine("hbs",engine({layoutsDir: layoutsFolderPath, extname: "hbs", defaultLayout: defaultLayoutPath})); CONFIGURACION PARA HBS
//app.set("view engine", "pug");  CONFIFURACION PARA PUG
app.use(express.static(publicFolderPath));

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("HOLA ");
  //res.render("layout");  CONFIGURACION PARA PUG
  //res.render("main", { layout: "index" });    CONFIGURACION PARA HBS
  res.render("layouts/index", { listProducts: false });
});

app.get("/productos", async (req, res) => {
  let products = await Contenedor.getAllFile();
  console.log(products);
  // res.render("layouts/index", { products, listProducts: true });
  console.log("hola");
  //res.render("layout", { products, listProducts: true }); CONFIGURACION PARA PUG
  //res.render("main", { products, listProducts: true });  CONFIGURACION PARA HBS
});

app.use("/api", mainRouter);
