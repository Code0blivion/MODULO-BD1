/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     24/05/2024 6:09:08 p. m.                     */
/*==============================================================*/


alter table CANDIDATO
   drop constraint FK_CANDIDAT_DISCIPLIN_DISCIPLI;

alter table CANDIDATO
   drop constraint FK_CANDIDAT_TIPODOC_C_TIPODOC;

alter table CARGO
   drop constraint FK_CARGO_EMPLEADO__EMPLEADO;

alter table CARGO
   drop constraint FK_CARGO_TIPOCARGO_TIPOCARG;

alter table CONTACTOCANDIDATO
   drop constraint FK_CONTACTO_CANDIDATO_CANDIDAT;

alter table CONTACTOCANDIDATO
   drop constraint FK_CONTACTO_TIPOCON_C_TIPOCONT;

alter table CONTACTOCLIENTE
   drop constraint FK_CONTACTO_CLIENTE_C_CLIENTE;

alter table CONTACTOCLIENTE
   drop constraint FK_CONTACTO_TIPOCARGO_TIPOCARG;

alter table CONTACTOCLIENTE
   drop constraint FK_CONTACTO_TIPOCONT__TIPOCONT;

alter table DETALLEFACTURA
   drop constraint FK_DETALLEF_FACTURA_D_FACTURA;

alter table FACTURA
   drop constraint FK_FACTURA_CLIENTE_F_CLIENTE;

alter table FACTURA
   drop constraint FK_FACTURA_DIRECTORC_EMPLEADO;

alter table FASECARGO
   drop constraint FK_FASECARG_FASE_FASE_FASE;

alter table FASECARGO
   drop constraint FK_FASECARG_TIPOCARGO_TIPOCARG;

alter table HV
   drop constraint FK_HV_CANDIDATO_CANDIDAT;

alter table HV
   drop constraint FK_HV_INSTITUCI_INSTITUC;

alter table HV
   drop constraint FK_HV_TIPOITEMP_TIPOITEM;

alter table ITEMPERFIL
   drop constraint FK_ITEMPERF_PERFIL_IT_PERFIL;

alter table ITEMPERFIL
   drop constraint FK_ITEMPERF_TIPOITEMP_TIPOITEM;

alter table PERFIL
   drop constraint FK_PERFIL_DISCIPLIN_DISCIPLI;

alter table PERFILFASE
   drop constraint FK_PERFILFA_FASE_PERF_FASE;

alter table PERFILFASE
   drop constraint FK_PERFILFA_PERFIL_PE_PERFIL;

alter table PREGUNTA
   drop constraint FK_PREGUNTA_PRUEBA_PR_PRUEBA;

alter table PREGUNTA
   drop constraint FK_PREGUNTA_TIPOPREGU_TIPOPREG;

alter table PREGUNTACANDIDATO
   drop constraint FK_PREGUNTA_PREGUNTA__PREGUNTA;

alter table PREGUNTACANDIDATO
   drop constraint FK_PREGUNTA_PRUEBACAN_PRUEBACA;

alter table PROCESOCANDIDATO
   drop constraint FK_PROCESOC_CANDIDATO_CANDIDAT;

alter table PROCESOCANDIDATO
   drop constraint FK_PROCESOC_PROCESORE_PROCESOR;

alter table PROCESOREQUERIMIENTO
   drop constraint FK_PROCESOR_PERFILFAS_PERFILFA;

alter table PROCESOREQUERIMIENTO
   drop constraint FK_PROCESOR_PROCREQ_P_PRUEBA;

alter table PROCESOREQUERIMIENTO
   drop constraint FK_PROCESOR_REQUERIMI_REQUERIM;

alter table PROCESOREQUERIMIENTO
   drop constraint FK_PROCESOR_RESPONSAB_EMPLEADO;

alter table PRUEBA
   drop constraint FK_PRUEBA_DISCIPLIN_DISCIPLI;

alter table PRUEBA
   drop constraint FK_PRUEBA_FASE_PRUE_FASE;

alter table PRUEBA
   drop constraint FK_PRUEBA_TIPOPRUEB_TIPOPRUE;

alter table PRUEBACANDIDATO
   drop constraint FK_PRUEBACA_PROCESOCA_PROCESOC;

alter table PRUEBACANDIDATO
   drop constraint FK_PRUEBACA_PROCESORE_PROCESOR;

alter table REQUERIMIENTO
   drop constraint FK_REQUERIM_EMP_REQ1_EMPLEADO;

alter table REQUERIMIENTO
   drop constraint FK_REQUERIM_EMP_REQ2_EMPLEADO;

alter table RESPUESTA
   drop constraint FK_RESPUEST_PREGUNTA__PREGUNTA;

alter table RESPUESTACANDIDATO
   drop constraint FK_RESPUEST_PREGUNTAC_PREGUNTA;

alter table SESION
   drop constraint FK_SESION_SESION_EM_EMPLEADO;

drop index TIPODOC_CANDIDATO_FK;

drop index DISCIPLINA_CAN_FK;

drop table CANDIDATO cascade constraints;

drop index EMPLEADO_CARGO_FK;

drop index TIPOCARGO_CARGO_FK;

drop table CARGO cascade constraints;

drop table CLIENTE cascade constraints;

drop index CANDIDATO_CONTACTOCANDIDATO_FK;

drop index TIPOCONT_CONTACTOCAND_FK;

drop table CONTACTOCANDIDATO cascade constraints;

drop index TIPOCARGO_CONTACTOCLIENTE_FK;

drop index TIPOCONT_CONTCLI_FK;

drop index CLIENTE_CONTACTOCLIENTE_FK;

drop table CONTACTOCLIENTE cascade constraints;

drop index FACTURA_DETALLEFACTURA_FK;

drop table DETALLEFACTURA cascade constraints;

drop table DISCIPLINA cascade constraints;

