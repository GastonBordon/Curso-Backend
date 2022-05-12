const express = require("express");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 8080;
const server = app.listen(port, () => console.log("server up en puerto", port));

server.on("error", (err) => {
  console.log("Error de servidor atajado", err);
});

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({});
});

app.use("/api", mainRouter);

const publicFolderPath = path.resolve(__dirname, "../public");
app.use(express.static(publicFolderPath));
