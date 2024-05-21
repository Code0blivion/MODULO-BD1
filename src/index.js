const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/templates/index.html"));
});

app.get("/lista_requerimientos", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/static/templates/lista_requerimientos.html")
  );
});

app.get("/req", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/static/templates/detalle_requerimiento.html")
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