drop table EMPLEADO cascade constraints;

drop index DIRECTORCUENTA_FK;

drop index CLIENTE_FACTURA_FK;

drop table FACTURA cascade constraints;

drop table FASE cascade constraints;

drop index FASE_FASECARGO_FK;

drop index TIPOCARGO_FASECARGO_FK;

drop table FASECARGO cascade constraints;

drop index TIPOITEMPERFIL_HV_FK;

drop index INSTITUCION_HV_FK;

drop index CANDIDATO_HV_FK;

drop table HV cascade constraints;

drop table INSTITUCION cascade constraints;

drop index TIPOITEMPERFIL_ITEMPERFIL_FK;

drop index PERFIL_ITEMPERFIL_FK;

drop table ITEMPERFIL cascade constraints;

drop index DISCIPLINA_PERFIL_FK;

drop table PERFIL cascade constraints;

drop index FASE_PERFILFASE_FK;

drop index PERFIL_PERFILFASE_FK;

drop table PERFILFASE cascade constraints;

drop index PRUEBA_PREGUNTA_FK;

drop index TIPOPREGUNTA_PREGUNTA_FK;

drop table PREGUNTA cascade constraints;

drop index PREGUNTA_PREGUNTACAN_FK;

drop index PRUEBACAN_PREGUNTACAN_FK;

drop table PREGUNTACANDIDATO cascade constraints;

drop index PROCESOREQUE_PROCESOCAND_FK;

drop index CANDIDATO_PROCESOCANDIDATO_FK;

drop table PROCESOCANDIDATO cascade constraints;

drop index PERFILFASE_PROCREQ_FK;

drop index PROCREQ_PRUEBA2_FK;

drop index REQ_PROCESOREQ_FK;

drop index RESPONSABLE_FK;

drop table PROCESOREQUERIMIENTO cascade constraints;

drop index FASE_PRUEBA_FK;

drop index TIPOPRUEBA_PRUEBA_FK;

drop index DISCIPLINA_PRUEBA_FK;

drop table PRUEBA cascade constraints;

drop index PROCESOCAN_PRUEBACAN_FK;

drop index PROCESOREQ_PRUEBACAN_FK;

drop table PRUEBACANDIDATO cascade constraints;

drop index EMPLEADO_REQ1_FK;

drop index EMPLEADO_REQ2_FK;

drop table REQUERIMIENTO cascade constraints;

drop index PREGUNTA_RESPUESTA_FK;

drop table RESPUESTA cascade constraints;

drop index PREGUNTACAN_RESPUESTACAN_FK;

drop table RESPUESTACANDIDATO cascade constraints;

drop index SESION_EMP_FK;

drop table SESION cascade constraints;

drop table TIPOCARGO cascade constraints;

drop table TIPOCONTACTO cascade constraints;

drop table TIPODOC cascade constraints;

drop table TIPOITEMPERFIL cascade constraints;

drop table TIPOPREGUNTA cascade constraints;

drop table TIPOPRUEBA cascade constraints;

/*==============================================================*/
/* Table: CANDIDATO                                             */
/*==============================================================*/
create table CANDIDATO 
(
   USUARIO              VARCHAR2(30)         not null,
   IDTIPODOCCAN         VARCHAR2(3)          not null,
   IDDISCIPLINACAN      VARCHAR2(4)          not null,
   NOMBRE               VARCHAR2(30)         not null,
   APELLIDO             VARCHAR2(30)         not null,
   FECHANACCAN          DATE                 not null,
   NDOC                 NUMBER(15)           not null,
   constraint PK_CANDIDATO primary key (USUARIO)
);

/*==============================================================*/
/* Index: DISCIPLINA_CAN_FK                                     */
/*==============================================================*/
create index DISCIPLINA_CAN_FK on CANDIDATO (
   IDDISCIPLINACAN ASC
);

/*==============================================================*/
/* Index: TIPODOC_CANDIDATO_FK                                  */
/*==============================================================*/
create index TIPODOC_CANDIDATO_FK on CANDIDATO (
   IDTIPODOCCAN ASC
);

/*==============================================================*/
/* Table: CARGO                                                 */
/*==============================================================*/
create table CARGO 
(
   CONSECARGO           NUMBER(4,0)          not null,
   IDTIPOCARGOCARGO     VARCHAR2(3)          not null,
   CODEMPLEADOCARGO     VARCHAR2(5)          not null,
   FECHAINICIOCARGO     DATE                 not null,
   FECHAFINCARGO        DATE,
   DESCCARGO            VARCHAR2(30)         not null,
   constraint PK_CARGO primary key (CONSECARGO)
);

/*==============================================================*/
/* Index: TIPOCARGO_CARGO_FK                                    */
/*==============================================================*/
create index TIPOCARGO_CARGO_FK on CARGO (
   IDTIPOCARGOCARGO ASC
);

/*==============================================================*/
/* Index: EMPLEADO_CARGO_FK                                     */
/*==============================================================*/
create index EMPLEADO_CARGO_FK on CARGO (
   CODEMPLEADOCARGO ASC
);

/*==============================================================*/
/* Table: CLIENTE                                               */
/*==============================================================*/
create table CLIENTE 
(
   NIT                  NUMBER(12,0)         not null,
   RAZONSOCIAL          VARCHAR2(40)         not null,
   URL                  VARCHAR2(30),
   constraint PK_CLIENTE primary key (NIT)
);

/*==============================================================*/
/* Table: CONTACTOCANDIDATO                                     */
/*==============================================================*/
create table CONTACTOCANDIDATO 
(
   CONSECCONTACANDI     NUMBER(4)            not null,
   IDTIPOCONTACTOCONCAN VARCHAR2(3)          not null,
   USUARIOCONCAN        VARCHAR2(30)         not null,
   VALORCONTACTO        VARCHAR2(40)         not null,
   constraint PK_CONTACTOCANDIDATO primary key (CONSECCONTACANDI)
);

