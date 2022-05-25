// const express = require("express");

// const app = express();

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile("index.html", { root: "./views" });
// });

// app.get("/molestar", (req, res) => {
//   io.sockets.emit("JAJA!");
//   res.sendStatus(204);
// });

// io.on("connection", (socket) => {
//   console.log("alguien se conecto");
//   //   console.log(socket);
//   socket.emit("cnxOk", { fecha: new Date().toLocaleString() });
//   socket.on("ping", () => {
//     console.log(`socket '${socket.id}' dice PING`);
//   });
// });
