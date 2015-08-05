sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '1', 'H', 'HIGIENE Y SEGURIDAD', 'RESPETAR NORMAS DE HIGIENE Y SEGURIDAD. MANTENGA SU HIGIENE Y LA DE LAS HERRAMIENTAS, CUBRA SU CABELLO, NO UTILICE ANILLOS NI ESMALTE DE UÑAS. RECUERDE QUE ESTÁ TRABAJANDO CON ELEMENTOS CORTANTES O DE ALTA TEMPERATURA QUE PUEDEN PROVOCAR DAÑOS.', '0', '', '" + images.fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '2', 'H', 'Prender el Horno', 'PRENDER EL HORNO A TEMPERATURA DE 180°', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '3', 'H', 'SEGURIDAD', 'VERIFIQUE QUE EL ENCENDIDO DEL HORNO SEA CORRECTO Y NO SE PRODUZCAN PÉRDIDAS DE GAS.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '4', 'H', 'PREPARAR LOS MOLDES PARA PIZZETAS', 'COLOCAR MOLDES DE PIZZETAS UNO AL LADO DEL OTRO EN ASADERAS APTAS PARA HORNO. PINTAR LOS MOLDES CON ACEITE. RESERVAR.', '12', 'MOLDES', '" + images.fotoMoldes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '5', 'H', 'RECOLECTAR.', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA MASA.', '0', '', '" + images.fotoPizza + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '6', 'H', 'INGREDIENTES.', 'HARINA', '500', 'GR', '" + images.fotoHarina + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '7', 'H', 'INGREDIENTES.', 'SAL', '10', 'GRAMOS', '" + images.fotoSal + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '8', 'H', 'INGREDIENTES.', 'AZUCAR', '5', 'GRAMOS', '" + images.fotoAzucar + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '9', 'H', 'INGREDIENTES.', 'LEVADURA', ' 25', 'GRAMOS', '" + images.fotoLevadura + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '10', 'H', 'INGREDIENTES.', 'ACEITE', ' 10', 'CC', '" + images.fotoAceite + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '11', 'H', 'INGREDIENTES.', 'AGUA', ' 250', 'CC', '" + images.fotoVasoAgua + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '12', 'H', 'RECOLECTAR.', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA SALSA', '0', '', '" + images.fotoPortadaSalsa + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '13', 'H', 'INGREDIENTES.', 'SALSA DE TOMATE', '250', 'GRAMOS', '" + images.fotoSalsa + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '14', 'H', 'RECOLECTAR.', 'SAL ', '10', 'GRAMOS', '" + images.fotoCucharaSal + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '15', 'H', 'RECOLECTAR.', 'AZUCAR', '5', 'GRAMOS', '" + images.fotoCucharaAzucar + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '16', 'H', 'RECOLECTAR.', 'OREGANO', '5', 'GRAMOS', '" + images.fotoCucharaOregano + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '17', 'H', 'MEDICIONES.', 'PESAR LOS INGREDIENTES HASTA CONSEGUIR LAS MEDIDAS NECESARIAS. UTILICE JARRAS MEDIDORAS Y BALANZA DE COCINA.', '0', '', '" + images.fotoBalanza + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '18', 'H', 'EMPEZANDO CON LA MASA.', 'COLOCAR LA HARINA SOBRE LA MESADA Y REALIZAR UNA CORONA.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '19', 'H', 'MEZCLAR.', 'MEZCLAR LA SAL, AZÚCAR, LEVADURA, AGUA Y ACEITE. COLOCAR ESTOS INGREDIENTES EN LE CENTRO DE LA CORONA DE HARINA.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '20', 'H', 'UNIR INGREDIENTES.', 'UNIR TODOS LOS INGREDIENTES CON LAS MANOS PARA FORMAR UNA MASA HOMOGÉNEA.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '21', 'H', 'AMASAR.', 'AMASAR DURANTE 10 MINUTOS.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '22', 'H', 'CORTAR.', 'CORTAR PIEZAS DE 60 GRAMOS CADA UNO.', '10', 'PIEZAS', '" + images.fotoCorte + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '23', 'H', 'BOLLAR.', 'BOLLAR Y DEJAR DESCASAR A TEMPERATURA AMBIENTE CADA UNO.', '0', '', '" + images.fotoBollo + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '24', 'H', 'APLASTAR.', 'APLASTAR CON LA PALMA DE LA MANO Y ACOMODAR EN LOS MOLDES PREVIAMENTE ACEITADOS.', '0', '', '" + images.fotoEnMolde + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '25', 'H', 'EMPEZANDO CON LA SALSA.', 'COLOCAR LOS INGREDIENTES DE LA SALSA DE TOMATE EN UNA OLLA .', '0', '', '" + images.ingredienteSalsa + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '26', 'H', 'SEGURIDAD.', 'RECUERDE TENER PRECAUCIÓN AL ENCENDER EL FUEGO DE LA HORNALLA EVITANDO PÉRDIDAS DE GAS O QUEMADURAS. CADA VEZ QUE MANIPULE LA OLLA UTILICE PROTECCIÓN CON MANOPLAS PARA EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '27', 'H', 'CALENTAR LA SALSA.', 'LLEVAR LA OLLA AL FUEGO EN LA HORNALLA. MEZCLAR CON CUCHARA DE MADERA.', '0', '', '" + images.ingredienteSalsa + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '28', 'H', 'COCINAR.', 'COCINAR LA SALSA HASTA ALCANZAR EL HERVOR.', '0', '', '" + images.fotoSalsaFuego + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '29', 'H', 'APAGAR EL FUEGO.', 'APAGAR EL FUEGO DE LA HORNALLA.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '30', 'H', 'ENFRIAR.', 'DEJAR ENFRIAR LA SALSA.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '31', 'H', 'TERMINACION.', 'COLOCAR LA SALSA DE TOMATE SOBRE LA MASA CRUDA DE LAS PIZZETAS.', '0', '', '" + images.fotoPizzetaConSalsa + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '32', 'H', 'TERMINACION.', 'DEJAR FERMENTAR DURANTE 30 MINUTOS.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '33', 'H', 'SEGURIDAD.', 'RECUERDE QUE EL HORNO ELEVA LA TEMPERATURA. EVITE EL CONTACTO ENTRE LA SUPERFICIE INTERNA DEL HORNO Y SU PIEL O ELEMENTOS QUE PUEDAN ENCENDERSE.', '0', '', '" + images.fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '34', 'H', 'TERMINACION.', 'COLOCAR LAS PIZZETAS EN EL HORNO.', '0', '', '" + images.fotoPizzetasHorno + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '35', 'H', 'COCINAR.', 'COCINAR DURANTE 20 MINUTOS CON EL HORNO A 180 ºC.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '36', 'H', 'SEGURIDAD.', 'RECUERDE UTILIZAR LAS MANOPLAS PARA QUITAR LAS ASADERAS DEL HORNO Y ASÍ EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '37', 'H', 'RETIRAR PIZZETAS.', 'SACAR LAS PIZZETAS DEL HORNO.', '0', '', '" + images.fotoPizzetasHorno + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '38', 'H', 'SEGURIDAD.', 'APAGAR EL HORNO.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '39', 'H', 'DEJAR ENFRIAR.', 'DEJAR ENFRIAR LO QUE SACAMOS DEL HORNO.', '0', '', '', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '40', 'H', 'TERMINACION.', 'DESMOLDAR Y EMPAQUETAR CUANDO SE ENCUENTREN FRÍAS.', '0', '', '', '', '', '')";
tx.executeSql(sql);