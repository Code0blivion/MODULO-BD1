const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  configuraciónLibreria,
  getConexion,
  consultar,
  createRecord,
} = require("./static/scripts/database");

const app = express();

app.use(express.static(path.join(__dirname, "static")));

configuraciónLibreria();

app.get("/", async (req, res) => {
  const conexion = await getConexion();
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

app.get("/opcionados", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/templates/lista_opcionados.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