/*==============================================================*/
/* Index: TIPOCONT_CONTACTOCAND_FK                              */
/*==============================================================*/
create index TIPOCONT_CONTACTOCAND_FK on CONTACTOCANDIDATO (
   IDTIPOCONTACTOCONCAN ASC
);

/*==============================================================*/
/* Index: CANDIDATO_CONTACTOCANDIDATO_FK                        */
/*==============================================================*/
create index CANDIDATO_CONTACTOCANDIDATO_FK on CONTACTOCANDIDATO (
   USUARIOCONCAN ASC
);

/*==============================================================*/
/* Table: CONTACTOCLIENTE                                       */
/*==============================================================*/
create table CONTACTOCLIENTE 
(
   NITCONCLI            NUMBER(12,0)         not null,
   CONSECONTACLIENTE    NUMBER(3,0)          not null,
   IDTIPOCONTACTOCONCLIEN VARCHAR2(3)          not null,
   IDTIPOCARGOCONCLIEN  VARCHAR2(3)          not null,
   NOMBREAPELLIDOCLIEN  VARCHAR2(30)         not null,
   ACTIVOCONTACLIENTE   SMALLINT             not null,
   constraint PK_CONTACTOCLIENTE primary key (NITCONCLI, CONSECONTACLIENTE)
);

/*==============================================================*/
/* Index: CLIENTE_CONTACTOCLIENTE_FK                            */
/*==============================================================*/
create index CLIENTE_CONTACTOCLIENTE_FK on CONTACTOCLIENTE (
   NITCONCLI ASC
);

/*==============================================================*/
/* Index: TIPOCONT_CONTCLI_FK                                   */
/*==============================================================*/
create index TIPOCONT_CONTCLI_FK on CONTACTOCLIENTE (
   IDTIPOCONTACTOCONCLIEN ASC
);

/*==============================================================*/
/* Index: TIPOCARGO_CONTACTOCLIENTE_FK                          */
/*==============================================================*/
create index TIPOCARGO_CONTACTOCLIENTE_FK on CONTACTOCLIENTE (
   IDTIPOCARGOCONCLIEN ASC
);

/*==============================================================*/
/* Table: DETALLEFACTURA                                        */
/*==============================================================*/
create table DETALLEFACTURA 
(
   NFACTURADETFAC       VARCHAR2(6)          not null,
   ITEM                 NUMBER(4,0)          not null,
   constraint PK_DETALLEFACTURA primary key (NFACTURADETFAC, ITEM)
);

/*==============================================================*/
/* Index: FACTURA_DETALLEFACTURA_FK                             */
/*==============================================================*/
create index FACTURA_DETALLEFACTURA_FK on DETALLEFACTURA (
   NFACTURADETFAC ASC
);

/*==============================================================*/
/* Table: DISCIPLINA                                            */
/*==============================================================*/
create table DISCIPLINA 
(
   IDDISCIPLINA         VARCHAR2(4)          not null,
   DESCDISCIPLINA       VARCHAR2(30)         not null,
   constraint PK_DISCIPLINA primary key (IDDISCIPLINA)
);

/*==============================================================*/
/* Table: EMPLEADO                                              */
/*==============================================================*/
create table EMPLEADO 
(
   CODEMPLEADO          VARCHAR2(5)          not null,
   NOMEMPLEADO          VARCHAR2(30)         not null,
   APELLEMPLEADO        VARCHAR2(30)         not null,
   FECHANACEM           DATE                 not null,
   FECHAINGRE           DATE                 not null,
   FECHAEGRESO          DATE,
   CORREO               VARCHAR2(30)         not null,
   constraint PK_EMPLEADO primary key (CODEMPLEADO)
);

/*==============================================================*/
/* Table: FACTURA                                               */
/*==============================================================*/
create table FACTURA 
(
   NFACTURA             VARCHAR2(6)          not null,
   NITFACTURA           NUMBER(12,0)         not null,
   CODEMPLEADOFACTURA   VARCHAR2(5)          not null,
   FECHAFACTURA         DATE                 not null,
   constraint PK_FACTURA primary key (NFACTURA)
);

/*==============================================================*/
/* Index: CLIENTE_FACTURA_FK                                    */
/*==============================================================*/
create index CLIENTE_FACTURA_FK on FACTURA (
   NITFACTURA ASC
);

/*==============================================================*/
/* Index: DIRECTORCUENTA_FK                                     */
/*==============================================================*/
create index DIRECTORCUENTA_FK on FACTURA (
   CODEMPLEADOFACTURA ASC
);

/*==============================================================*/
/* Table: FASE                                                  */
/*==============================================================*/
create table FASE 
(
   IDFASE               VARCHAR2(4)          not null,
   DESFASE              VARCHAR2(25)         not null,
   constraint PK_FASE primary key (IDFASE)
);

/*==============================================================*/
/* Table: FASECARGO                                             */
/*==============================================================*/
create table FASECARGO 
(
   CONSEFASECARGO       NUMBER(4,0)          not null,
   IDTIPOCARGOFASECAR   VARCHAR2(3),
   IDFASEFASECARGO      VARCHAR2(4),
   constraint PK_FASECARGO primary key (CONSEFASECARGO)
);

/*==============================================================*/
/* Index: TIPOCARGO_FASECARGO_FK                                */
/*==============================================================*/
create index TIPOCARGO_FASECARGO_FK on FASECARGO (
   IDTIPOCARGOFASECAR ASC
);

/*==============================================================*/
/* Index: FASE_FASECARGO_FK                                     */
/*==============================================================*/
create index FASE_FASECARGO_FK on FASECARGO (
   IDFASEFASECARGO ASC
);

