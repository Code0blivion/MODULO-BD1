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
  mandarInvitaciones,
  getPreseleccionados,
  preseleccionar,
  getHeaderReq,
  getEmpleado,
  getCargo,
  getRequerimientos,
  getEmpleadoReq,
  getTiposCargo,
} = require("./static/scripts/database");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

configuraciónLibreria();

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/static/templates/login.html"));
});

app.post("/api/login", async (req, res) => {
  const { usuario, contrasena } = req.body;
  const conexion = await getConexion();
  let empID = await getEmpleado(conexion, usuario, contrasena);

  if (empID === undefined) {
    console.log("Credenciales incorrectas");
    return res.status(401).json({ error: "Credenciales incorrectas" });
  } else {
    let cargo = await getCargo(conexion, empID[0]);

    let redir;
    switch (cargo[0]) {
      case "001":
        break;
      case "002":
        redir = "/lista_requerimientos/" + empID;
        break;
      case "003":
        break;
      case "004":
        redir = "/lista_requerimientos/" + empID;
    }
    console.log(redir);
    cerrarConexion();
    return res.json({ redir });
  }
});

app.get("/registroEmpleado", async (req, res) => {
  res.sendFile(
    path.join(__dirname, "/static/templates/registro_empleado.html")
  );
});

app.get("/api/tiposCargo", async (req, res) => {
  const conexion = await getConexion();
  cargos = await getTiposCargo(conexion);
  res.json({ cargos });
});

app.get("/api/registroEmpleado", async (req, res) => {});

app.get("/api/requerimientos/:id", async (req, res) => {
  const empID = req.params.id;
  const conexion = await getConexion();
  const requerimientos = await getRequerimientos(conexion, empID);
  const empleado = await getHeaderReq(conexion, empID);
  const cargo = await getCargo(conexion, empID);
  cerrarConexion();
  res.json({ requerimientos, empleado, cargo });
});

app.get("/lista_requerimientos/:id", (req, res) => {
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
  const empid = await getEmpleadoReq(conexion, reqID);
  const empleado = await getHeaderReq(conexion, empid[0]);
  cerrarConexion(conexion);
  res.json({ reque, fase, convocatoria, invitacion, perfil, empleado });
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
  await updateConvocatoria(conexion, reqID, convocatoriaText, currentDate);
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

app.post("/api/invitation", async (req, res) => {
  const {
    reqID,
    invitationDetails,
    currentDate,
    invitationDateTime,
    selectedCandidates,
    profileID,
  } = req.body;

  const conexion = await getConexion();

  await mandarInvitaciones(
    conexion,
    reqID,
    invitationDetails,
    currentDate,
    invitationDateTime,
    selectedCandidates,
    profileID
  );

  cerrarConexion();

  res.status(200).json({ message: "Invitation sent successfully" });
});

app.get("/api/preseleccionados/:id", async (req, res) => {
  const reqID = Number(req.params.id);
  let conexion = await getConexion();
  const preseleccionados = await getPreseleccionados(conexion, reqID);
  cerrarConexion();
  res.json({ preseleccionados });
});

app.post("/api/preseleccion", async (req, res) => {
  const { reqID, currentDate, selectedCandidates, profileID } = req.body;

  const conexion = await getConexion();

  await preseleccionar(
    conexion,
    reqID,
    profileID,
    currentDate,
    selectedCandidates
  );

  cerrarConexion();

  res.status(200).json({ message: "Invitation sent successfully" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
