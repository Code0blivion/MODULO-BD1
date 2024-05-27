
--Inserts

--Insertar TipoContacto
insert into TipoContacto values('DIR','Direccion');
insert into TipoContacto values('OFI','Direccion Oficina');
insert into TipoContacto values('TEL','Telefono Fijo');
insert into TipoContacto values('TEO','Telefono Oficina');
insert into TipoContacto values('CEL','Celular');
insert into TipoContacto values('LIK','LinkedIn');
insert into TipoContacto values('WHA','WhatsApp');


--Insertar TipoCargo
insert into TipoCargo values('001','Analista Cliente');
insert into TipoCargo values('002','Analista General');
insert into TipoCargo values('003','Analista Sicologico');
insert into TipoCargo values('004','AnalistaConocimiento');
insert into TipoCargo values('005','Analista Tecnologico');


--Insertar TipoItemPerfil
insert into TipoItemPerfil values('0001', 'Estudios Tecnicos');
insert into TipoItemPerfil values('0002', 'Estudios Tecnologicos');
insert into TipoItemPerfil values('0003', 'Estudios Pregrado');
insert into TipoItemPerfil values('0004', 'Estudios Postgrado');
insert into TipoItemPerfil values('0005', 'Estudios Doctorales');
insert into TipoItemPerfil values('0006', 'Estudios No Formales');
insert into TipoItemPerfil values('0007', 'Estudios Empresariales');
insert into TipoItemPerfil values('0008', 'Idiomas');
insert into TipoItemPerfil values('0009', 'Voluntariado');
insert into TipoItemPerfil values('0010', 'Empleado');
insert into TipoItemPerfil values('0011', 'Contratista');
insert into TipoItemPerfil values('0012', 'Publicacion No Indexada');
insert into TipoItemPerfil values('0013', 'Publicacion Indexada');


--Insertar Disciplina
insert into Disciplina values('0001', 'Computacion');
insert into Disciplina values('0002', 'Administracion');
insert into Disciplina values('0003', 'Quimica');
insert into Disciplina values('0004', 'Biologia');
insert into Disciplina values('0005', 'Odontologia');
insert into Disciplina values('0006', 'Medicina');
insert into Disciplina values('0007', 'Sociologia');


--Insertar Perfil
insert into Perfil values('0001', '0001', 'Directivo Superior');
insert into Perfil values('0002','0001', 'Directivo Medio');
insert into Perfil values('0003','0001', 'Directivo Base');
insert into Perfil values('0004', '0001', 'Profesional Senior');
insert into Perfil values('0005', '0001', 'Profesional Semi Senior');
insert into Perfil values('0006', '0001', 'Profesional Junior');
insert into Perfil values('0007', '0001', 'Tecnologo con Experiencia');
insert into Perfil values('0008', '0001', 'Tecnologo');
insert into Perfil values('0009', '0001', 'Tecnico con Experiencia');
insert into Perfil values('0010', '0001', 'Tecnico');
insert into Perfil values('0011', '0001', 'Bachiller');

/*
insert into Perfil values('0012', '0002', 'Directivo Superior');
insert into Perfil values('0013','0002', 'Directivo Medio');
insert into Perfil values('0014','0002', 'Directivo Base');
insert into Perfil values('0015', '0002', 'Profesional Senior');
insert into Perfil values('0016', '0002', 'Profesional Semi Senior');
insert into Perfil values('0017', '0002', 'Profesional Junior');
insert into Perfil values('0018', '0002', 'Tecnologo con Experiencia');
insert into Perfil values('0019', '0002', 'Tecnologo');
insert into Perfil values('0020', '0002', 'Tecnico con Experiencia');
insert into Perfil values('0021', '0002', 'Tecnico');
insert into Perfil values('0022', '0002', 'Bachiller');*/


--Insertar Fase
insert into Fase values('0001','Registrar Requerimiento');
insert into Fase values('0002','Asignar Perfil');
insert into Fase values('0003','Publicar Convocatoria');
insert into Fase values('0004','Mandar Invitación');
insert into Fase values('0005','Preseleccion');
insert into Fase values('0006','Realizar Prueba');
insert into Fase values('0007','Entrevista');
insert into Fase values('0008','Fase Final');