/*==============================================================*/
/* Table: HV                                                    */
/*==============================================================*/
create table HV 
(
   CONSEHV              NUMBER(3,0)          not null,
   USUARIOHV            VARCHAR2(30)         not null,
   CODINSTITUCIONHV     NUMBER(5,0)          not null,
   IDTIPOITEMPERFILHV   VARCHAR2(4)          not null,
   FECHAINIACT          DATE                 not null,
   FECHAFINACT          DATE,
   DESCACTIVIDAD        VARCHAR2(50)         not null,
   FUNCIONACTIVIDAD     VARCHAR2(50),
   constraint PK_HV primary key (CONSEHV)
);

/*==============================================================*/
/* Index: CANDIDATO_HV_FK                                       */
/*==============================================================*/
create index CANDIDATO_HV_FK on HV (
   USUARIOHV ASC
);

/*==============================================================*/
/* Index: INSTITUCION_HV_FK                                     */
/*==============================================================*/
create index INSTITUCION_HV_FK on HV (
   CODINSTITUCIONHV ASC
);

/*==============================================================*/
/* Index: TIPOITEMPERFIL_HV_FK                                  */
/*==============================================================*/
create index TIPOITEMPERFIL_HV_FK on HV (
   IDTIPOITEMPERFILHV ASC
);

/*==============================================================*/
/* Table: INSTITUCION                                           */
/*==============================================================*/
create table INSTITUCION 
(
   CODINSTITUCION       NUMBER(5,0)          not null,
   NOMINSTITUCION       VARCHAR2(40)         not null,
   constraint PK_INSTITUCION primary key (CODINSTITUCION)
);

/*==============================================================*/
/* Table: ITEMPERFIL                                            */
/*==============================================================*/
create table ITEMPERFIL 
(
   IDITEM               NUMBER(4,0)          not null,
   IDPERFILITEMPERFIL   VARCHAR2(4)          not null,
   IDTIPOITEMPERFILITPERF VARCHAR2(4)          not null,
   DESCITEM             VARCHAR2(30)         not null,
   constraint PK_ITEMPERFIL primary key (IDITEM)
);

/*==============================================================*/
/* Index: PERFIL_ITEMPERFIL_FK                                  */
/*==============================================================*/
create index PERFIL_ITEMPERFIL_FK on ITEMPERFIL (
   IDPERFILITEMPERFIL ASC
);

/*==============================================================*/
/* Index: TIPOITEMPERFIL_ITEMPERFIL_FK                          */
/*==============================================================*/
create index TIPOITEMPERFIL_ITEMPERFIL_FK on ITEMPERFIL (
   IDTIPOITEMPERFILITPERF ASC
);

/*==============================================================*/
/* Table: PERFIL                                                */
/*==============================================================*/
create table PERFIL 
(
   IDPERFIL             VARCHAR2(4)          not null,
   IDDISCIPLINAPERFIL   VARCHAR2(4)          not null,
   DESPERFIL            VARCHAR2(50)         not null,
   constraint PK_PERFIL primary key (IDPERFIL)
);

/*==============================================================*/
/* Index: DISCIPLINA_PERFIL_FK                                  */
/*==============================================================*/
create index DISCIPLINA_PERFIL_FK on PERFIL (
   IDDISCIPLINAPERFIL ASC
);

/*==============================================================*/
/* Table: PERFILFASE                                            */
/*==============================================================*/
create table PERFILFASE 
(
   IDFASEPERFILFASE     VARCHAR2(4)          not null,
   IDPERFILPERFILFASE   VARCHAR2(4)          not null,
   constraint PK_PERFILFASE primary key (IDFASEPERFILFASE, IDPERFILPERFILFASE)
);

/*==============================================================*/
/* Index: PERFIL_PERFILFASE_FK                                  */
/*==============================================================*/
create index PERFIL_PERFILFASE_FK on PERFILFASE (
   IDPERFILPERFILFASE ASC
);

/*==============================================================*/
/* Index: FASE_PERFILFASE_FK                                    */
/*==============================================================*/
create index FASE_PERFILFASE_FK on PERFILFASE (
   IDFASEPERFILFASE ASC
);

/*==============================================================*/
/* Table: PREGUNTA                                              */
/*==============================================================*/
create table PREGUNTA 
(
   IDPRUEBAPREGUNTA     VARCHAR2(4)          not null,
   CONSEPREGUNTA        NUMBER(5,0)          not null,
   IDTIPOPREGUNTAPREG   VARCHAR2(4)          not null,
   DESCPREGUNTA         VARCHAR2(30)         not null,
   constraint PK_PREGUNTA primary key (IDPRUEBAPREGUNTA, CONSEPREGUNTA)
);

/*==============================================================*/
/* Index: TIPOPREGUNTA_PREGUNTA_FK                              */
/*==============================================================*/
create index TIPOPREGUNTA_PREGUNTA_FK on PREGUNTA (
   IDTIPOPREGUNTAPREG ASC
);

/*==============================================================*/
/* Index: PRUEBA_PREGUNTA_FK                                    */
/*==============================================================*/
create index PRUEBA_PREGUNTA_FK on PREGUNTA (
   IDPRUEBAPREGUNTA ASC
);

/*==============================================================*/
/* Table: PREGUNTACANDIDATO                                     */
/*==============================================================*/
create table PREGUNTACANDIDATO 
(
   IDPRUEBAPREGCAN      VARCHAR2(4)          not null,
   CONSEPREGUNTAPREGCAN NUMBER(5,0)          not null,
   CONSEPRUEBACANDIPREGCAN NUMBER(5,0)          not null,
   constraint PK_PREGUNTACANDIDATO primary key (IDPRUEBAPREGCAN, CONSEPREGUNTAPREGCAN, CONSEPRUEBACANDIPREGCAN)
);

