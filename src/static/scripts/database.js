const oracle = require("oracledb");

function configuraciónLibreria() {
  //Configuración libreria Oracle

  let clientOpts = {};
  if (process.platform === "win32") {
    // Windows
    // If you use backslashes in the libDir string, you will
    // need to double them.
    clientOpts = { libDir: "C:\\oracle\\instantclient_21_13" };
  } else if (process.platform === "darwin" && process.arch === "x64") {
    // macOS Intel
    clientOpts = {
      libDir: process.env.HOME + "/Downloads/instantclient_21_13",
    };
  }
  // else on other platforms like Linux the system library search path MUST always be
  // set before Node.js is started, for example with ldconfig or LD_LIBRARY_PATH.

  // enable node-oracledb Thick mode
  oracle.initOracleClient(clientOpts);
}

async function run() {
  try {
    let con = await oracle.getConnection({
      user: "test1",
      password: "test1",
      connectString: "localhost/xe",
    });

    console.log("Conexión exitosa");
    return con;
  } catch (err) {
    console.log("Error al crear la conexión", err);
  }
}

async function getConexion() {
  try {
    const con = await run();
    return con;
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err; // Es importante lanzar el error para que la función que llama pueda manejarlo
  }
}

async function consultarRequerimiento(con, id) {
  try {
    const result = await con.execute(
      `SELECT FECHAREQUE, SALARIOMAX, SALARIOMIN,
       DESCFUNCION, DESCCARRERAS, NVVACANTES,
       EMP_CODEMPLEADO FROM REQUERIMIENTO
       WHERE CONSECREQUE = ${id}`
    );
    const rows = result.rows;
    console.log(result);
    return rows;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function consultarFase(con, id) {
  try {
    const result = await con.execute(
      `SELECT f.idFase, f.desFase, pr.fechaInicio
       FROM ProcesoRequerimiento pr
       JOIN PerfilFase pf on pf.idFasePerfilFase = pr.idFasePerfilFase and
       pf.idPerfilPerfilFase = pr.idPerfilProcCan JOIN Fase f on 
       pf.idFasePerfilFase = f.idFase JOIN Requerimiento r
       on pr.consecRequeProcReque = r.consecReque and r.consecReque = ${id}
       WHERE pr.fechaFin IS NULL
       order by f.idFase`
    );
    const rows = result.rows;

    let phase;
    if (rows.length === 0) {
      phase = ["2", "Asignar Perfil"];
    } else {
      phase = rows[0];
    }
    return phase;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function consultarConvocatoria(con, id) {
  try {
    const result = await con.execute(
      `SELECT PR.CONVOCATORIA FROM PROCESOREQUERIMIENTO PR JOIN REQUERIMIENTO R ON
       PR.CONSECREQUEPROCREQUE = R.CONSECREQUE JOIN PERFILFASE PF ON PF.IDFASEPERFILFASE =
       PR.IDFASEPERFILFASE AND PF.IDPERFILPERFILFASE = IDPERFILPROCCAN JOIN FASE F ON 
       F.IDFASE = PF.IDFASEPERFILFASE
       WHERE R.CONSECREQUE = ${id} AND F.IDFASE = '0003'`
    );
    const rows = result.rows;
    let convocatoria;
    if (rows.length === 0 || rows[0][0] == null) {
      convocatoria = "NO ha iniciado la fase de convocatoria";
    } else {
      convocatoria = rows[0][0];
    }
    return convocatoria;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err;
  }
}

async function consultarInvitacion(con, id) {
  try {
    const result = await con.execute(
      `SELECT PR.INVITACION FROM PROCESOREQUERIMIENTO PR JOIN REQUERIMIENTO R ON
       PR.CONSECREQUEPROCREQUE = R.CONSECREQUE JOIN PERFILFASE PF ON PF.IDFASEPERFILFASE =
       PR.IDFASEPERFILFASE AND PF.IDPERFILPERFILFASE = IDPERFILPROCCAN JOIN FASE F ON 
       F.IDFASE = PF.IDFASEPERFILFASE
       WHERE R.CONSECREQUE = ${id} AND F.IDFASE = '0004'`
    );
    const rows = result.rows;

    let invitacion;
    if (rows.length === 0 || rows[0][0] == null) {
      invitacion = "NO ha iniciado la fase de invitaciones";
    } else {
      invitacion = rows[0][0];
    }
    return invitacion;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function consultarPerfil(con, id) {
  try {
    let result = await con.execute(
      `SELECT P.IDPERFIL, P.DESPERFIL, D.DESCDISCIPLINA FROM PROCESOREQUERIMIENTO PR JOIN REQUERIMIENTO R ON
       PR.CONSECREQUEPROCREQUE = R.CONSECREQUE JOIN PERFILFASE PF ON PF.IDFASEPERFILFASE =
       PR.IDFASEPERFILFASE AND PF.IDPERFILPERFILFASE = IDPERFILPROCCAN JOIN FASE F ON 
       F.IDFASE = PF.IDFASEPERFILFASE JOIN PERFIL P ON P.IDPERFIL = PF.IDPERFILPERFILFASE JOIN
       DISCIPLINA D ON P.IDDISCIPLINAPERFIL = D.IDDISCIPLINA
       WHERE R.CONSECREQUE = ${id} AND F.IDFASE = '0002'`
    );
    let rows = result.rows;

    let perfil;
    if (rows.length === 0) {
      result = await con.execute(
        `SELECT P.IDPERFIL, P.DESPERFIL, D.DESCDISCIPLINA FROM PERFIL P JOIN DISCIPLINA D ON
         P.IDDISCIPLINAPERFIL = D.IDDISCIPLINA`
      );
      rows = result.rows;
      perfil = rows;
    } else {
      perfil = rows[0];
    }
    return perfil;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function inicializarFase(
  conexion,
  reqID,
  empID,
  profileID,
  currentDate,
  startDate
) {
  try {
    let result = await conexion.execute(
      `SELECT IDFASEPERFILFASE FROM PERFILFASE WHERE IDPERFILPERFILFASE = :profileID`,
      { profileID }
    );

    let rows = result.rows;

    if (rows.length === 0) {
      for (let iter = 1; iter <= 8; iter++) {
        result = await conexion.execute(
          `INSERT INTO PerfilFase (idFasePerfilFase, idPerfilPerfilFase) VALUES (LPAD(:iter,4,'0'),:profileID)`,
          { iter, profileID }
        );
        console.log("Registro creado:", result);
      }
    }

    result = await conexion.execute(
      `SELECT CONSPROCESO FROM PROCESOREQUERIMIENTO`
    );

    rows = result.rows;
    let lastID = 1;
    if (rows.length > 0) {
      console.log(rows[rows.length - 1]);
      lastID = Number(rows[rows.length - 1]) + 1;
    }

    result = await conexion.execute(
      `SELECT IDFASEPERFILFASE FROM PERFILFASE WHERE IDPERFILPERFILFASE = :profileID`,
      { profileID }
    );

    rows = result.rows;

    for (let iter = 1; iter <= 8; iter++) {
      let newIter = rows[iter - 1][0];

      if (iter === 1) {
        result = await conexion.execute(
          `INSERT INTO ProcesoRequerimiento (ConsProceso, idFasePerfilFase, idPerfilProcCan, 
            consecRequeProcReque, codEmpleadoProceReque, fechaInicio, fechaFin)
            VALUES (:lastID, :newIter,:profileID, :reqID, :empID, TO_TIMESTAMP(:startDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), 
            TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))`,
          { lastID, newIter, profileID, reqID, empID, startDate, currentDate }
        );
        console.log("Registro creado:", result);
      }

      if (iter === 2) {
        result = await conexion.execute(
          `INSERT INTO ProcesoRequerimiento (ConsProceso, idFasePerfilFase, idPerfilProcCan, 
            consecRequeProcReque, codEmpleadoProceReque, fechaInicio, fechaFin)
            VALUES (:lastID, :newIter,:profileID, :reqID, :empID, TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), 
            TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))`,
          { lastID, newIter, profileID, reqID, empID, currentDate }
        );
        console.log("Registro creado:", result);
      }

      if (iter > 2) {
        if (iter === 6) {
          empID = choice(await empleadosCargo(conexion, "004"))[0];
        }

        if (iter === 7) {
          empID = choice(await empleadosCargo(conexion, "003"))[0];
        }

        result = await conexion.execute(
          `INSERT INTO ProcesoRequerimiento (ConsProceso, idFasePerfilFase, idPerfilProcCan, 
            consecRequeProcReque, codEmpleadoProceReque, fechaInicio)
            VALUES (:lastID, :newIter,:profileID, :reqID, :empID, TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))`,
          { lastID, newIter, profileID, reqID, empID, currentDate }
        );
        console.log("Registro creado:", result);
      }
      lastID += 1;
    }
    // Commit de la transacción
    await conexion.commit();
  } catch (err) {
    console.error("Error al crear el registro:", err);
    // Si hay un error, se debe hacer rollback de la transacción para evitar inconsistencias en la base de datos
    if (conexion) {
      await conexion.rollback();
    }
    throw err; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
}

async function updateConvocatoria(
  conexion,
  reqID,
  textoConvocatoria,
  currentDate
) {
  try {
    let result = await conexion.execute(
      `UPDATE PROCESOREQUERIMIENTO
       SET CONVOCATORIA = :textoConvocatoria,
       fechaFin = TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
       WHERE CONSECREQUEPROCREQUE = :reqID AND
       IDFASEPERFILFASE = '0003'
       `,
      { textoConvocatoria, reqID, currentDate }
    );
    console.log(result);
    await conexion.commit();
  } catch (err) {
    console.error("Error reading records:", err);
    if (conexion) {
      await conexion.rollback();
    }
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getInvitados(conexion, reqID) {
  try {
    let result = await conexion.execute(
      `SELECT C.USUARIO, C.NOMBRE, C.APELLIDO, C.FECHANACCAN,
      C.NDOC, T.DESCTIPODOC, H.DESCACTIVIDAD, H.FUNCIONACTIVIDAD,
      TI.DESCTIPOITEMPERFIL, INT.NOMINSTITUCION, D.DESCDISCIPLINA FROM 
      CANDIDATO C JOIN DISCIPLINA D ON C.IDDISCIPLINACAN = D.IDDISCIPLINA
      JOIN HV H ON H.USUARIOHV = C.USUARIO JOIN INSTITUCION INT ON
      H.CODINSTITUCIONHV = INT.CODINSTITUCION 
      JOIN TIPODOC T ON T.IDTIPODOC = C.IDTIPODOCCAN JOIN TIPOITEMPERFIL TI ON
      H.IDTIPOITEMPERFILHV = TI.IDTIPOITEMPERFIL JOIN PROCESOREQUERIMIENTO PR ON
      PR.CONSECREQUEPROCREQUE = :reqID AND IDFASEPERFILFASE = '0004' JOIN PERFILFASE PF
      ON PR.IDFASEPERFILFASE = PF.IDFASEPERFILFASE AND PR.IDPERFILPROCCAN = PF.IDPERFILPERFILFASE
      JOIN PERFIL P ON PF.IDPERFILPERFILFASE = P.IDPERFIL AND P.IDDISCIPLINAPERFIL = D.IDDISCIPLINA
      LEFT JOIN PROCESOCANDIDATO PC ON PC.USUARIO = C.USUARIO AND PC.IDFASEPROCCAN = '0003'
      WHERE PC.USUARIO IS NULL`,
      { reqID }
    );
    let rows = result.rows;
    console.log(rows);
    return rows;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err;
  }
}

async function mandarInvitaciones(
  conexion,
  reqID,
  invitacion,
  currentDate,
  fecha,
  invitados,
  profileID
) {
  let result;
  try {
    result = await conexion.execute(
      `UPDATE PROCESOREQUERIMIENTO
       SET INVITACION = :invitacion,
       fechaFin = TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
       WHERE CONSECREQUEPROCREQUE = :reqID AND
       IDFASEPERFILFASE = '0004'`,
      { reqID, invitacion, currentDate }
    );

    result = await conexion.execute(
      `SELECT CONSPROCESO FROM PROCESOREQUERIMIENTO
                                   WHERE IDFASEPERFILFASE = '0004' AND IDPERFILPROCCAN = :profileID
                                   AND CONSECREQUEPROCREQUE = :reqID`,
      { profileID, reqID }
    );
    let consReque = result.rows[0][0];

    console.log(consReque);

    invitados.forEach(async (invitado) => {
      result = await conexion.execute(
        `INSERT INTO PROCESOCANDIDATO (idFaseProcCan, idPerfilProcCan,
                                     consecRequeProcCan, ConsProcesoProcCan, usuario, fechaPresentacion)
                                     VALUES('0004', :profileID, :reqID, :consReque, :invitado, 
                                     TO_TIMESTAMP(:fecha, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))`,
        { profileID, reqID, consReque, invitado, fecha }
      );
      console.log(result);
    });

    await conexion.commit();
  } catch (err) {
    console.error("Error reading records:", err);
    if (conexion) {
      await conexion.rollback();
    }
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getPreseleccionados(conexion, reqID) {
  try {
    let result = await conexion.execute(
      `SELECT C.USUARIO, C.NOMBRE, C.APELLIDO, C.FECHANACCAN,
      C.NDOC, T.DESCTIPODOC, H.DESCACTIVIDAD, H.FUNCIONACTIVIDAD,
      TI.DESCTIPOITEMPERFIL, INT.NOMINSTITUCION, D.DESCDISCIPLINA FROM 
      CANDIDATO C JOIN DISCIPLINA D ON C.IDDISCIPLINACAN = D.IDDISCIPLINA
      JOIN HV H ON H.USUARIOHV = C.USUARIO JOIN INSTITUCION INT ON
      H.CODINSTITUCIONHV = INT.CODINSTITUCION 
      JOIN TIPODOC T ON T.IDTIPODOC = C.IDTIPODOCCAN JOIN TIPOITEMPERFIL TI ON
      H.IDTIPOITEMPERFILHV = TI.IDTIPOITEMPERFIL JOIN PROCESOREQUERIMIENTO PR ON
      PR.CONSECREQUEPROCREQUE = :reqID AND IDFASEPERFILFASE = '0004' JOIN PERFILFASE PF
      ON PR.IDFASEPERFILFASE = PF.IDFASEPERFILFASE AND PR.IDPERFILPROCCAN = PF.IDPERFILPERFILFASE
      JOIN PERFIL P ON PF.IDPERFILPERFILFASE = P.IDPERFIL AND P.IDDISCIPLINAPERFIL = D.IDDISCIPLINA
      JOIN PROCESOCANDIDATO PC ON PC.USUARIO = C.USUARIO AND PC.IDFASEPROCCAN = '0003'
      UNION
      SELECT C.USUARIO, C.NOMBRE, C.APELLIDO, C.FECHANACCAN,
      C.NDOC, T.DESCTIPODOC, H.DESCACTIVIDAD, H.FUNCIONACTIVIDAD,
      TI.DESCTIPOITEMPERFIL, INT.NOMINSTITUCION, D.DESCDISCIPLINA FROM 
      CANDIDATO C JOIN DISCIPLINA D ON C.IDDISCIPLINACAN = D.IDDISCIPLINA
      JOIN HV H ON H.USUARIOHV = C.USUARIO JOIN INSTITUCION INT ON
      H.CODINSTITUCIONHV = INT.CODINSTITUCION 
      JOIN TIPODOC T ON T.IDTIPODOC = C.IDTIPODOCCAN JOIN TIPOITEMPERFIL TI ON
      H.IDTIPOITEMPERFILHV = TI.IDTIPOITEMPERFIL JOIN PROCESOREQUERIMIENTO PR ON
      PR.CONSECREQUEPROCREQUE = :reqID AND IDFASEPERFILFASE = '0004' JOIN PERFILFASE PF
      ON PR.IDFASEPERFILFASE = PF.IDFASEPERFILFASE AND PR.IDPERFILPROCCAN = PF.IDPERFILPERFILFASE
      JOIN PERFIL P ON PF.IDPERFILPERFILFASE = P.IDPERFIL AND P.IDDISCIPLINAPERFIL = D.IDDISCIPLINA
      JOIN PROCESOCANDIDATO PC ON PC.USUARIO = C.USUARIO AND PC.IDFASEPROCCAN = '0004'`,
      { reqID }
    );
    let rows = result.rows;
    console.log(rows);
    return rows;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err;
  }
}

async function preseleccionar(
  conexion,
  reqID,
  profileID,
  currentDate,
  candidatos
) {
  let result;
  try {
    result = await conexion.execute(
      `UPDATE PROCESOREQUERIMIENTO
       SET fechaFin = TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
       WHERE CONSECREQUEPROCREQUE = :reqID AND
       IDFASEPERFILFASE = '0005'`,
      { reqID, currentDate }
    );

    result = await conexion.execute(
      `SELECT CONSPROCESO FROM PROCESOREQUERIMIENTO
                                   WHERE IDFASEPERFILFASE = '0005' AND IDPERFILPROCCAN = :profileID
                                   AND CONSECREQUEPROCREQUE = :reqID`,
      { profileID, reqID }
    );
    let consReque = result.rows[0][0];

    console.log(consReque);

    candidatos.forEach(async (candidato) => {
      result = await conexion.execute(
        `INSERT INTO PROCESOCANDIDATO (idFaseProcCan, idPerfilProcCan,
                                     consecRequeProcCan, ConsProcesoProcCan, usuario, fechaPresentacion)
                                     VALUES('0005', :profileID, :reqID, :consReque, :candidato, 
                                     TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))`,
        { profileID, reqID, consReque, candidato, currentDate }
      );
      console.log(result);
    });

    await conexion.commit();
  } catch (err) {
    console.error("Error reading records:", err);
    if (conexion) {
      await conexion.rollback();
    }
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getHeaderReq(con, empID) {
  try {
    const result = await con.execute(
      `
    SELECT E.NOMEMPLEADO, E.APELLEMPLEADO FROM EMPLEADO E 
    WHERE E.CODEMPLEADO = :empID`,
      { empID }
    );
    const rows = result.rows;
    return rows[0];
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getEmpleadoReq(con, reqID) {
  try {
    const result = await con.execute(
      `
        SELECT E.CODEMPLEADO FROM EMPLEADO E JOIN REQUERIMIENTO R ON
        R.EMP_CODEMPLEADO = E.CODEMPLEADO AND R.CONSECREQUE = :reqID`,
      { reqID }
    );
    const rows = result.rows;
    return rows[0];
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getEmpleadoResponsable(con, reqID, fase) {
  try {
    const result = await con.execute(
      `
        SELECT CODEMPLEADOPROCEREQUE FROM PROCESOREQUERIMIENTO 
        WHERE IDFASEPERFILFASE = :fase AND CONSECREQUEPROCREQUE = :reqID`,
      { fase, reqID }
    );
    const rows = result.rows;
    return rows[0][0];
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getEmpleado(con, usuario, contrasena) {
  try {
    const result = await con.execute(
      `
      SELECT E.CODEMPLEADO FROM EMPLEADO E JOIN SESION S ON
      S.CODEMPLEADOFK = E.CODEMPLEADO 
      WHERE S.USUARIOEMP = :usuario AND S.CONTRASENIA = :contrasena AND
      E.CORREO = S.USUARIOEMP`,
      { usuario, contrasena }
    );
    const rows = result.rows;
    return rows[0];
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getCargo(con, empID) {
  try {
    const result = await con.execute(
      `
      SELECT TC.IDTIPOCARGO FROM TIPOCARGO TC JOIN CARGO C ON C.IDTIPOCARGOCARGO = TC.IDTIPOCARGO
      JOIN EMPLEADO E ON C.CODEMPLEADOCARGO = E.CODEMPLEADO
      WHERE E.CODEMPLEADO = :empID`,
      { empID }
    );
    const rows = result.rows;
    return rows[0];
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

function choice(lista) {
  var indiceAleatorio = Math.floor(Math.random() * lista.length);
  var elementoAleatorio = lista[indiceAleatorio];
  return elementoAleatorio;
}

async function empleadosCargo(con, cargoID) {
  try {
    const result = await con.execute(
      `
      SELECT E.CODEMPLEADO FROM EMPLEADO E JOIN CARGO C ON C.CODEMPLEADOCARGO = E.CODEMPLEADO
      JOIN TIPOCARGO TC ON C.IDTIPOCARGOCARGO = TC.IDTIPOCARGO 
      WHERE TC.IDTIPOCARGO = :cargoID`,
      { cargoID }
    );
    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getFaseCargo(con, cargoID) {
  try {
    const result = await con.execute(
      `
      SELECT F.IDFASE FROM FASE F JOIN FASECARGO FC ON FC.IDFASEFASECARGO = F.IDFASE
      WHERE FC.IDTIPOCARGOFASECAR = :cargoID`,
      { cargoID }
    );
    const rows = result.rows;
    return rows[0];
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getRequerimientos(con, empID) {
  try {
    let cargo = await getCargo(con, empID);

    let result;
    switch (cargo[0]) {
      case "002":
        result = await con.execute(
          `
          SELECT R.CONSECREQUE FROM REQUERIMIENTO R JOIN EMPLEADO E ON
          R.EMP_CODEMPLEADO = E.CODEMPLEADO
          WHERE E.CODEMPLEADO = :empID`,
          { empID }
        );
        break;

      case "003":
        result = await con.execute(
          `
            SELECT R.CONSECREQUE FROM REQUERIMIENTO R JOIN PROCESOREQUERIMIENTO PR
            ON PR.CONSECREQUEPROCREQUE = R.CONSECREQUE
            WHERE PR.CODEMPLEADOPROCEREQUE = :empID
            AND PR.IDFASEPERFILFASE = '0007' AND PR.FECHAFIN IS NULL`,
          { empID }
        );
        break;

      case "004":
        result = await con.execute(
          `
            SELECT R.CONSECREQUE FROM REQUERIMIENTO R JOIN PROCESOREQUERIMIENTO PR
            ON PR.CONSECREQUEPROCREQUE = R.CONSECREQUE
            WHERE PR.CODEMPLEADOPROCEREQUE = :empID
            AND PR.IDFASEPERFILFASE = '0006' AND PR.FECHAFIN IS NULL`,
          { empID }
        );
        break;
    }

    const rows = result.rows;
    return rows;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getTiposCargo(con) {
  try {
    const result = await con.execute(
      `SELECT IDTIPOCARGO, DESCTIPOCARGO FROM TIPOCARGO`
    );
    return result.rows;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function registrarEmpleado(
  con,
  nombres,
  apellidos,
  fechaNac,
  fechaIng,
  tipoCargo,
  correo,
  contrasena
) {
  try {
    let result = await con.execute(`SELECT MAX(CODEMPLEADO) FROM EMPLEADO`);

    let maxId = result.rows[0];
    let newIdNumber = parseInt(maxId[0].substring(1)) + 1;
    let newId1 = "E" + newIdNumber.toString().padStart(4, "0");

    result = await con.execute(
      `INSERT INTO EMPLEADO 
      (codEmpleado, nomEmpleado, apellEmpleado, fechaNacEm, FechaIngre, fechaEgreso, correo)
      VALUES(:newId1, :nombres, :apellidos, to_date(:fechaNac, 'YYYY-MM-DD'), to_date(:fechaIng, 'YYYY-MM-DD'), NULL,
      :correo)
    `,
      { newId1, nombres, apellidos, fechaNac, fechaIng, correo }
    );
    console.log(result);

    result = await con.execute(
      `INSERT INTO SESION 
    (usuarioEmp, codEmpleadoFK, contrasenia)
    VALUES(:correo, :newId1, :contrasena)
    `,
      { correo, newId1, contrasena }
    );

    result = await con.execute(`SELECT MAX(CONSECARGO) FROM CARGO`);

    maxId = result.rows[0];
    let newId2 = parseInt(maxId[0]) + 1;

    result = await con.execute(
      `INSERT INTO CARGO 
    (ConseCargo, idTipoCargoCargo, codEmpleadoCargo, FechaInicioCargo, FechaFinCargo, descCargo )
    VALUES(:newId2, :tipoCargo, :newId1, to_date(:fechaIng, 'YYYY-MM-DD'), NULL, 'Empleado SELECCION S.A')
    `,
      { newId2, tipoCargo, newId1, fechaIng }
    );

    await con.commit();
    return newId1;
  } catch (err) {
    console.error("Error reading records:", err);
    if (con) {
      await con.rollback();
    }
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function getPruebas(con, reqID) {
  try {
    const result = await con.execute(
      `
      SELECT 
        PRU.IDPRUEBA,
        DIS.DESCDISCIPLINA AS DISCIPLINA,
        TIP.DESCTIPOPRUEBA AS TIPO_PRUEBA,
        PRU.DESCPRUEBA,
        PRU.FECHACREADA,
        PRE.DESCPREGUNTA AS DESC_PREGUNTA,
        TIP_PRE.DESCTIPOPREGUNTA AS TIPO_PREGUNTA,
        RES.RESPUESTA
      FROM 
        PRUEBA PRU
        INNER JOIN DISCIPLINA DIS ON PRU.IDDISCIPLINAPRUEBA = DIS.IDDISCIPLINA
        INNER JOIN TIPOPRUEBA TIP ON PRU.IDTIPOPRUEBAPRUEBA = TIP.IDTIPOPRUEBA
        LEFT JOIN PREGUNTA PRE ON PRU.IDPRUEBA = PRE.IDPRUEBAPREGUNTA
        LEFT JOIN TIPOPREGUNTA TIP_PRE ON PRE.IDTIPOPREGUNTAPREG = TIP_PRE.IDTIPOPREGUNTA
        LEFT JOIN RESPUESTA RES ON PRE.IDPRUEBAPREGUNTA = RES.IDPRUEBARESP
                                     AND PRE.CONSEPREGUNTA = RES.CONSEPREGUNTARES
        INNER JOIN PROCESOREQUERIMIENTO PR ON PR.CONSECREQUEPROCREQUE = :reqID AND
        PR.IDFASEPERFILFASE = PRU.IDFASEPRUEBA 
        INNER JOIN PERFILFASE PF ON PF.IDFASEPERFILFASE = PR.IDFASEPERFILFASE 
        AND PF.IDPERFILPERFILFASE = PR.IDPERFILPROCCAN 
        INNER JOIN PERFIL P ON P.IDPERFIL = PF.IDPERFILPERFILFASE
      WHERE
        PRU.IDFASEPRUEBA = '0006' AND P.IDDISCIPLINAPERFIL = DIS.IDDISCIPLINA
      ORDER BY 
        PRU.IDPRUEBA,
        PRE.CONSEPREGUNTA,
        RES.CONSEPREGUNTARES
    `,
      { reqID }
    );

    // Convertir el resultado a un formato JSON
    const rows = result.rows;

    // Inicializar un objeto para almacenar las pruebas
    const pruebas = {};

    // Iterar sobre las filas del resultado y construir la estructura de datos deseada
    rows.forEach((row) => {
      const idPrueba = row[0];
      if (!pruebas[idPrueba]) {
        pruebas[idPrueba] = {
          idPrueba: idPrueba,
          disciplina: row[1],
          tipoPrueba: row[2],
          descPrueba: row[3],
          fechaCreada: row[4],
          preguntas: [],
        };
      }

      // Agregar la pregunta y sus respuestas
      if (row[5]) {
        // Si la pregunta existe, se agrega al array de preguntas
        const pregunta = {
          descPregunta: row[5],
          tipoPregunta: row[6],
          respuestas: row[7] ? [row[7]] : [], // Agregar la respuesta si existe
        };

        pruebas[idPrueba].preguntas.push(pregunta);
      }
    });

    // Convertir el objeto de pruebas en un array
    const pruebasArray = Object.values(pruebas);

    return pruebasArray;
  } catch (err) {
    console.error("Error reading records:", err);
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function asignarPrueba(
  conexion,
  reqID,
  currentDate,
  idPrueba,
  fechaPrueba
) {
  try {
    let result = await conexion.execute(
      `UPDATE PROCESOREQUERIMIENTO
       SET fechaFin = TO_TIMESTAMP(:currentDate, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'),
       IDPRUEBAPROC = :idPrueba
       WHERE CONSECREQUEPROCREQUE = :reqID AND
       IDFASEPERFILFASE = '0006'
       `,
      { currentDate, idPrueba, reqID }
    );

    let profileID = await consultarPerfil(conexion, reqID);
    profileID = profileID[0];
    result = await conexion.execute(
      `SELECT CONSPROCESO FROM PROCESOREQUERIMIENTO
                                   WHERE IDFASEPERFILFASE = '0006' AND IDPERFILPROCCAN = :profileID
                                   AND CONSECREQUEPROCREQUE = :reqID`,
      { profileID, reqID }
    );

    let consReque = result.rows[0][0];

    result = await conexion.execute(
      `
      SELECT C.USUARIO FROM CANDIDATO C JOIN PROCESOCANDIDATO PC ON PC.USUARIO = C.USUARIO
      WHERE PC.IDFASEPROCCAN = '0005' AND PC.CONSECREQUEPROCCAN = :reqID AND IDPERFILPROCCAN = :profileID`,
      { reqID, profileID }
    );

    console.log(result);

    for (const preseleccionado of result.rows) {
      let newPress = preseleccionado[0];
      result = await conexion.execute(
        `INSERT INTO PROCESOCANDIDATO (idFaseProcCan, idPerfilProcCan,
                                     consecRequeProcCan, ConsProcesoProcCan, usuario, fechaPresentacion)
                                     VALUES('0006', :profileID, :reqID, :consReque, :newPress, 
                                     TO_TIMESTAMP(:fechaPrueba, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'))`,
        { profileID, reqID, consReque, newPress, fechaPrueba }
      );

      result = await conexion.execute(
        `SELECT MAX(CONSEPRUEBACANDI) FROM PRUEBACANDIDATO`
      );

      let maxId = 0;
      if (result.rows[0][0] !== null) {
        maxId = parseInt(result.rows[0][0]) + 1;
      }

      result = await conexion.execute(
        `INSERT INTO PRUEBACANDIDATO (CONSEPRUEBACANDI, IDFASEPRUEBACAN,
                                     PRO_IDPERFILPROCCAN, CONSECREQUEPRUCAN, CONSPROCESOPRUEBACAN, IDFASEPROCCAN,
                                     IDPERFILPROCCAN, CONSECREQUEPROCCAN, CONSPROCESOPROCCAN, USUARIOPRUECAN,
                                     FECHAPRES, CALIFICACION)
                                     VALUES(:maxId, '0006',:profileID, :reqID, :consReque, '0006', :profileID, :reqID,
                                     :consReque, :newPress, TO_TIMESTAMP(:fechaPrueba, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), NULL)`,
        { maxId, profileID, reqID, consReque, newPress, fechaPrueba }
      );
    }
    await conexion.commit();
  } catch (err) {
    console.error("Error reading records:", err);
    if (conexion) {
      await conexion.rollback();
    }
    throw err; // Lanzar el error para manejarlo en la llamada a esta función
  }
}

async function insertarRequerimiento(con, reqData) {
  const {
    salarioMin,
    salarioMax,
    descFuncion,
    descCarreras,
    nVvacantes,
    codEmpleadoReque,
    Emp_codEmpleado,
    fechaReque,
  } = reqData;

  try {
    // Generar el consecutivo del requerimiento
    const resultConsecutivo = await con.execute(
      `SELECT NVL(MAX(CONSECREQUE), 0) + 1 AS NEW_CONSECREQUE FROM REQUERIMIENTO`
    );
    const newConsecReque = resultConsecutivo.rows[0][0];

    // Insertar el requerimiento
    const sql = `INSERT INTO REQUERIMIENTO (
      CONSECREQUE, SALARIOMAX, SALARIOMIN, DESCFUNCION, DESCCARRERAS, 
      NVVACANTES, EMP_CODEMPLEADO, FECHAREQUE, CODEMPLEADOREQUE
    ) VALUES (
      :consecReque, :salarioMax, :salarioMin, :descFuncion, :descCarreras, 
      :nVvacantes, :Emp_codEmpleado, TO_TIMESTAMP(:fechaReque, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), 
      :codEmpleadoReque
    )`;

    const binds = {
      consecReque: newConsecReque,
      salarioMax,
      salarioMin,
      descFuncion,
      descCarreras,
      nVvacantes,
      codEmpleadoReque,
      Emp_codEmpleado,
      fechaReque,
    };

    // Ejecutar la inserción
    const result = await con.execute(sql, binds);
    await con.commit();
    console.log("Requerimiento insertado:", result);
  } catch (err) {
    console.error("Error al insertar el requerimiento:", err);
    if (con) {
      await con.rollback();
    }
    throw err;
  }
}

async function obtenerAnalistasGenerales(con) {
  try {
    const result = await con.execute(
      `SELECT E.codEmpleado, E.nomEmpleado || ' ' || E.apellEmpleado as nombre
       FROM empleado E, cargo C, tipoCargo T
       WHERE E.codEmpleado = C.codEmpleadoCargo
         AND C.idTipoCargoCargo = T.idTipoCargo
         AND upper(T.descTipoCargo) = 'ANALISTA GENERAL'`
    );
    return result.rows;
  } catch (err) {
    console.error("Error al obtener analistas generales:", err);
    throw err;
  }
}

function cerrarConexion(conexion) {
  if (conexion) {
    conexion.close();
  }
}

module.exports = {
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
  registrarEmpleado,
  getPruebas,
  getEmpleadoResponsable,
  asignarPrueba,
  insertarRequerimiento,
  obtenerAnalistasGenerales,
};