--Insertar TipoPrueba
insert into TipoPrueba values('01', 'Prueba Conocimiento I');
insert into TipoPrueba values('02', 'Prueba Conocimiento II');
insert into TipoPrueba values('03', 'Prueba Especializada');
insert into TipoPrueba values('04', 'Prueba Sicologica');
insert into TipoPrueba values('05', 'Prueba Grupal');
insert into TipoPrueba values('06', 'Prueba Tecnologica I');
insert into TipoPrueba values('07', 'Prueba Tecnologica II');
insert into TipoPrueba values('08', 'Prueba Tecnologica');
insert into TipoPrueba values('09', 'Especializada');
insert into TipoPrueba values('10', 'Prueba Ingles');
insert into TipoPrueba values('11', 'Prueba Seguridad');


--Insertar TipoPregunta
insert into TipoPregunta values('0001','Abierta');
insert into TipoPregunta values('0002','Seleccion Multiple');
insert into TipoPregunta values('0003','Seleccion Unica');
insert into TipoPregunta values('0004','Falso/Verdadero');
insert into TipoPregunta values('0005','Completar');
insert into TipoPregunta values('0006','Ubicar');
insert into TipoPregunta values('0007','Emparejar');


--Insertar FaseCargo
insert into FaseCargo values(1,'001','0001');
insert into FaseCargo values(2,'002','0002');
insert into FaseCargo values(3,'002','0003');
insert into FaseCargo values(4,'002','0004');
insert into FaseCargo values(5,'002','0005');
insert into FaseCargo values(6,'004','0006');
insert into FaseCargo values(7,'003','0006');
insert into FaseCargo values(8,'003','0007');
insert into FaseCargo values(9,'003','0008');


--Insertar Prueba
insert into Prueba values('0001','0002','02','0006','Gestion Proyectos',1,SYSDATE);
insert into Prueba values('0002','0001','01','0006','Bases de Datos',1,SYSDATE);
insert into Prueba values('0003','0001','07','0006','Excel Analistica',1,SYSDATE);


--Insertar PerfilFase
insert into PerfilFase values('0001','0001');
insert into PerfilFase values('0002','0001');
insert into PerfilFase values('0003','0001');
insert into PerfilFase values('0004','0001');
insert into PerfilFase values('0005','0001');
insert into PerfilFase values('0006','0001');
insert into PerfilFase values('0007','0001');
insert into PerfilFase values('0008','0001');

insert into PerfilFase values('0001','0004');
insert into PerfilFase values('0002','0004');
insert into PerfilFase values('0003','0004');
insert into PerfilFase values('0004','0004');
insert into PerfilFase values('0005','0004');
insert into PerfilFase values('0006','0004');
insert into PerfilFase values('0007','0004');
insert into PerfilFase values('0008','0004');

insert into PerfilFase values('0001','0007');
insert into PerfilFase values('0002','0007');
insert into PerfilFase values('0003','0007');
insert into PerfilFase values('0004','0007');
insert into PerfilFase values('0005','0007');
insert into PerfilFase values('0006','0007');
insert into PerfilFase values('0007','0007');
insert into PerfilFase values('0008','0007');

insert into PerfilFase values('0001','0010');
insert into PerfilFase values('0002','0010');
insert into PerfilFase values('0003','0010');
insert into PerfilFase values('0004','0010');
insert into PerfilFase values('0005','0010');
insert into PerfilFase values('0006','0010');
insert into PerfilFase values('0007','0010');
insert into PerfilFase values('0008','0010');


--Insertar Pregunta
insert into Pregunta values('0001', '0001', '0001', 'Pregunta 1');
insert into Pregunta values('0002', '0002', '0004', 'Pregunta 2');
insert into Pregunta values('0003', '0003', '0003', 'Pregunta 3');


--Insertar Respuesta
insert into Respuesta values('0001', '0001', '0001', 'Respuesta 1');
insert into Respuesta values('0002', '0002', '0002', 'F');
insert into Respuesta values('0003', '0003', '0003', 'Unica 3');