/*==============================================================*/
/* Index: PRUEBACAN_PREGUNTACAN_FK                              */
/*==============================================================*/
create index PRUEBACAN_PREGUNTACAN_FK on PREGUNTACANDIDATO (
   CONSEPRUEBACANDIPREGCAN ASC
);

/*==============================================================*/
/* Index: PREGUNTA_PREGUNTACAN_FK                               */
/*==============================================================*/
create index PREGUNTA_PREGUNTACAN_FK on PREGUNTACANDIDATO (
   IDPRUEBAPREGCAN ASC,
   CONSEPREGUNTAPREGCAN ASC
);

/*==============================================================*/
/* Table: PROCESOCANDIDATO                                      */
/*==============================================================*/
create table PROCESOCANDIDATO 
(
   IDFASEPROCCAN        VARCHAR2(4)          not null,
   IDPERFILPROCCAN      VARCHAR2(4)          not null,
   CONSECREQUEPROCCAN   NUMBER(5,0)          not null,
   CONSPROCESOPROCCAN   NUMBER(5,0)          not null,
   USUARIO              VARCHAR2(30)         not null,
   FECHAPRESENTACION    DATE                 not null,
   ANALISIS             VARCHAR2(50),
   OBSERVACIONES        VARCHAR2(50),
   constraint PK_PROCESOCANDIDATO primary key (IDFASEPROCCAN, IDPERFILPROCCAN, CONSECREQUEPROCCAN, CONSPROCESOPROCCAN, USUARIO)
);

/*==============================================================*/
/* Index: CANDIDATO_PROCESOCANDIDATO_FK                         */
/*==============================================================*/
create index CANDIDATO_PROCESOCANDIDATO_FK on PROCESOCANDIDATO (
   USUARIO ASC
);

/*==============================================================*/
/* Index: PROCESOREQUE_PROCESOCAND_FK                           */
/*==============================================================*/
create index PROCESOREQUE_PROCESOCAND_FK on PROCESOCANDIDATO (
   IDFASEPROCCAN ASC,
   IDPERFILPROCCAN ASC,
   CONSECREQUEPROCCAN ASC,
   CONSPROCESOPROCCAN ASC
);

/*==============================================================*/
/* Table: PROCESOREQUERIMIENTO                                  */
/*==============================================================*/
create table PROCESOREQUERIMIENTO 
(
   IDFASEPERFILFASE     VARCHAR2(4)          not null,
   IDPERFILPROCCAN      VARCHAR2(4)          not null,
   CONSECREQUEPROCREQUE NUMBER(5,0)          not null,
   CONSPROCESO          NUMBER(5,0)          not null,
   CODEMPLEADOPROCEREQUE VARCHAR2(5),
   IDPRUEBAPROC         VARCHAR2(4),
   FECHAINICIO          DATE,
   FECHAFIN             DATE,
   CONVOCATORIA         VARCHAR2(200),
   INVITACION           VARCHAR2(200),
   constraint PK_PROCESOREQUERIMIENTO primary key (IDFASEPERFILFASE, IDPERFILPROCCAN, CONSECREQUEPROCREQUE, CONSPROCESO)
);

/*==============================================================*/
/* Index: RESPONSABLE_FK                                        */
/*==============================================================*/
create index RESPONSABLE_FK on PROCESOREQUERIMIENTO (
   CODEMPLEADOPROCEREQUE ASC
);

/*==============================================================*/
/* Index: REQ_PROCESOREQ_FK                                     */
/*==============================================================*/
create index REQ_PROCESOREQ_FK on PROCESOREQUERIMIENTO (
   CONSECREQUEPROCREQUE ASC
);

/*==============================================================*/
/* Index: PROCREQ_PRUEBA2_FK                                    */
/*==============================================================*/
create index PROCREQ_PRUEBA2_FK on PROCESOREQUERIMIENTO (
   IDPRUEBAPROC ASC
);

/*==============================================================*/
/* Index: PERFILFASE_PROCREQ_FK                                 */
/*==============================================================*/
create index PERFILFASE_PROCREQ_FK on PROCESOREQUERIMIENTO (
   IDFASEPERFILFASE ASC,
   IDPERFILPROCCAN ASC
);

/*==============================================================*/
/* Table: PRUEBA                                                */
/*==============================================================*/
create table PRUEBA 
(
   IDPRUEBA             VARCHAR2(4)          not null,
   IDDISCIPLINAPRUEBA   VARCHAR2(4),
   IDTIPOPRUEBAPRUEBA   VARCHAR2(2)          not null,
   IDFASEPRUEBA         VARCHAR2(4)          not null,
   DESCPRUEBA           VARCHAR2(30)         not null,
   PRUEBAACTIVA         SMALLINT             not null,
   FECHACREADA          DATE,
   constraint PK_PRUEBA primary key (IDPRUEBA)
);

/*==============================================================*/
/* Index: DISCIPLINA_PRUEBA_FK                                  */
/*==============================================================*/
create index DISCIPLINA_PRUEBA_FK on PRUEBA (
   IDDISCIPLINAPRUEBA ASC
);

/*==============================================================*/
/* Index: TIPOPRUEBA_PRUEBA_FK                                  */
/*==============================================================*/
create index TIPOPRUEBA_PRUEBA_FK on PRUEBA (
   IDTIPOPRUEBAPRUEBA ASC
);

/*==============================================================*/
/* Index: FASE_PRUEBA_FK                                        */
/*==============================================================*/
create index FASE_PRUEBA_FK on PRUEBA (
   IDFASEPRUEBA ASC
);

