sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '1', 'I', 'HIGIENE Y SEGURIDAD', 'RESPETAR NORMAS DE HIGIENE Y SEGURIDAD. MANTENGA SU HIGIENE Y LA DE LAS HERRAMIENTAS, CUBRA SU CABELLO, NO UTILICE ANILLOS NI ESMALTE DE UÑAS. RECUERDE QUE ESTÁ TRABAJANDO CON ELEMENTOS CORTANTES O DE ALTA TEMPERATURA QUE PUEDEN PROVOCAR DAÑOS.', '0', '', '" + images.fotoGuantes + "', '', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '2', 'I', 'Prender el Horno', 'PRENDER EL HORNO A TEMPERATURA DE 180°', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso1.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '3', 'I', 'SEGURIDAD', 'VERIFIQUE QUE EL ENCENDIDO DEL HORNO SEA CORRECTO Y NO SE PRODUZCAN PÉRDIDAS DE GAS.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso2.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '4', 'I', 'PREPARAR LOS MOLDES PARA PIZZETAS', 'COLOCAR MOLDES DE PIZZETAS UNO AL LADO DEL OTRO EN ASADERAS APTAS PARA HORNO. PINTAR LOS MOLDES CON ACEITE. RESERVAR.', '160', 'MOLDES', '" + images.fotoMoldes + "', 'sound/Prod_Ind_Pizzetas_Paso3.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '5', 'I', 'RECOLECTAR.', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA MASA.', '0', '', '" + images.fotoPizza + "', 'sound/Prod_Ind_Pizzetas_Paso4.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '6', 'I', 'INGREDIENTES.', 'HARINA', '10', 'KG', '" + images.fotoHarina + "', 'sound/Prod_Ind_Pizzetas_Paso5(Harina).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '7', 'I', 'INGREDIENTES.', 'SAL', '200', 'GRAMOS', '" + images.fotoSal + "', 'sound/Prod_Ind_Pizzetas_Paso6(Sal).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '8', 'I', 'INGREDIENTES.', 'AZUCAR', '100', 'GRAMOS', '" + images.fotoAzucar + "', 'sound/Prod_Ind_Pizzetas_Paso7(Azucar).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '9', 'I', 'INGREDIENTES.', 'LEVADURA', ' 500', 'GRAMOS', '" + images.fotoLevadura + "', 'sound/Prod_Ind_Pizzetas_Paso8(Levadura).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '10', 'I', 'INGREDIENTES.', 'ACEITE', ' 200', 'CC', '" + images.fotoAceite + "', 'sound/Prod_Ind_Pizzetas_Paso9(Aceite).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '11', 'I', 'INGREDIENTES.', 'AGUA', ' 5', 'LITROS', '" + images.fotoBidonAgua + "', 'sound/Prod_Ind_Pizzetas_Paso10(Agua).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '12', 'I', 'RECOLECTAR.', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA SALSA', '0', '', '" + images.fotoPortadaSalsa + "', 'sound/Prod_Ind_Pizzetas_Paso11.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '13', 'I', 'INGREDIENTES.', 'SALSA DE TOMATE', '2', 'LITROS', '" + images.fotoSalsa + "', 'sound/Prod_Ind_Pizzetas_Paso12.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '14', 'I', 'RECOLECTAR.', 'SAL ', '2', 'CUCHARADAS SOPERA', '" + images.fotoCucharaSal + "', 'sound/Prod_Ind_Pizzetas_Paso6(Sal).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '15', 'I', 'RECOLECTAR.', 'AZUCAR', '1', 'CUCHARADAS SOPERA', '" + images.fotoCucharaAzucar + "', 'sound/Prod_Ind_Pizzetas_Paso7(Azucar).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '16', 'I', 'RECOLECTAR.', 'OREGANO', '3', 'CUCHARADAS SOPERA', '" + images.fotoCucharaOregano + "', 'sound/Prod_Ind_Pizzetas_Paso15(oregano).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '17', 'I', 'MEDICIONES.', 'PESAR LOS INGREDIENTES HASTA CONSEGUIR LAS MEDIDAS NECESARIAS. UTILICE JARRAS MEDIDORAS Y BALANZA DE COCINA.', '0', '', '" + images.fotoBalanza + "', 'sound/Prod_Ind_Pizzetas_Paso16.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '18', 'I', 'EMPEZANDO CON LA MASA.', 'COLOCAR TODOS LOS INGREDIENTES PARA LA MASA DENTRO DE LA BATIDORA INDUSTRIAL.', '0', '', '" + images.fotoMezclaMasaPizzaIndustrial + "', 'sound/Prod_Ind_Pizzetas_Paso17.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '19', 'I', 'UNIR.', 'UNIR LOS INGREDIENTES EN LA MÁQUINA DURANTE 20 MINUTOS HASTA LOGRAR UNA MASA HOMOGÉNEA.', '0', '', '" + images.fotoMezclaMasaPizzaIndustrialUnion + "', 'sound/Prod_Ind_Pizzetas_Paso18.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '20', 'I', 'CORTE.', 'COLOCAR LA MASA SOBRE LA  MESADA Y CORTAR EN BASTONES.', '0', '', '" + images.fotoCorte + "', 'sound/Prod_Ind_Pizzetas_Paso19.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '21', 'I', 'SOBAR LA MASA.', 'PASAR POR LA SOBADORA CADA UNO DE LOS BASTONES DE MASA UNAS 12 VECES HASTA LOGRAR UNA CONSISTENCIA ELÁSTICA. ', '0', '', '" + images.fotoMasaPizzaIndustrialSobadora + "', 'sound/Prod_Ind_Pizzetas_Paso20.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '22', 'I', 'SEGURIDAD.', 'RECUERDE QUE PARA EL USO DE LA SOBADORA DEBE TENER CUIDADO CON LOS RODILLOS. NUNCA DEBE COLOCAR LA MANO ENTRE LOS RODILLOS. SIEMPRE SE EMPUJA LA MASA DESDE EL EXTREMO MÁS LEJANO DE LOS RODILLOS.', '0', '', '" + images.fotoMasaPizzaIndustrialSobadoraSeguridad + "', 'sound/Prod_Ind_Pizzetas_Paso21.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '23', 'I', 'COLOCAR.', 'COLOCAR LA MASA ESTIRADA SOBRE LA MESADA.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso22.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '24', 'I', 'CORTE CON MOLDES.', 'OMAR MOLDES REDONDOS Nº 14 Y CORTAR LA MASA EN ESA MEDIDA.', '0', '', '" + images.fotoPizzaIndustrialEnMolde + "', 'sound/Prod_Ind_Pizzetas_Paso23.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '25', 'I', 'REUTILIZAR MASA SOBRANTE.', 'REUTILIZAR LOS SOBRANTES DE MASA, VOLVER A UNIR Y SOBAR.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso24.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '26', 'I', 'COLOCAR EN MOLDES.', 'COLOCAR LAS PIZZETAS CORTADAS DENTRO DE LOS MOLDES PREVIAMENTE ACEITADOS.', '0', '', '" + images.fotoMoldes + "', 'sound/Prod_Ind_Pizzetas_Paso25.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '27', 'I', 'ESTIRAR MASA.', 'ESTIRAR LA MASA DENTRO DEL MOLDE CON LA YEMA DE LOS DEDOS HASTA QUE ALCANCE LOS BORDES.', '0', '', '" + images.fotoEnMolde + "', 'sound/Prod_Ind_Pizzetas_Paso26.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '28', 'I', 'EMPEZANDO CON LA SALSA.', 'COLOCAR LOS INGREDIENTES DE LA SALSA EN UNA OLLA.', '0', '', '" + images.fotoPizzaIndustrialIngredienteOlla + "', 'sound/Prod_Ind_Pizzetas_Paso27.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '29', 'I', 'CALENTAR LA SALSA.', 'LLEVAR LA OLLA AL FUEGO EN LA HORNALLA. MEZCLAR CON CUCHARA DE MADERA.', '0', '', '" + images.ingredienteSalsa + "', 'sound/Prod_Ind_Pizzetas_Paso28.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '30', 'I', 'SEGURIDAD.', 'RECUERDE TENER PRECAUCIÓN AL ENCENDER EL FUEGO DE LA HORNALLA EVITANDO PÉRDIDAS DE GAS O QUEMADURAS. CADA VEZ QUE MANIPULE LA OLLA UTILICE PROTECCIÓN CON MANOPLAS PARA EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', 'sound/Prod_Ind_Pizzetas_Paso29.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '31', 'I', 'COCINAR.', 'COCINAR LA SALSA HASTA ALCANZAR EL HERVOR.', '0', '', '" + images.fotoSalsaFuego + "', 'sound/Prod_Ind_Pizzetas_Paso30.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '32', 'I', 'APAGAR EL FUEGO.', 'APAGAR EL FUEGO DE LA HORNALLA.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso31.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '33', 'I', 'ENFRIAR.', 'DEJAR ENFRIAR LA SALSA.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso32.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '34', 'I', 'TERMINACION.', 'COLOCAR LA SALSA DE TOMATE SOBRE LA MASA CRUDA DE LAS PIZZETAS.', '0', '', '" + images.fotoPizzetaConSalsa + "', 'sound/Prod_Ind_Pizzetas_Paso33.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '35', 'I', 'TERMINACION.', 'DEJAR FERMENTAR DURANTE 30 MINUTOS.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso34.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '36', 'I', 'SEGURIDAD.', 'RECUERDE QUE EL HORNO ELEVA LA TEMPERATURA. EVITE EL CONTACTO ENTRE LA SUPERFICIE INTERNA DEL HORNO Y SU PIEL O ELEMENTOS QUE PUEDAN ENCENDERSE.', '0', '', '" + images.fotoGuantes + "', 'sound/Prod_Ind_Pizzetas_Paso35.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '37', 'I', 'TERMINACION.', 'COLOCAR LAS PIZZETAS EN EL HORNO.', '0', '', '" + images.fotoPizzaIndustrialHorno + "', 'sound/Prod_Ind_Pizzetas_Paso36.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '38', 'I', 'COCINAR.', 'COCINAR DURANTE 20 MINUTOS CON EL HORNO A 180 ºC.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso37.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '39', 'I', 'SEGURIDAD.', 'RECUERDE UTILIZAR LAS MANOPLAS PARA QUITAR LAS ASADERAS DEL HORNO Y ASÍ EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', 'sound/Prod_Ind_Pizzetas_Paso38.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '40', 'I', 'RETIRAR PIZZETAS.', 'SACAR LAS PIZZETAS DEL HORNO.', '0', '', '" + images.fotoPizzaIndustrialHornoRetirar + "', 'sound/Prod_Ind_Pizzetas_Paso39.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '41', 'I', 'SEGURIDAD.', 'APAGAR EL HORNO.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso40.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '42', 'I', 'DEJAR ENFRIAR.', 'DEJAR ENFRIAR LO QUE SACAMOS DEL HORNO.', '0', '', '', 'sound/Prod_Ind_Pizzetas_Paso41.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '43', 'I', 'TERMINACION.', 'DESMOLDAR Y EMPAQUETAR CUANDO SE ENCUENTREN FRÍAS.', '0', '', '" + images.fotoPizzaIndustrialDesmoldar + "', 'sound/Prod_Ind_Pizzetas_Paso42.mp3', '', '')";
tx.executeSql(sql);