--Insertar ItemPerfil
insert into ItemPerfil values('0001', '0001', '0003', 'Item1');
insert into ItemPerfil values('0002', '0001', '0004', 'Item2');
insert into ItemPerfil values('0003', '0001', '0008', 'Item3');
insert into ItemPerfil values('0004', '0001', '0010', 'Item4');
insert into ItemPerfil values('0005', '0001', '0011', 'Item5');
insert into ItemPerfil values('0006', '0004', '0003', 'Item6');
insert into ItemPerfil values('0007', '0004', '0004', 'Item7');
insert into ItemPerfil values('0008', '0004', '0008', 'Item8');
insert into ItemPerfil values('0009', '0004', '0010', 'Item9');
insert into ItemPerfil values('0010', '0004', '0011', 'Item10');
insert into ItemPerfil values('0011', '0004', '0006', 'Item11');


--Insertar TipoDoc
INSERT INTO TipoDoc VALUES ('CC', 'Cedula');
INSERT INTO TipoDoc VALUES ('TI', 'Tarjeta Identidad');
INSERT INTO TipoDoc VALUES ('TE', 'Tarjeta Extranjeria');
INSERT INTO TipoDoc VALUES ('CE', 'Cedula Extranjeria');
INSERT INTO TipoDoc VALUES ('NIT', 'Nit');
INSERT INTO TipoDoc VALUES ('PAS', 'Pasaporte');


--Insertar Candidatos
INSERT INTO Candidato VALUES ('user01', 'CC', '0001', 'Juan', 'Perez', TO_DATE('1990-01-01', 'YYYY-MM-DD'), 10000000001);
INSERT INTO Candidato VALUES ('user02', 'TI', '0001', 'Maria', 'Gomez', TO_DATE('1992-02-02', 'YYYY-MM-DD'), 10000000002);
INSERT INTO Candidato VALUES ('user03', 'TE', '0001', 'Carlos', 'Lopez', TO_DATE('1985-03-03', 'YYYY-MM-DD'), 10000000003);
INSERT INTO Candidato VALUES ('user04', 'CE', '0001', 'Ana', 'Martinez', TO_DATE('1988-04-04', 'YYYY-MM-DD'), 10000000004);
INSERT INTO Candidato VALUES ('user05', 'NIT', '0001', 'Luis', 'Garcia', TO_DATE('1991-05-05', 'YYYY-MM-DD'), 10000000005);
INSERT INTO Candidato VALUES ('user06', 'PAS', '0001', 'Sofia', 'Rodriguez', TO_DATE('1993-06-06', 'YYYY-MM-DD'), 10000000006);
INSERT INTO Candidato VALUES ('user07', 'CC', '0007', 'Diego', 'Fernandez', TO_DATE('1994-07-07', 'YYYY-MM-DD'), 10000000007);
INSERT INTO Candidato VALUES ('user08', 'TI', '0002', 'Lucia', 'Ramirez', TO_DATE('1995-08-08', 'YYYY-MM-DD'), 10000000008);
INSERT INTO Candidato VALUES ('user09', 'TE', '0002', 'Miguel', 'Hernandez', TO_DATE('1996-09-09', 'YYYY-MM-DD'), 10000000009);
INSERT INTO Candidato VALUES ('user10', 'CE', '0003', 'Laura', 'Castro', TO_DATE('1997-10-10', 'YYYY-MM-DD'), 10000000010);