/*==============================================================*/
/* Table: PRUEBACANDIDATO                                       */
/*==============================================================*/
create table PRUEBACANDIDATO 
(
   CONSEPRUEBACANDI     NUMBER(5,0)          not null,
   IDFASEPRUEBACAN      VARCHAR2(4)          not null,
   PRO_IDPERFILPROCCAN  VARCHAR2(4)          not null,
   CONSECREQUEPRUCAN    NUMBER(5,0)          not null,
   CONSPROCESOPRUEBACAN NUMBER(5,0)          not null,
   IDFASEPROCCAN        VARCHAR2(4)          not null,
   IDPERFILPROCCAN      VARCHAR2(4)          not null,
   CONSECREQUEPROCCAN   NUMBER(5,0)          not null,
   CONSPROCESOPROCCAN   NUMBER(5,0)          not null,
   USUARIOPRUECAN       VARCHAR2(30)         not null,
   FECHAPRES            DATE                 not null,
   CALIFICACION         NUMBER(3,1),
   constraint PK_PRUEBACANDIDATO primary key (CONSEPRUEBACANDI)
);

/*==============================================================*/
/* Index: PROCESOREQ_PRUEBACAN_FK                               */
/*==============================================================*/
create index PROCESOREQ_PRUEBACAN_FK on PRUEBACANDIDATO (
   IDFASEPRUEBACAN ASC,
   PRO_IDPERFILPROCCAN ASC,
   CONSECREQUEPRUCAN ASC,
   CONSPROCESOPRUEBACAN ASC
);

/*==============================================================*/
/* Index: PROCESOCAN_PRUEBACAN_FK                               */
/*==============================================================*/
create index PROCESOCAN_PRUEBACAN_FK on PRUEBACANDIDATO (
   IDFASEPROCCAN ASC,
   IDPERFILPROCCAN ASC,
   CONSECREQUEPROCCAN ASC,
   CONSPROCESOPROCCAN ASC,
   USUARIOPRUECAN ASC
);

/*==============================================================*/
/* Table: REQUERIMIENTO                                         */
/*==============================================================*/
create table REQUERIMIENTO 
(
   CONSECREQUE          NUMBER(5,0)          not null,
   CODEMPLEADOREQUE     VARCHAR2(5)          not null,
   EMP_CODEMPLEADO      VARCHAR2(5),
   FECHAREQUE           DATE                 not null,
   SALARIOMAX           NUMBER(6,0)          not null,
   SALARIOMIN           NUMBER(6,0),
   DESCFUNCION          VARCHAR2(50)         not null,
   DESCCARRERAS         VARCHAR2(50)         not null,
   NVVACANTES           NUMBER(2,0)          not null,
   constraint PK_REQUERIMIENTO primary key (CONSECREQUE)
);

/*==============================================================*/
/* Index: EMPLEADO_REQ2_FK                                      */
/*==============================================================*/
create index EMPLEADO_REQ2_FK on REQUERIMIENTO (
   CODEMPLEADOREQUE ASC
);

/*==============================================================*/
/* Index: EMPLEADO_REQ1_FK                                      */
/*==============================================================*/
create index EMPLEADO_REQ1_FK on REQUERIMIENTO (
   EMP_CODEMPLEADO ASC
);

/*==============================================================*/
/* Table: RESPUESTA                                             */
/*==============================================================*/
create table RESPUESTA 
(
   IDPRUEBARESP         VARCHAR2(4)          not null,
   CONSEPREGUNTARES     NUMBER(5,0)          not null,
   CONSECRESPUESTA      NUMBER(3,0)          not null,
   RESPUESTA            VARCHAR2(30)         not null,
   constraint PK_RESPUESTA primary key (IDPRUEBARESP, CONSEPREGUNTARES, CONSECRESPUESTA)
);

/*==============================================================*/
/* Index: PREGUNTA_RESPUESTA_FK                                 */
/*==============================================================*/
create index PREGUNTA_RESPUESTA_FK on RESPUESTA (
   IDPRUEBARESP ASC,
   CONSEPREGUNTARES ASC
);

/*==============================================================*/
/* Table: RESPUESTACANDIDATO                                    */
/*==============================================================*/
create table RESPUESTACANDIDATO 
(
   CONSECRESCANDI       NUMBER(4,0)          not null,
   IDPRUEBARESPCAN      VARCHAR2(4),
   CONSEPREGUNTAPREGCAN NUMBER(5,0),
   CONSEPRUEBACANDIRESCAN NUMBER(5,0),
   REESCANDI            VARCHAR2(40)         not null,
   constraint PK_RESPUESTACANDIDATO primary key (CONSECRESCANDI)
);

/*==============================================================*/
/* Index: PREGUNTACAN_RESPUESTACAN_FK                           */
/*==============================================================*/
create index PREGUNTACAN_RESPUESTACAN_FK on RESPUESTACANDIDATO (
   IDPRUEBARESPCAN ASC,
   CONSEPREGUNTAPREGCAN ASC,
   CONSEPRUEBACANDIRESCAN ASC
);

/*==============================================================*/
/* Table: SESION                                                */
/*==============================================================*/
create table SESION 
(
   USUARIOEMP           VARCHAR2(30)         not null,
   CODEMPLEADOFK        VARCHAR2(5)          not null,
   CONTRASENIA          VARCHAR2(20)         not null,
   constraint PK_SESION primary key (USUARIOEMP)
);

/*==============================================================*/
/* Index: SESION_EMP_FK                                         */
/*==============================================================*/
create index SESION_EMP_FK on SESION (
   CODEMPLEADOFK ASC
);

/*==============================================================*/
/* Table: TIPOCARGO                                             */
/*==============================================================*/
create table TIPOCARGO 
(
   IDTIPOCARGO          VARCHAR2(3)          not null,
   DESCTIPOCARGO        VARCHAR2(20)         not null,
   constraint PK_TIPOCARGO primary key (IDTIPOCARGO)
);

/*==============================================================*/
/* Table: TIPOCONTACTO                                          */
/*==============================================================*/
create table TIPOCONTACTO 
(
   IDTIPOCONTACTO       VARCHAR2(3)          not null,
   DESCTIPOCONTACTO     VARCHAR2(20)         not null,
   constraint PK_TIPOCONTACTO primary key (IDTIPOCONTACTO)
);

