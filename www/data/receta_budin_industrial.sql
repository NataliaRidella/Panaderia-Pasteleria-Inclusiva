sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '1', 'H', 'HIGIENE Y SEGURIDAD', 'RESPETAR NORMAS DE HIGIENE Y SEGURIDAD. MANTENGA SU HIGIENE Y LA DE LAS HERRAMIENTAS, CUBRA SU CABELLO, NO UTILICE ANILLOS NI ESMALTE DE UÑAS. RECUERDE QUE ESTÁ TRABAJANDO CON ELEMENTOS CORTANTES O DE ALTA TEMPERATURA QUE PUEDEN PROVOCAR DAÑOS.', '0', '', '" + fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '2', 'H', 'Prender el Horno', 'PRENDER EL HORNO A TEMPERATURA DE 180°', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '3', 'H', 'SEGURIDAD', 'VERIFIQUE QUE EL ENCENDIDO DEL HORNO SEA CORRECTO Y NO SE PRODUZCAN PÉRDIDAS DE GAS.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '4', 'H', 'PREPARAR LOS MOLDES PARA BUDINES', 'ENMANTECAR Y ENHARINAR LOS MOLDES SI SON METÁLICOS.', '4', '', '" + fotoMoldesBudines + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '5', 'H', 'PREPARAR LOS MOLDES PARA BUDINES', 'COLOCAR LOS MOLDES DENTRO DE UNA ASADERA APTA PARA HORNO Y RESERVAR.', '4', '', '" + fotoMoldeBudinAsadera + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '6', 'H', 'RECOLECTAR.', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA MASA.', '0', '', '" + fotoPortadaMasaBudin + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '7', 'H', 'INGREDIENTES.', 'PREMEZCLA', '1', 'KG', '" + fotoEnvasePreMezcla + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '8', 'H', 'INGREDIENTES.', 'HUEVOS', '7', 'UNIDADES', '" + fotoHuevosUnidad + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '9', 'H', 'INGREDIENTES.', 'ACEITE', '220', 'CC', '" + fotoAceite + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '10', 'H', 'INGREDIENTES.', 'AGUA', ' 250', 'CC', '" + fotoVasoAgua + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '11', 'H', 'INGREDIENTES.', 'ESENCIA DE VAINILLA', ' 20', 'CC', '" + fotoEsenciaVainilla + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '12', 'H', 'RECOLECTAR.', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA EL GLASE', '0', '', '" + fotoTapaGlase + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '13', 'H', 'INGREDIENTES.', 'AZÚCAR IMPALPABLE', '250', 'GRAMOS', '" + fotoAzucar + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '14', 'H', 'INGREDIENTES.', 'CLARA DE HUEVO ', '1', 'UNIDAD', '" + fotoClaraHuevo + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '15', 'H', 'INGREDIENTES.', 'JUGO DE LIMÓN', '1/2', 'LIMÓN', '" + fotoJugoLimon + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '16', 'H', 'MEDICIONES.', 'PESAR LOS INGREDIENTES HASTA CONSEGUIR LAS MEDIDAS NECESARIAS. UTILICE JARRAS MEDIDORAS Y BALANZA DE COCINA.', '0', '', '" + fotoBalanza + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '17', 'H', 'EMPEZANDO CON LA MASA.', 'COLOCAR TODOS LOS INGREDIENTES HÚMEDOS (AGUA, ACEITE Y HUEVOS) DENTRO DE UN BOL.', '0', '', '"+ fotoIngredientesMasaBudin +"', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '18', 'H', 'BATIR.', 'BATIR LOS INGREDIENTES HÚMEDOS.', '0', '', '" + fotoBatirIngredientesHumedos + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '19', 'H', 'INCORPORAR.', 'INCORPORAR LA PREMEZCLA.', '0', '', '" + fotoIncorporoPreMezcla + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '20', 'H', 'MEZCLAR.', 'MEZCLAR LOS INGREDIENTES CON BATIDOR O CUCHARA HASTA LOGRAR UNA MASA HOMOGÉNEA, SIN GRUMOS.', '0', '', '" + fotoBudinMezclaHomogenea + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '21', 'H', 'COLOCAR EN MOLDES.', 'COLOCAR LA PREPARACIÓN DE LA MASA DENTRO DE LOS MOLDES PARA BUDINES .', '0', '', '" + fotoMoldeBudinAsadera + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '22', 'H', 'LLEVAR A HORNO.', 'LLEVAR LA ASADERA CON LOS BUDINES AL HORNO.', '0', '', '" + fotoBudinHorno + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '23', 'H', 'SEGURIDAD.', 'RECUERDE QUE EL HORNO ELEVA LA TEMPERATURA. EVITE EL CONTACTO ENTRE LA SUPERFICIE INTERNA DEL HORNO Y SU PIEL O ELEMENTOS QUE PUEDAN ENCENDERSE.', '0', '', '" + fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '24', 'H', 'COCINAR.', 'COCINAR EN EL HORNO DURANTE 40 MINUTOS A 180ºC.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '25', 'H', 'SACAR DEL HORNO.', 'SACAR LOS BUDINES DEL HORNO', '0', '', '" + fotoBudinHorno + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '26', 'H', 'SEGURIDAD.', 'RECUERDE UTILIZAR LAS MANOPLAS PARA QUITAR LAS ASADERAS DEL HORNO Y ASÍ EVITAR QUEMADURAS.', '0', '', '" + fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '27', 'H', 'APAGAR EL HORNO.', 'APAGAR EL HORNO.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '28', 'H', 'DEJAR ENFRIAR.', 'DEJAR ENFRIAR LOS BUDINES.', '0', '', '" + fotoMoldeBudinAsadera + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '29', 'H', 'PREPARACION DEL GLASE.', 'COLOCAR EN UN BOL LA CLARA DE HUEVO. VERIFICAR QUE NO QUEDEN RESTOS DE YEMA.', '0', '', '" + fotoHuevosEnBol + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '30', 'H', 'PREPARACION DEL GLASE.', 'AGREGAR EL JUGO DE LIMÓN Y EL AZÚCAR IMPALPABLE.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '31', 'H', 'PREPARACION DEL GLASE.', 'MEZCLAR CON BATIDOR DE ALAMBRE HASTA FORMAR UNA CREMA BLANCA.', '0', '', '" + fotoMezclaGlaseAlambre + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '32', 'H', 'TERMINACION.', 'PINTAR LOS BUDINES CON EL GLASÉ CUANDO ESTÉN FRÍOS UTILIZANDO PINCEL O CUCHARA.', '0', '', '" + fotoBudinPintarGlase + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '33', 'H', 'TERMINACION.', 'COLOCAR EN HELADERA Y ESPERAR A QUE ESTÉN COMPLETAMENTE FRÍOS PARA EMPAQUETAR.', '0', '', '" + fotoBudinTerminado + "', '', '', '')";
tx.executeSql(sql);