--Insertar ContactoCandidato
INSERT INTO ContactoCandidato VALUES (1, 'DIR', 'user01', 'Calle Falsa 123');
INSERT INTO ContactoCandidato VALUES (2, 'TEL', 'user01', '555-1234');
INSERT INTO ContactoCandidato VALUES (3, 'CEL', 'user02', '300-1234567');
INSERT INTO ContactoCandidato VALUES (4, 'LIK', 'user02', 'linkedin.com/in/mariagomez');
INSERT INTO ContactoCandidato VALUES (5, 'WHA', 'user03', '300-7654321');
INSERT INTO ContactoCandidato VALUES (6, 'DIR', 'user03', 'Avenida Siempre Viva 742');
INSERT INTO ContactoCandidato VALUES (7, 'TEO', 'user04', '555-6789');
INSERT INTO ContactoCandidato VALUES (8, 'OFI', 'user04', 'Edificio Principal, Oficina 101');
INSERT INTO ContactoCandidato VALUES (9, 'CEL', 'user05', '300-9876543');
INSERT INTO ContactoCandidato VALUES (10, 'LIK', 'user05', 'linkedin.com/in/luisgarcia');
INSERT INTO ContactoCandidato VALUES (11, 'WHA', 'user06', '300-5678901');
INSERT INTO ContactoCandidato VALUES (12, 'DIR', 'user06', 'Boulevard de los Sueños Rotos 123');
INSERT INTO ContactoCandidato VALUES (13, 'TEL', 'user07', '555-4321');
INSERT INTO ContactoCandidato VALUES (14, 'OFI', 'user07', 'Torre Ejecutiva, Piso 3');
INSERT INTO ContactoCandidato VALUES (15, 'CEL', 'user08', '300-1239876');
INSERT INTO ContactoCandidato VALUES (16, 'LIK', 'user08', 'linkedin.com/in/luciaramirez');
INSERT INTO ContactoCandidato VALUES (17, 'WHA', 'user09', '300-4567890');
INSERT INTO ContactoCandidato VALUES (18, 'DIR', 'user09', 'Calle de la Amargura 456');
INSERT INTO ContactoCandidato VALUES (19, 'TEO', 'user10', '555-8765');
INSERT INTO ContactoCandidato VALUES (20, 'OFI', 'user10', 'Edificio Corporativo, Oficina 202');


--Insertar Institucion
INSERT INTO Institucion VALUES (10001, 'Universidad Nacional');
INSERT INTO Institucion VALUES (10002, 'Universidad de los Andes');
INSERT INTO Institucion VALUES (10003, 'Universidad Javeriana');
INSERT INTO Institucion VALUES (10004, 'Instituto Tecnico Central');
INSERT INTO Institucion VALUES (10005, 'SENA');
INSERT INTO Institucion VALUES (10006, 'Politécnico Gran Colombiano');
INSERT INTO Institucion VALUES (10007, 'Universidad del Rosario');
INSERT INTO Institucion VALUES (10008, 'Instituto Tecnológico de Soledad');
INSERT INTO Institucion VALUES (10009, 'Corporacion Universitaria Minuto de Dios');
INSERT INTO Institucion VALUES (10010, 'Escuela Colombiana de Ingenieria');


--Insertar HV
INSERT INTO HV VALUES (1, 'user01', 10001, '0004', TO_DATE('2015-01-01', 'YYYY-MM-DD'), TO_DATE('2017-12-15', 'YYYY-MM-DD'), 'Maestría en Ciencias de la Computación', 'Desarrollador de Software');
INSERT INTO HV VALUES (2, 'user02', 10002, '0004', TO_DATE('2016-01-01', 'YYYY-MM-DD'), TO_DATE('2018-12-15', 'YYYY-MM-DD'), 'Maestría en Ingeniería de Software', 'Ingeniero de Software');
INSERT INTO HV VALUES (3, 'user03', 10003, '0004', TO_DATE('2014-01-01', 'YYYY-MM-DD'), TO_DATE('2016-12-15', 'YYYY-MM-DD'), 'Maestría en Sistemas de Información', 'Analista de Sistemas');
INSERT INTO HV VALUES (4, 'user04', 10006, '0004', TO_DATE('2017-01-01', 'YYYY-MM-DD'), TO_DATE('2019-12-15', 'YYYY-MM-DD'), 'Maestría en Inteligencia Artificial', 'Especialista en IA');
INSERT INTO HV VALUES (5, 'user05', 10007, '0004', TO_DATE('2013-01-01', 'YYYY-MM-DD'), TO_DATE('2015-12-15', 'YYYY-MM-DD'), 'Maestría en Seguridad Informática', 'Consultor de Seguridad');
INSERT INTO HV VALUES (6, 'user06', 10010, '0004', TO_DATE('2016-01-01', 'YYYY-MM-DD'), TO_DATE('2018-12-15', 'YYYY-MM-DD'), 'Maestría en Ciencias de Datos', 'Científico de Datos');
INSERT INTO HV VALUES (7, 'user07', 10007, '0004', TO_DATE('2016-01-01', 'YYYY-MM-DD'), TO_DATE('2018-12-15', 'YYYY-MM-DD'), 'Maestría en Derecho', 'Abogado Corporativo');
INSERT INTO HV VALUES (8, 'user08', 10008, '0001', TO_DATE('2008-01-01', 'YYYY-MM-DD'), TO_DATE('2010-12-15', 'YYYY-MM-DD'), 'Técnico en Sistemas', 'Técnico de Soporte');
INSERT INTO HV VALUES (9, 'user09', 10009, '0003', TO_DATE('2010-01-01', 'YYYY-MM-DD'), TO_DATE('2014-12-15', 'YYYY-MM-DD'), 'Administración de Empresas', 'Administrador');
INSERT INTO HV VALUES (10, 'user10', 10010, '0005', TO_DATE('2017-01-01', 'YYYY-MM-DD'), TO_DATE('2020-12-15', 'YYYY-MM-DD'), 'Doctorado en Ingeniería', 'Investigador Principal');