/*==============================================================*/
/* Table: TIPODOC                                               */
/*==============================================================*/
create table TIPODOC 
(
   IDTIPODOC            VARCHAR2(3)          not null,
   DESCTIPODOC          VARCHAR2(20)         not null,
   constraint PK_TIPODOC primary key (IDTIPODOC)
);

/*==============================================================*/
/* Table: TIPOITEMPERFIL                                        */
/*==============================================================*/
create table TIPOITEMPERFIL 
(
   IDTIPOITEMPERFIL     VARCHAR2(4)          not null,
   DESCTIPOITEMPERFIL   VARCHAR2(30)         not null,
   constraint PK_TIPOITEMPERFIL primary key (IDTIPOITEMPERFIL)
);

/*==============================================================*/
/* Table: TIPOPREGUNTA                                          */
/*==============================================================*/
create table TIPOPREGUNTA 
(
   IDTIPOPREGUNTA       VARCHAR2(4)          not null,
   DESCTIPOPREGUNTA     VARCHAR2(30)         not null,
   constraint PK_TIPOPREGUNTA primary key (IDTIPOPREGUNTA)
);

/*==============================================================*/
/* Table: TIPOPRUEBA                                            */
/*==============================================================*/
create table TIPOPRUEBA 
(
   IDTIPOPRUEBA         VARCHAR2(2)          not null,
   DESCTIPOPRUEBA       VARCHAR2(30)         not null,
   constraint PK_TIPOPRUEBA primary key (IDTIPOPRUEBA)
);

alter table CANDIDATO
   add constraint FK_CANDIDAT_DISCIPLIN_DISCIPLI foreign key (IDDISCIPLINACAN)
      references DISCIPLINA (IDDISCIPLINA);

alter table CANDIDATO
   add constraint FK_CANDIDAT_TIPODOC_C_TIPODOC foreign key (IDTIPODOCCAN)
      references TIPODOC (IDTIPODOC);

alter table CARGO
   add constraint FK_CARGO_EMPLEADO__EMPLEADO foreign key (CODEMPLEADOCARGO)
      references EMPLEADO (CODEMPLEADO);

alter table CARGO
   add constraint FK_CARGO_TIPOCARGO_TIPOCARG foreign key (IDTIPOCARGOCARGO)
      references TIPOCARGO (IDTIPOCARGO);

alter table CONTACTOCANDIDATO
   add constraint FK_CONTACTO_CANDIDATO_CANDIDAT foreign key (USUARIOCONCAN)
      references CANDIDATO (USUARIO);

alter table CONTACTOCANDIDATO
   add constraint FK_CONTACTO_TIPOCON_C_TIPOCONT foreign key (IDTIPOCONTACTOCONCAN)
      references TIPOCONTACTO (IDTIPOCONTACTO);

alter table CONTACTOCLIENTE
   add constraint FK_CONTACTO_CLIENTE_C_CLIENTE foreign key (NITCONCLI)
      references CLIENTE (NIT);

alter table CONTACTOCLIENTE
   add constraint FK_CONTACTO_TIPOCARGO_TIPOCARG foreign key (IDTIPOCARGOCONCLIEN)
      references TIPOCARGO (IDTIPOCARGO);

alter table CONTACTOCLIENTE
   add constraint FK_CONTACTO_TIPOCONT__TIPOCONT foreign key (IDTIPOCONTACTOCONCLIEN)
      references TIPOCONTACTO (IDTIPOCONTACTO);

alter table DETALLEFACTURA
   add constraint FK_DETALLEF_FACTURA_D_FACTURA foreign key (NFACTURADETFAC)
      references FACTURA (NFACTURA);

alter table FACTURA
   add constraint FK_FACTURA_CLIENTE_F_CLIENTE foreign key (NITFACTURA)
      references CLIENTE (NIT);

alter table FACTURA
   add constraint FK_FACTURA_DIRECTORC_EMPLEADO foreign key (CODEMPLEADOFACTURA)
      references EMPLEADO (CODEMPLEADO);

alter table FASECARGO
   add constraint FK_FASECARG_FASE_FASE_FASE foreign key (IDFASEFASECARGO)
      references FASE (IDFASE);

alter table FASECARGO
   add constraint FK_FASECARG_TIPOCARGO_TIPOCARG foreign key (IDTIPOCARGOFASECAR)
      references TIPOCARGO (IDTIPOCARGO);

alter table HV
   add constraint FK_HV_CANDIDATO_CANDIDAT foreign key (USUARIOHV)
      references CANDIDATO (USUARIO);

alter table HV
   add constraint FK_HV_INSTITUCI_INSTITUC foreign key (CODINSTITUCIONHV)
      references INSTITUCION (CODINSTITUCION);

alter table HV
   add constraint FK_HV_TIPOITEMP_TIPOITEM foreign key (IDTIPOITEMPERFILHV)
      references TIPOITEMPERFIL (IDTIPOITEMPERFIL);

alter table ITEMPERFIL
   add constraint FK_ITEMPERF_PERFIL_IT_PERFIL foreign key (IDPERFILITEMPERFIL)
      references PERFIL (IDPERFIL);

alter table ITEMPERFIL
   add constraint FK_ITEMPERF_TIPOITEMP_TIPOITEM foreign key (IDTIPOITEMPERFILITPERF)
      references TIPOITEMPERFIL (IDTIPOITEMPERFIL);

alter table PERFIL
   add constraint FK_PERFIL_DISCIPLIN_DISCIPLI foreign key (IDDISCIPLINAPERFIL)
      references DISCIPLINA (IDDISCIPLINA);

