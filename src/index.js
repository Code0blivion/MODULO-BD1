const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

const {
  configuraciónLibreria,
  getConexion,
  cerrarConexion,
  consultarRequerimiento,
  consultarFase,
  consultarConvocatoria,
  consultarInvitacion,
  consultarPerfil,
  inicializarFase,
  updateConvocatoria,
  getInvitados,
} = require("./static/scripts/database");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

configuraciónLibreria();

app.get("/", async (req, res) => {
  const conexion = await getConexion();
});

app.get("/lista_requerimientos", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/static/templates/lista_requerimientos.html")
  );
});

app.get("/req/:id", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/static/templates/detalle_requerimiento.html")
  );
});

app.get("/req2", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/static/templates/detalle_requerimiento2.html")
  );
});

app.get("/api/req/:id", async (req, res) => {
  const reqID = Number(req.params.id);
  const conexion = await getConexion();
  const reque = await consultarRequerimiento(conexion, reqID);
  const fase = await consultarFase(conexion, reqID);
  const convocatoria = await consultarConvocatoria(conexion, reqID);
  const invitacion = await consultarInvitacion(conexion, reqID);
  const perfil = await consultarPerfil(conexion, reqID);
  cerrarConexion(conexion);
  res.json({ reque, fase, convocatoria, invitacion, perfil });
});

app.post("/api/assignProfile", async (req, res) => {
  const { reqID, empID, profileID, currentDate, firstDate } = req.body;
  let conexion = await getConexion();
  await inicializarFase(
    conexion,
    reqID,
    empID,
    profileID,
    currentDate,
    firstDate
  );
  cerrarConexion(conexion);
  return res.status(200).send("Perfil Asignado Correctamente");
});

app.post("/create-convocatoria", async (req, res) => {
  const { convocatoriaText, reqID, currentDate } = req.body;
  let conexion = await getConexion();
  updateConvocatoria(conexion, reqID, convocatoriaText, currentDate);
  cerrarConexion();
  res.status(200).send("Convocatoria creada exitosamente");
});

app.get("/api/candidates/:id", async (req, res) => {
  const reqID = Number(req.params.id);
  let conexion = await getConexion();
  const invitados = await getInvitados(conexion, reqID);
  cerrarConexion();
  res.json({ invitados });
});

app.get("/opcionados", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/templates/lista_opcionados.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