--Insertar Empleado
INSERT INTO Empleado VALUES ('E0001', 'Ana', 'Gomez', TO_DATE('1980-05-12', 'YYYY-MM-DD'), TO_DATE('2010-03-15', 'YYYY-MM-DD'), NULL, 'ana.gomez@example.com');
INSERT INTO Empleado VALUES ('E0002', 'Luis', 'Martinez', TO_DATE('1985-07-22', 'YYYY-MM-DD'), TO_DATE('2012-08-20', 'YYYY-MM-DD'), NULL, 'luis.martinez@example.com');
INSERT INTO Empleado VALUES ('E0003', 'Maria', 'Rodriguez', TO_DATE('1990-09-05', 'YYYY-MM-DD'), TO_DATE('2015-01-10', 'YYYY-MM-DD'), NULL, 'maria.rodriguez@example.com');
INSERT INTO Empleado VALUES ('E0004', 'Carlos', 'Perez', TO_DATE('1982-11-30', 'YYYY-MM-DD'), TO_DATE('2009-05-25', 'YYYY-MM-DD'), NULL, 'carlos.perez@example.com');
INSERT INTO Empleado VALUES ('E0005', 'Sofia', 'Lopez', TO_DATE('1992-03-18', 'YYYY-MM-DD'), TO_DATE('2017-09-05', 'YYYY-MM-DD'),NULL, 'sofia.lopez@example.com');
INSERT INTO Empleado VALUES ('E0006', 'Jorge', 'Hernandez', TO_DATE('1987-01-10', 'YYYY-MM-DD'), TO_DATE('2013-07-20', 'YYYY-MM-DD'), NULL, 'jorge.hernandez@example.com');
INSERT INTO Empleado VALUES ('E0007', 'Elena', 'Garcia', TO_DATE('1995-06-25', 'YYYY-MM-DD'), TO_DATE('2018-11-30', 'YYYY-MM-DD'), NULL, 'elena.garcia@example.com');
INSERT INTO Empleado VALUES ('E0008', 'David', 'Ramos', TO_DATE('1983-04-14', 'YYYY-MM-DD'), TO_DATE('2010-02-10', 'YYYY-MM-DD'), NULL, 'david.ramos@example.com');
INSERT INTO Empleado VALUES ('E0009', 'Laura', 'Fernandez', TO_DATE('1988-12-19', 'YYYY-MM-DD'), TO_DATE('2014-04-25', 'YYYY-MM-DD'), NULL, 'laura.fernandez@example.com');
INSERT INTO Empleado VALUES ('E0010', 'Ricardo', 'Morales', TO_DATE('1981-08-02', 'YYYY-MM-DD'), TO_DATE('2008-06-15', 'YYYY-MM-DD'), NULL, 'ricardo.morales@example.com');