alter table PERFILFASE
   add constraint FK_PERFILFA_FASE_PERF_FASE foreign key (IDFASEPERFILFASE)
      references FASE (IDFASE);

alter table PERFILFASE
   add constraint FK_PERFILFA_PERFIL_PE_PERFIL foreign key (IDPERFILPERFILFASE)
      references PERFIL (IDPERFIL);

alter table PREGUNTA
   add constraint FK_PREGUNTA_PRUEBA_PR_PRUEBA foreign key (IDPRUEBAPREGUNTA)
      references PRUEBA (IDPRUEBA);

alter table PREGUNTA
   add constraint FK_PREGUNTA_TIPOPREGU_TIPOPREG foreign key (IDTIPOPREGUNTAPREG)
      references TIPOPREGUNTA (IDTIPOPREGUNTA);

alter table PREGUNTACANDIDATO
   add constraint FK_PREGUNTA_PREGUNTA__PREGUNTA foreign key (IDPRUEBAPREGCAN, CONSEPREGUNTAPREGCAN)
      references PREGUNTA (IDPRUEBAPREGUNTA, CONSEPREGUNTA);

alter table PREGUNTACANDIDATO
   add constraint FK_PREGUNTA_PRUEBACAN_PRUEBACA foreign key (CONSEPRUEBACANDIPREGCAN)
      references PRUEBACANDIDATO (CONSEPRUEBACANDI);

alter table PROCESOCANDIDATO
   add constraint FK_PROCESOC_CANDIDATO_CANDIDAT foreign key (USUARIO)
      references CANDIDATO (USUARIO);

alter table PROCESOCANDIDATO
   add constraint FK_PROCESOC_PROCESORE_PROCESOR foreign key (IDFASEPROCCAN, IDPERFILPROCCAN, CONSECREQUEPROCCAN, CONSPROCESOPROCCAN)
      references PROCESOREQUERIMIENTO (IDFASEPERFILFASE, IDPERFILPROCCAN, CONSECREQUEPROCREQUE, CONSPROCESO);

alter table PROCESOREQUERIMIENTO
   add constraint FK_PROCESOR_PERFILFAS_PERFILFA foreign key (IDFASEPERFILFASE, IDPERFILPROCCAN)
      references PERFILFASE (IDFASEPERFILFASE, IDPERFILPERFILFASE);

alter table PROCESOREQUERIMIENTO
   add constraint FK_PROCESOR_PROCREQ_P_PRUEBA foreign key (IDPRUEBAPROC)
      references PRUEBA (IDPRUEBA);

alter table PROCESOREQUERIMIENTO
   add constraint FK_PROCESOR_REQUERIMI_REQUERIM foreign key (CONSECREQUEPROCREQUE)
      references REQUERIMIENTO (CONSECREQUE);

alter table PROCESOREQUERIMIENTO
   add constraint FK_PROCESOR_RESPONSAB_EMPLEADO foreign key (CODEMPLEADOPROCEREQUE)
      references EMPLEADO (CODEMPLEADO);

alter table PRUEBA
   add constraint FK_PRUEBA_DISCIPLIN_DISCIPLI foreign key (IDDISCIPLINAPRUEBA)
      references DISCIPLINA (IDDISCIPLINA);

alter table PRUEBA
   add constraint FK_PRUEBA_FASE_PRUE_FASE foreign key (IDFASEPRUEBA)
      references FASE (IDFASE);

alter table PRUEBA
   add constraint FK_PRUEBA_TIPOPRUEB_TIPOPRUE foreign key (IDTIPOPRUEBAPRUEBA)
      references TIPOPRUEBA (IDTIPOPRUEBA);

alter table PRUEBACANDIDATO
   add constraint FK_PRUEBACA_PROCESOCA_PROCESOC foreign key (IDFASEPROCCAN, IDPERFILPROCCAN, CONSECREQUEPROCCAN, CONSPROCESOPROCCAN, USUARIOPRUECAN)
      references PROCESOCANDIDATO (IDFASEPROCCAN, IDPERFILPROCCAN, CONSECREQUEPROCCAN, CONSPROCESOPROCCAN, USUARIO);

alter table PRUEBACANDIDATO
   add constraint FK_PRUEBACA_PROCESORE_PROCESOR foreign key (IDFASEPRUEBACAN, PRO_IDPERFILPROCCAN, CONSECREQUEPRUCAN, CONSPROCESOPRUEBACAN)
      references PROCESOREQUERIMIENTO (IDFASEPERFILFASE, IDPERFILPROCCAN, CONSECREQUEPROCREQUE, CONSPROCESO);

alter table REQUERIMIENTO
   add constraint FK_REQUERIM_EMP_REQ1_EMPLEADO foreign key (EMP_CODEMPLEADO)
      references EMPLEADO (CODEMPLEADO);

alter table REQUERIMIENTO
   add constraint FK_REQUERIM_EMP_REQ2_EMPLEADO foreign key (CODEMPLEADOREQUE)
      references EMPLEADO (CODEMPLEADO);

alter table RESPUESTA
   add constraint FK_RESPUEST_PREGUNTA__PREGUNTA foreign key (IDPRUEBARESP, CONSEPREGUNTARES)
      references PREGUNTA (IDPRUEBAPREGUNTA, CONSEPREGUNTA);

alter table RESPUESTACANDIDATO
   add constraint FK_RESPUEST_PREGUNTAC_PREGUNTA foreign key (IDPRUEBARESPCAN, CONSEPREGUNTAPREGCAN, CONSEPRUEBACANDIRESCAN)
      references PREGUNTACANDIDATO (IDPRUEBAPREGCAN, CONSEPREGUNTAPREGCAN, CONSEPRUEBACANDIPREGCAN);

alter table SESION
   add constraint FK_SESION_SESION_EM_EMPLEADO foreign key (CODEMPLEADOFK)
      references EMPLEADO (CODEMPLEADO);

