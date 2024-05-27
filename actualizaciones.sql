--Insertar candidatos en la convocatoria
insert into ProcesoCandidato values('0003','0001', 1, 3, 'user01', sysdate, 'sfds', 'Aceptado');
insert into ProcesoCandidato values('0003','0001', 1, 3, 'user05', sysdate, 'sfds', 'Aceptado');

--Actualizar candidatos en las invitaciones

UPDATE PROCESOCANDIDATO
	SET OBSERVACIONES = 'Aceptado'
	WHERE IDFASEPROCCAN = '0004' AND
	IDPERFILPROCCAN = '0001' AND
	CONSECREQUEPROCCAN = '1' AND
	(USUARIO = 'user02' OR USUARIO = 'user04');


--Actualizar ProcesoRequerimiento en una fase concreta

UPDATE PROCESOREQUERIMIENTO
       SET INVITACION = NULL,
       fechaFin = NULL
       WHERE CONSECREQUEPROCREQUE = 1 AND
       IDFASEPERFILFASE = '0006';

--Eliminar empleados
delete sesion where codEmpleadoFK = 'E0011';
delete Cargo where codEmpleadoCargo = 'E0011';
delete empleado where codEmpleado = 'E0011';