--Insertar Cargo
INSERT INTO Cargo VALUES (1, '001', 'E0001', TO_DATE('2024-05-01', 'YYYY-MM-DD'), NULL, 'Analista Cliente - Ana G');
INSERT INTO Cargo VALUES (2, '001', 'E0002', TO_DATE('2024-05-02', 'YYYY-MM-DD'), NULL, 'Analista Cliente - Luis M');
INSERT INTO Cargo VALUES (3, '002', 'E0003', TO_DATE('2024-05-03', 'YYYY-MM-DD'), NULL, 'Analista General - Maria R');
INSERT INTO Cargo VALUES (4, '002', 'E0004', TO_DATE('2024-05-04', 'YYYY-MM-DD'), NULL, 'Analista General - Carlos P');
INSERT INTO Cargo VALUES (5, '003', 'E0005', TO_DATE('2024-05-05', 'YYYY-MM-DD'), NULL, 'Analista Sicologico - Sof');
INSERT INTO Cargo VALUES (6, '003', 'E0006', TO_DATE('2024-05-06', 'YYYY-MM-DD'), NULL, 'Analista Sicologico - Jo');
INSERT INTO Cargo VALUES (7, '004', 'E0007', TO_DATE('2024-05-07', 'YYYY-MM-DD'), NULL, 'Analista Conocimiento - E');
INSERT INTO Cargo VALUES (8, '004', 'E0008', TO_DATE('2024-05-08', 'YYYY-MM-DD'), NULL, 'Analista Conocimiento - D');
INSERT INTO Cargo VALUES (9, '005', 'E0009', TO_DATE('2024-05-09', 'YYYY-MM-DD'), NULL, 'Analista Tecnologico - La');
INSERT INTO Cargo VALUES (10, '005', 'E0010', TO_DATE('2024-05-10', 'YYYY-MM-DD'), NULL, 'Analista Tecnologico - Ri');


--Insertar Requerimiento
INSERT INTO Requerimiento VALUES (1, 'E0001', 'E0003', CURRENT_TIMESTAMP, 150000, 120000, 'Profesional Senior - Informatica', 'Ingenieria en Sistemas', 2);
INSERT INTO Requerimiento VALUES (2, 'E0002', 'E0004', CURRENT_TIMESTAMP, 150000, 130000, 'Directivo Superior - Tecnologia de la Informacion', 'Ciencias de la Computacion', 1);
INSERT INTO Requerimiento VALUES (3, 'E0001', 'E0003', CURRENT_TIMESTAMP, 140000, 100000, 'Profesional Senior - Desarrollo de Software', 'Ingenieria de Software', 3);
INSERT INTO Requerimiento VALUES (4, 'E0002', 'E0004', CURRENT_TIMESTAMP, 150000, 110000, 'Directivo Superior - Sistemas de Informacion', 'Ingenieria en Sistemas', 2);
INSERT INTO Requerimiento VALUES (5, 'E0001', 'E0003', CURRENT_TIMESTAMP, 130000, 90000, 'Profesional Senior - Seguridad Informatica', 'Ingenieria en Seguridad Informatica', 1);

--Insertar Sesion
INSERT INTO Sesion VALUES ('ana.gomez@example.com', 'E0001', '123'); --Analista Cliente
INSERT INTO Sesion VALUES ('maria.rodriguez@example.com', 'E0003', '12345'); --Analista General
INSERT INTO Sesion VALUES ('carlos.perez@example.com', 'E0004', '12345'); --Analista General
INSERT INTO Sesion VALUES ('elena.garcia@example.com', 'E0007', '12345'); --Analista Conocimiento



commit;


--Verificar ProcesoRequerimiento
select ConsProceso ID, idFasePerfilFase Fase, 
idPerfilProcCan Perfil, consecRequeProcReque Req, codEmpleadoProceReque Emp, 
fechaInicio Fecha from procesoRequerimiento;

--Insertar candidatos en la convocatoria
insert into ProcesoCandidato values('0003','0001', 1, 3, 'user01', sysdate, 'sfds', 'sdfsd');

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


