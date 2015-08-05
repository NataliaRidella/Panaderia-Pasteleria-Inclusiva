/**
 * A simple example service that returns some data.
 */
angular.module('starter.services', [])

.factory('Storage', ['Files', '$q', function (Files, $q) {
    'use strict';
/*    var USUARIOS_FILE = 'usuarios.sql';
    var RECETAS_FILE = 'recetas.sql';
    var PASOSRECETAS_FILE = 'pasosRecetas.sql';
    var ESTADISTICAS_FILE = 'estadisticas.sql';*/
    
    var webSqlAdapter = {};
    //var webSqlAdapter.db;
    webSqlAdapter.executeQuery = function(query, parameters){
        //Execute Query
        var deferred = $q.defer();
        webSqlAdapter.db.transaction(
            function (tx) {
                var sql = query;

                tx.executeSql(sql, parameters, function (tx, results) {
                    var resultado = [];
                    if (results !== null && results.rows !== null) {
                        var len = results.rows.length,
                            i = 0;
                        for (; i < len; i = i + 1) {
                            resultado[i] = results.rows.item(i);
                        }
                        console.log('Query: ' + sql + ' - results: ' + len);
                    }
                    deferred.resolve(resultado);
                });
            },
            function (error) {
                deferred.reject('Transacción Error: ' + error.message);
                //console.log('transaccion error');
            }
        );
            return deferred.promise;
        //Retorna objecto/array resultado
    };
    
    webSqlAdapter.executeInsert = function(query){
        //Execute Query
        var deferred = $q.defer();
        webSqlAdapter.db.transaction(
            function (tx) {
                var sql = query;

                tx.executeSql(sql, null, function (tx, results) {
                    var resultado = [];
                    if (results && results.insertId) {
                        console.log('Se Inserto: ' + results.insertId);
                        resultado = results.insertId;
                    } else {
                        resultado = -1;
                    }
                    deferred.resolve(resultado);
                });
            },
            function (error) {
                deferred.reject('Insert Error: ' + error.message);
                //console.log('transaccion error');
            }
        );
            return deferred.promise;
        //Retorna objecto/array resultado
    };
    
    webSqlAdapter.actualizarDatos = function(query){
      var sql = 'UPDATE Usuarios SET ' + query;
      return webSqlAdapter.executeQuery(sql);
      //, userType, password, thumbnail, photo ) VALUES ('Administrador', 'A', '123', "'+ noPhotoBoy +'", "'+ noPhotoBoy +'")';
    };
    
    webSqlAdapter.crearTablas = function(tx, images, platformAndroid) {
		
		var cabeceraAudio = '';
		
		if(platformAndroid) {
			//console.log("ES ANDROID!!!");
			cabeceraAudio = '/android_asset/www/';
		}
		else{
			//console.log("NOOOO ES ANDROID!!!");
		}
      
        //AGREGAR COLUMNAS DE USUARIO
        var sql = 'CREATE TABLE Usuarios ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), password VARCHAR(50), userType VARCHAR(1), edad INTEGER(1), photo VARCHAR(50), thumbnail VARCHAR(50), gender VARCHAR(1), passwordMaster VARCHAR(50) ) ';

        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla Usuarios OK');
                //webSqlAdapter.crearDatosPrimerE   jecucion(tx);
            },
            function (tx, error) {
                console.log('Crear tabla error: ' + error.message);
                //Si la tabla ya existe tira error, y no continua la ejecucion (los usuarios tambien ya existen)
                return true;
            });

        sql = "INSERT OR REPLACE INTO Usuarios (name, userType, password, thumbnail, photo, gender, passwordMaster ) VALUES ('Administrador', 'A', '123', '"+ images.noPhotoBoy +"', '"+ images.noPhotoBoy +"', 'M', 'tbdclavemaestra')";
        tx.executeSql(sql);
        
        sql = "INSERT OR REPLACE INTO Usuarios (name, userType, password, thumbnail, photo, gender) VALUES ('Invitado', 'I', '', '"+ images.noPhotoBoy +"', '"+ images.noPhotoBoy +"', 'M')";
        tx.executeSql(sql);
        
//CREO TABLA RECETAS
        sql = 'CREATE TABLE Recetas (idReceta INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(1), name VARCHAR(50), imagenPortada VARCHAR(50), cantidad INTEGER)';
        tx.executeSql(sql, null, function () {
            console.log('Crear tabla Recetas OK');
            //webSqlAdapter.crearDatosPrimerEjecucion(tx);
        },
        function (tx, error) {
            //Si la tabla ya existe tira error, y no continua la ejecucion (los usuarios tambien ya existen)
            console.log('ERROR tabla Recetas : ' + error.message);
            return true;
        });
        
        //INSERT VALORES DE PRUEBA, DESPUES BORRAR
        sql = "INSERT OR REPLACE INTO Recetas (tipo, name, imagenPortada, cantidad) VALUES ('H', 'Pizzeta', '" + images.fotoPortadaPizza + "', 12)";
//        sql = "INSERT OR REPLACE INTO Recetas (tipo, name, imagenPortada, cantidad) VALUES ('H', 'Pizza', '" + images.fotoPortadaPizza + "', 10)";
        tx.executeSql(sql);  
        
        sql = "INSERT OR REPLACE INTO Recetas (tipo, name, imagenPortada, cantidad) VALUES ('I', 'Pizzeta', '" + images.fotoPortadaPizzaIndustrial + "', 160)";
        tx.executeSql(sql);  
        
        sql = "INSERT OR REPLACE INTO Recetas (tipo, name, imagenPortada, cantidad) VALUES ('I', 'Budin de Vainilla', '" + images.fotoPortadaBudin + "', 60)";
        tx.executeSql(sql);  
        
        sql = "INSERT OR REPLACE INTO Recetas (tipo, name, imagenPortada, cantidad) VALUES ('H', 'Budin de Vainilla', '" + images.fotoPortadaBudin + "', 4)";
        tx.executeSql(sql);  
        //

        sql = 'CREATE TABLE PasosReceta (idReceta INTEGER, idPaso INTEGER, tipo VARCHAR(1), titulo VARCHAR(50), descripcion VARCHAR(50), cantidad integer, unidadMedida VARCHAR(50), imagen VARCHAR(50), audio VARCHAR(50), video VARCHAR(50), ayuda VARCHAR(50))';
        tx.executeSql(sql, null,
        function () {
            console.log('Crear tabla Pasos Recetas OK');
            //webSqlAdapter.crearDatosPrimerEjecucion(tx);
        },
        function (tx, error) {
            //Si la tabla ya existe tira error, y no continua la ejecucion (los usuarios tambien ya existen)
            console.log('ERROR tabla Pasos recetas : ' + error.message);
            return true;
        });
        
        /*INSERT VALORES DE PRUEBA, DESPUES BORRAR
       
        sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
            "VALUES ('1', '1', 'H', 'Primer paso', 'Aca hay que sumar harina para hacer consistente la masa', '100', 'GR', '" + noPhotoBoy + "', '', '', '')";
        tx.executeSql(sql);
        
        sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
            "VALUES ('1', '2', 'H', 'Agrego sal', 'Aca hay que agregar sal a gusto, que no quede salado', '2', 'Cucharadas', '" + noPhotoBoy + "', '', '', '')";
        tx.executeSql(sql);
        */
        //
        
        //INICIO PASOS RECETA PIZZETAS HOGAREÑA       
        
        sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '1', 'H', 'HIGIENE Y SEGURIDAD', 'RESPETAR NORMAS DE HIGIENE Y SEGURIDAD. MANTENGA SU HIGIENE Y LA DE LAS HERRAMIENTAS, CUBRA SU CABELLO, NO UTILICE ANILLOS NI ESMALTE DE UÑAS. RECUERDE QUE ESTÁ TRABAJANDO CON ELEMENTOS CORTANTES O DE ALTA TEMPERATURA QUE PUEDEN PROVOCAR DAÑOS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Normas_de_Seguridad.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '2', 'H', 'Prender el Horno', 'PRENDER EL HORNO A TEMPERATURA DE 180°C', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso1.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '3', 'H', 'SEGURIDAD', 'VERIFIQUE QUE EL ENCENDIDO DEL HORNO SEA CORRECTO Y NO SE PRODUZCAN PÉRDIDAS DE GAS.', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso2.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '4', 'H', 'PREPARAR LOS MOLDES PARA PIZZETAS', 'COLOCAR MOLDES DE PIZZETAS UNO AL LADO DEL OTRO EN ASADERAS APTAS PARA HORNO. PINTAR LOS MOLDES CON ACEITE. RESERVAR.', '12', 'MOLDE', '" + images.fotoMoldes + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso3.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '5', 'H', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA MASA.', '0', '', '" + images.fotoPizza + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso4.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '6', 'H', 'INGREDIENTES', 'HARINA', '500', 'Gr', '" + images.fotoHarina + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso5(Harina).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '7', 'H', 'INGREDIENTES', 'SAL', '10', 'Gr', '" + images.fotoSal + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso6(Sal).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '8', 'H', 'INGREDIENTES', 'AZUCAR', '5', 'Gr', '" + images.fotoAzucar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso7(Azucar).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '9', 'H', 'INGREDIENTES', 'LEVADURA', '25', 'Gr', '" + images.fotoLevadura + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso8(Levadura).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '10', 'H', 'INGREDIENTES', 'ACEITE', '20', 'Cm3', '" + images.fotoAceite + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso9(Aceite).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '11', 'H', 'INGREDIENTES', 'AGUA', '250', 'Cm3', '" + images.fotoVasoAgua + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso10(Agua).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '12', 'H', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA SALSA', '0', '', '" + images.fotoPortadaSalsa + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso11.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '13', 'H', 'INGREDIENTES', 'SALSA DE TOMATE', '250', 'Gr', '" + images.fotoSalsa + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso12.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '14', 'H', 'RECOLECTAR', 'SAL ', '10', 'Gr', '" + images.fotoCucharaSal + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso6(Sal).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '15', 'H', 'RECOLECTAR', 'AZUCAR', '5', 'Gr', '" + images.fotoCucharaAzucar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso7(Azucar).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '16', 'H', 'RECOLECTAR', 'OREGANO', '5', 'Gr', '" + images.fotoCucharaOregano + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso15(oregano).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '17', 'H', 'MEDICIONES', 'PESAR LOS INGREDIENTES HASTA CONSEGUIR LAS MEDIDAS NECESARIAS. UTILICE JARRAS MEDIDORAS Y BALANZA DE COCINA.', '0', '', '" + images.fotoBalanza + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso16.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '18', 'H', 'EMPEZANDO CON LA MASA', 'COLOCAR LA HARINA SOBRE LA MESADA Y REALIZAR UNA CORONA.', '0', '', '" + images.fotoCoronaHarina + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso17.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '19', 'H', 'MEZCLAR', 'MEZCLAR LA SAL, AZÚCAR, LEVADURA, AGUA Y ACEITE. COLOCAR ESTOS INGREDIENTES EN EL CENTRO DE LA CORONA DE HARINA.', '0', '', '" + images.fotoMezclaElementos + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso18.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '20', 'H', 'UNIR INGREDIENTES', 'UNIR TODOS LOS INGREDIENTES CON LAS MANOS PARA FORMAR UNA MASA HOMOGÉNEA.', '0', '', '" + images.fotoUnirMasa + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso19.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '21', 'H', 'AMASAR', 'AMASAR DURANTE 10 MINUTOS.', '0', '', '" + images.fotoAmasarHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso20.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '22', 'H', 'CORTAR', 'CORTAR PIEZAS DE 60 Gr CADA UNO.', '12', 'PIEZA', '" + images.fotoCorte + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso21.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '23', 'H', 'BOLLAR', 'BOLLAR Y DEJAR DESCASAR A TEMPERATURA AMBIENTE CADA UNO.', '0', '', '" + images.fotoBollo + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso22.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '24', 'H', 'APLASTAR', 'ESTIRAR LA MASA DENTRO DEL MOLDE CON LA YEMA DE LOS DEDOS HASTA QUE ALCANCE LOS BORDES.', '0', '', '" + images.fotoEnMolde + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso23.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '25', 'H', 'EMPEZANDO CON LA SALSA', 'COLOCAR LOS INGREDIENTES DE LA SALSA DE TOMATE EN UNA OLLA .', '0', '', '" + images.ingredienteSalsa + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso24.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '26', 'H', 'SEGURIDAD', 'RECUERDE TENER PRECAUCIÓN AL ENCENDER EL FUEGO DE LA HORNALLA EVITANDO PÉRDIDAS DE GAS O QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso25.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '27', 'H', 'SEGURIDAD', 'CADA VEZ QUE MANIPULE LA OLLA UTILICE PROTECCIÓN CON MANOPLAS PARA EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso26.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '28', 'H', 'CALENTAR LA SALSA', 'LLEVAR LA OLLA AL FUEGO EN LA HORNALLA. MEZCLAR CON CUCHARA DE MADERA.', '0', '', '" + images.ingredienteSalsa + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso27.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '29', 'H', 'COCINAR', 'COCINAR LA SALSA HASTA ALCANZAR EL HERVOR.', '0', '', '" + images.fotoHornallaHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso28.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '30', 'H', 'APAGAR EL FUEGO', 'APAGAR EL FUEGO DE LA HORNALLA.', '0', '', '" + images.fotoHornallaHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso29.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '31', 'H', 'ENFRIAR', 'DEJAR ENFRIAR LA SALSA.', '0', '', '" + images.fotoSalsaFuego + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso30.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '32', 'H', 'TERMINACIÓN', 'COLOCAR LA SALSA DE TOMATE SOBRE LA MASA CRUDA DE LAS PIZZETAS.', '0', '', '" + images.fotoPizzetaConSalsa + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso31.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '33', 'H', 'TERMINACIÓN', 'DEJAR FERMENTAR DURANTE 30 MINUTOS.', '0', '', '" + images.fotoFermentar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso32.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '34', 'H', 'SEGURIDAD', 'RECUERDE QUE EL HORNO ELEVA LA TEMPERATURA. EVITE EL CONTACTO ENTRE LA SUPERFICIE INTERNA DEL HORNO Y SU PIEL O ELEMENTOS QUE PUEDAN ENCENDERSE.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso33.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '35', 'H', 'TERMINACIÓN', 'COLOCAR LAS PIZZETAS EN EL HORNO.', '0', '', '" + images.fotoPizzetasHorno + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso34.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '36', 'H', 'COCINAR', 'COCINAR DURANTE 20 MINUTOS CON EL HORNO A 180 ºC.', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso35.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '37', 'H', 'SEGURIDAD', 'RECUERDE UTILIZAR LAS MANOPLAS PARA QUITAR LAS ASADERAS DEL HORNO Y ASÍ EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso36.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '38', 'H', 'RETIRAR PIZZETAS', 'SACAR LAS PIZZETAS DEL HORNO.', '0', '', '" + images.fotoPizzetasHorno + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso37.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '39', 'H', 'SEGURIDAD', 'APAGAR EL HORNO.', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso38.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('1', '40', 'H', 'DEJAR ENFRIAR', 'DEJAR ENFRIAR ANTES DE EMPAQUETAR.', '0', '', '" + images.fotoPizzetasHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Pizzetas_Paso39.mp3', '', '')";
tx.executeSql(sql);

        
        //FIN PASOS RECETA PIZZETAS (HOGAR)

        //INICIO PASOS RECETA PIZZETAS (INDUSTRIAL)
        
        sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '1', 'I', 'HIGIENE Y SEGURIDAD', 'RESPETAR NORMAS DE HIGIENE Y SEGURIDAD. MANTENGA SU HIGIENE Y LA DE LAS HERRAMIENTAS, CUBRA SU CABELLO, NO UTILICE ANILLOS NI ESMALTE DE UÑAS. RECUERDE QUE ESTÁ TRABAJANDO CON ELEMENTOS CORTANTES O DE ALTA TEMPERATURA QUE PUEDEN PROVOCAR DAÑOS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Normas_de_Seguridad.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '2', 'I', 'PRENDER EL HORNO', 'PRENDER EL HORNO A TEMPERATURA DE 180°C', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso1.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '3', 'I', 'SEGURIDAD', 'VERIFIQUE QUE EL ENCENDIDO DEL HORNO SEA CORRECTO Y NO SE PRODUZCAN PÉRDIDAS DE GAS.', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso2.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '4', 'I', 'PREPARAR LOS MOLDES PARA PIZZETAS', 'COLOCAR MOLDES DE PIZZETAS UNO AL LADO DEL OTRO EN ASADERAS APTAS PARA HORNO. PINTAR LOS MOLDES CON ACEITE. RESERVAR.', '160', 'MOLDE', '" + images.fotoMoldes + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso3.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '5', 'I', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA MASA.', '0', '', '" + images.fotoPizza + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso4.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '6', 'I', 'INGREDIENTES', 'HARINA', '10', 'Kg', '" + images.fotoHarina + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso5(Harina).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '7', 'I', 'INGREDIENTES', 'SAL', '200', 'Gr', '" + images.fotoSal + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso6(Sal).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '8', 'I', 'INGREDIENTES', 'AZUCAR', '100', 'Gr', '" + images.fotoAzucar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso7(Azucar).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '9', 'I', 'INGREDIENTES', 'LEVADURA', ' 500', 'Gr', '" + images.fotoLevadura + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso8(Levadura).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '10', 'I', 'INGREDIENTES', 'ACEITE', ' 200', 'Cm3', '" + images.fotoAceite + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso9(Aceite).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '11', 'I', 'INGREDIENTES', 'AGUA', ' 5', 'LITRO', '" + images.fotoBidonAgua + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso10(Agua).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '12', 'I', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA SALSA', '0', '', '" + images.fotoPortadaSalsa + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso11.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '13', 'I', 'INGREDIENTES', 'SALSA DE TOMATE', '2', 'LITRO', '" + images.fotoSalsa + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso12.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '14', 'I', 'INGREDIENTES', 'SAL ', '2', 'CUCHARADA SOPERA', '" + images.fotoCucharaSal + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso6(Sal).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '15', 'I', 'INGREDIENTES', 'AZUCAR', '1', 'CUCHARADA SOPERA', '" + images.fotoCucharaAzucar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso7(Azucar).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '16', 'I', 'RECOLECTAR.', 'OREGANO', '3', 'CUCHARADA SOPERA', '" + images.fotoCucharaOregano + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso15(oregano).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '17', 'I', 'MEDICIONES.', 'PESAR LOS INGREDIENTES HASTA CONSEGUIR LAS MEDIDAS NECESARIAS. UTILICE JARRAS MEDIDORAS Y BALANZA DE COCINA.', '0', '', '" + images.fotoBalanza + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso16.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '18', 'I', 'EMPEZANDO CON LA MASA.', 'COLOCAR TODOS LOS INGREDIENTES PARA LA MASA DENTRO DE LA BATIDORA INDUSTRIAL.', '0', '', '" + images.fotoMezclaMasaPizzaIndustrial + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso17.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '19', 'I', 'UNIR', 'UNIR LOS INGREDIENTES EN LA MÁQUINA DURANTE 20 MINUTOS HASTA LOGRAR UNA MASA HOMOGÉNEA.', '0', '', '" + images.fotoMezclaMasaPizzaIndustrialUnion + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso18.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '20', 'I', 'CORTE', 'COLOCAR LA MASA SOBRE LA  MESADA Y CORTAR EN BASTONES.', '0', '', '" + images.fotoCorte + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso19.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '21', 'I', 'SOBAR LA MASA', 'PASAR POR LA SOBADORA CADA UNO DE LOS BASTONES DE MASA UNAS 12 VECES HASTA LOGRAR UNA CONSISTENCIA ELÁSTICA. ', '0', '', '" + images.fotoMasaPizzaIndustrialSobadora + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso20.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '22', 'I', 'SEGURIDAD', 'RECUERDE QUE PARA EL USO DE LA SOBADORA DEBE TENER CUIDADO CON LOS RODILLOS. NUNCA DEBE COLOCAR LA MANO ENTRE LOS RODILLOS. SIEMPRE SE EMPUJA LA MASA DESDE EL EXTREMO MÁS LEJANO DE LOS RODILLOS.', '0', '', '" + images.fotoMasaPizzaIndustrialSobadoraSeguridad + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso21.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '23', 'I', 'COLOCAR', 'COLOCAR LA MASA ESTIRADA SOBRE LA MESADA.', '0', '', '" + images.fotoPizzaIndustrialEstiraMasa + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso22.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '24', 'I', 'CORTE CON MOLDES', 'TOMAR MOLDES REDONDOS Nº 14 Y CORTAR LA MASA EN ESA MEDIDA.', '0', '', '" + images.fotoPizzaIndustrialEnMolde + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso23.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '25', 'I', 'REUTILIZAR MASA SOBRANTE', 'REUTILIZAR LOS SOBRANTES DE MASA, VOLVER A UNIR Y SOBAR.', '0', '', '" + images.fotoSobranteMasaInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso24.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '26', 'I', 'COLOCAR EN MOLDES', 'COLOCAR LAS PIZZETAS CORTADAS DENTRO DE LOS MOLDES PREVIAMENTE ACEITADOS.', '0', '', '" + images.fotoMoldes + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso25.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '27', 'I', 'ESTIRAR MASA', 'ESTIRAR LA MASA DENTRO DEL MOLDE CON LA YEMA DE LOS DEDOS HASTA QUE ALCANCE LOS BORDES.', '0', '', '" + images.fotoEnMolde + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso26.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '28', 'I', 'EMPEZANDO CON LA SALSA', 'COLOCAR LOS INGREDIENTES DE LA SALSA EN UNA OLLA.', '0', '', '" + images.fotoPizzaIndustrialIngredienteOlla + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso27.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '29', 'I', 'CALENTAR LA SALSA', 'LLEVAR LA OLLA AL FUEGO EN LA HORNALLA. MEZCLAR CON CUCHARA DE MADERA.', '0', '', '" + images.ingredienteSalsa + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso28.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '30', 'I', 'SEGURIDAD', 'RECUERDE TENER PRECAUCIÓN AL ENCENDER EL FUEGO DE LA HORNALLA EVITANDO PÉRDIDAS DE GAS O QUEMADURAS. CADA VEZ QUE MANIPULE LA OLLA UTILICE PROTECCIÓN CON MANOPLAS PARA EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso29.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '31', 'I', 'COCINAR', 'COCINAR LA SALSA HASTA ALCANZAR EL HERVOR.', '0', '', '" + images.fotoHornallaHogar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso30.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '32', 'I', 'APAGAR EL FUEGO', 'APAGAR EL FUEGO DE LA HORNALLA.', '0', '', '" + images.fotoHornallaHogar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso31.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '33', 'I', 'ENFRIAR', 'DEJAR ENFRIAR LA SALSA.', '0', '', '" + images.fotoSalsaFuego + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso32.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '34', 'I', 'TERMINACIÓN', 'COLOCAR LA SALSA DE TOMATE SOBRE LA MASA CRUDA DE LAS PIZZETAS.', '0', '', '" + images.fotoPizzetaConSalsa + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso33.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '35', 'I', 'TERMINACIÓN', 'DEJAR FERMENTAR DURANTE 30 MINUTOS.', '0', '', '" + images.fotoFermentar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso34.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '36', 'I', 'SEGURIDAD', 'RECUERDE QUE EL HORNO ELEVA LA TEMPERATURA. EVITE EL CONTACTO ENTRE LA SUPERFICIE INTERNA DEL HORNO Y SU PIEL O ELEMENTOS QUE PUEDAN ENCENDERSE.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso35.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '37', 'I', 'TERMINACIÓN', 'COLOCAR LAS PIZZETAS EN EL HORNO.', '0', '', '" + images.fotoPizzaIndustrialHorno + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso36.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '38', 'I', 'COCINAR', 'COCINAR DURANTE 20 MINUTOS CON EL HORNO A 180 ºC.', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso37.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '39', 'I', 'SEGURIDAD', 'RECUERDE UTILIZAR LAS MANOPLAS PARA QUITAR LAS ASADERAS DEL HORNO Y ASÍ EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso38.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '40', 'I', 'RETIRAR PIZZETAS', 'SACAR LAS PIZZETAS DEL HORNO.', '0', '', '" + images.fotoPizzaIndustrialHornoRetirar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso39.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '41', 'I', 'SEGURIDAD', 'APAGAR EL HORNO.', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso40.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '42', 'I', 'DEJAR ENFRIAR', 'DEJAR ENFRIAR LO QUE SACAMOS DEL HORNO.', '0', '', '" + images.fotoPizzaIndustrialDesmoldar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso41.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('2', '43', 'I', 'TERMINACIÓN', 'DESMOLDAR Y EMPAQUETAR CUANDO SE ENCUENTREN FRÍAS.', '0', '', '" + images.fotoPizzaIndustrialDesmoldar + "', '" + cabeceraAudio + "sound/Prod_Ind_Pizzetas_Paso42.mp3', '', '')";
tx.executeSql(sql);
        
        //FIN PASOS RECETA PIZZETAS (INDUSTRIAL)
        
		//INICIO PASOS RECETA BUDIN (INDUSTRIAL)====================================
		sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '1', 'I', 'HIGIENE Y SEGURIDAD', 'RESPETAR NORMAS DE HIGIENE Y SEGURIDAD. MANTENGA SU HIGIENE Y LA DE LAS HERRAMIENTAS, CUBRA SU CABELLO, NO UTILICE ANILLOS NI ESMALTE DE UÑAS. RECUERDE QUE ESTÁ TRABAJANDO CON ELEMENTOS CORTANTES O DE ALTA TEMPERATURA QUE PUEDEN PROVOCAR DAÑOS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Normas_de_Seguridad.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '2', 'I', 'PRENDER EL HORNO', 'PRENDER EL HORNO A TEMPERATURA DE 180°C', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso1.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '3', 'I', 'SEGURIDAD', 'VERIFIQUE QUE EL ENCENDIDO DEL HORNO SEA CORRECTO Y NO SE PRODUZCAN PÉRDIDAS DE GAS.', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso2.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '4', 'H', 'PREPARAR LOS MOLDES PARA BUDINES', 'ENMANTECAR Y ENHARINAR LOS MOLDES SI SON METÁLICOS.', '60', 'MOLDE', '" + images.fotoMoldesBudines + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso3.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '5', 'I', 'PREPARAR LOS MOLDES PARA BUDINES', 'COLOCAR LOS MOLDES DE PAPEL PARA BUDINES UNO AL LADO DEL OTRO EN ASADERAS APTAS PARA HORNO', '60', 'MOLDE', '" + images.fotoMoldeBudinAsadera + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso3.mp3', '', '')";
tx.executeSql(sql);        

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '6', 'I', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA MASA.', '0', '', '" + images.fotoPortadaMasaBudin + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso4.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '7', 'I', 'INGREDIENTES', 'PREMEZCLA', '10', 'Kg', '" + images.fotoEnvasePreMezcla + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso5(Premezcla).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '8', 'I', 'INGREDIENTES', 'HUEVOS', '70', 'UNIDAD', '" + images.fotoHuevosUnidad + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso6(Huevos).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '9', 'I', 'INGREDIENTES', 'ACEITE', '2.2', 'LITRO', '" + images.fotoAceite + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso7(Aceite).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '10', 'I', 'INGREDIENTES', 'AGUA', ' 2.5', 'LITRO', '" + images.fotoVasoAgua + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso8(Agua).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '11', 'I', 'INGREDIENTES', 'ESENCIA DE VAINILLA', ' 200', 'Cm3', '" + images.fotoEsenciaVainilla + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso9.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '12', 'I', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA EL GLASE', '0', '', '" + images.fotoTapaGlase + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso10.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '13', 'I', 'INGREDIENTES', 'AZÚCAR IMPALPABLE', '2.5', 'Kg', '" + images.fotoAzucar + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso11.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '14', 'I', 'INGREDIENTES', 'CLARA DE HUEVO ', '10', 'UNIDAD', '" + images.fotoClaraHuevo + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso12.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '15', 'I', 'INGREDIENTES', 'JUGO DE LIMÓN', '5', 'UNIDAD', '" + images.fotoJugoLimon + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso13.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '16', 'I', 'MEDICIONES', 'PESAR LOS INGREDIENTES HASTA CONSEGUIR LAS MEDIDAS NECESARIAS. UTILICE JARRAS MEDIDORAS Y BALANZA DE COCINA.', '0', '', '" + images.fotoBalanza + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso14.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '17', 'I', 'EMPEZANDO CON LA MASA', 'COLOCAR TODOS LOS INGREDIENTES HÚMEDOS (AGUA, ACEITE Y HUEVOS) DENTRO DE LA AMASADORA', '0', '', '"+ images.fotoIngredientesMasaBudin +"', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso15.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '18', 'I', 'ATENCIÓN', 'RECUERDE QUE CUANDO SE COLOCAN LOS INGREDIENTES DENTRO DE LA MÁQUINA HAY QUE AYUDARLA CON UN CORNET PARA QUE LA MEZCLA SE UNA.', '0', '', '" + images.fotoBatirIngredientesHumedos + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso16.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '19', 'I', 'ATENCIÓN', 'TENGA CUIDADO CON LOS BRAZOS QUE AMASAN, SIEMPRE HAY QUE UTILIZAR EL CORNET PONIÉNDOSE ENFRENTE DE LOS MISMOS Y NUCA AL COSTADO PARA EVITAR QUE SU MANO SEA ATRAPADA POR LA MÁQUINA.', '0', '', '" + images.fotoIncorporoPreMezcla + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso16.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '20', 'I', 'MEZCLAR', 'UNIR LOS INGREDIENTES EN LA MÁQUINA HASTA LOGRAR UNA MASA HOMOGÉNEA, SIN GRUMOS.', '0', '', '" + images.fotoBudinMezclaHomogenea + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso17.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '21', 'I', 'COLOCAR EN MOLDES', 'COLOCAR LA PREPARACIÓN DE LA MASA DENTRO DE LOS MOLDES PARA BUDINES.', '0', '', '" + images.fotoMoldeBudinAsadera + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso18.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '22', 'I', 'LLEVAR A HORNO', 'LLEVAR LA ASADERA CON LOS BUDINES AL HORNO.', '0', '', '" + images.fotoBudinHorno + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso19.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '23', 'I', 'SEGURIDAD', 'RECUERDE QUE EL HORNO ELEVA LA TEMPERATURA. EVITE EL CONTACTO ENTRE LA SUPERFICIE INTERNA DEL HORNO Y SU PIEL O ELEMENTOS QUE PUEDAN ENCENDERSE.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso20.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '24', 'I', 'COCINAR', 'COCINAR EN EL HORNO DURANTE 40 MINUTOS A 180ºC.', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso21.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '25', 'I', 'SACAR DEL HORNO', 'SACAR LOS BUDINES DEL HORNO', '0', '', '" + images.fotoBudinHorno + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso22.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '26', 'I', 'SEGURIDAD', 'RECUERDE UTILIZAR LAS MANOPLAS PARA QUITAR LAS ASADERAS DEL HORNO Y ASÍ EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso23.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '27', 'I', 'APAGAR EL HORNO', 'APAGAR EL HORNO.', '0', '', '" + images.fotoHornoInd + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso24.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '28', 'I', 'DEJAR ENFRIAR', 'DEJAR ENFRIAR LOS BUDINES.', '0', '', '" + images.fotoMoldeBudinAsadera + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso25.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '29', 'I', 'PREPARACIÓN DEL GLASÉ', 'COLOCAR EN UN BOL LA CLARA DE HUEVO. VERIFICAR QUE NO QUEDEN RESTOS DE YEMA.', '0', '', '" + images.fotoHuevosEnBol + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso26.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '30', 'I', 'PREPARACIÓN DEL GLASÉ', 'AGREGAR EL JUGO DE LIMÓN Y EL AZÚCAR IMPALPABLE.', '0', '', '" + images.fotoAgregarLimonHogar + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso27.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '31', 'I', 'PREPARACIÓN DEL GLASÉ', 'MEZCLAR CON BATIDOR DE ALAMBRE HASTA FORMAR UNA CREMA BLANCA.', '0', '', '" + images.fotoMezclaGlaseAlambre + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso28.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '32', 'I', 'TERMINACIÓN', 'PINTAR LOS BUDINES CON EL GLASÉ CUANDO ESTÉN FRÍOS UTILIZANDO PINCEL O CUCHARA.', '0', '', '" + images.fotoBudinPintarGlase + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso29.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('3', '33', 'I', 'TERMINACIÓN', 'COLOCAR EN HELADERA Y ESPERAR A QUE ESTÉN COMPLETAMENTE FRÍOS PARA EMPAQUETAR.', '0', '', '" + images.fotoBudinTerminado + "', '" + cabeceraAudio + "sound/Prod_Ind_Budin_Paso30.mp3', '', '')";
tx.executeSql(sql);
        
		//FIN PASOS RECETA BUDIN (INDUSTRIAL)========================================
		
        //INICIO PASOS RECETA BUDIN (HOGAR)

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '1', 'H', 'HIGIENE Y SEGURIDAD', 'RESPETAR NORMAS DE HIGIENE Y SEGURIDAD. MANTENGA SU HIGIENE Y LA DE LAS HERRAMIENTAS, CUBRA SU CABELLO, NO UTILICE ANILLOS NI ESMALTE DE UÑAS. RECUERDE QUE ESTÁ TRABAJANDO CON ELEMENTOS CORTANTES O DE ALTA TEMPERATURA QUE PUEDEN PROVOCAR DAÑOS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Normas_de_Seguridad.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '2', 'H', 'PRENDER EL HORNO', 'PRENDER EL HORNO A TEMPERATURA DE 180°C', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso1.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '3', 'H', 'SEGURIDAD', 'VERIFIQUE QUE EL ENCENDIDO DEL HORNO SEA CORRECTO Y NO SE PRODUZCAN PÉRDIDAS DE GAS.', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso2.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '4', 'H', 'PREPARAR LOS MOLDES PARA BUDINES', 'ENMANTECAR Y ENHARINAR LOS MOLDES SI SON METÁLICOS.', '4', 'MOLDE', '" + images.fotoMoldesBudines + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso3.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '5', 'H', 'PREPARAR LOS MOLDES PARA BUDINES', 'COLOCAR LOS MOLDES DENTRO DE UNA ASADERA APTA PARA HORNO Y RESERVAR.', '4', 'MOLDE', '" + images.fotoMoldeBudinAsadera + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso4.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '6', 'H', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA LA MASA.', '0', '', '" + images.fotoPortadaMasaBudin + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso5.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '7', 'H', 'INGREDIENTES', 'PREMEZCLA', '1', 'Kg', '" + images.fotoEnvasePreMezcla + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso6(Premezcla).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '8', 'H', 'INGREDIENTES', 'HUEVOS', '7', 'UNIDAD', '" + images.fotoHuevosUnidad + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso7(Huevos).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '9', 'H', 'INGREDIENTES', 'ACEITE', '220', 'Cm3', '" + images.fotoAceite + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso8(Aceite).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '10', 'H', 'INGREDIENTES', 'AGUA', ' 250', 'Cm3', '" + images.fotoVasoAgua + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso9(Agua).mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '11', 'H', 'INGREDIENTES', 'ESENCIA DE VAINILLA', '20', 'Cm3', '" + images.fotoEsenciaVainilla + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso10.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '12', 'H', 'RECOLECTAR', 'RECOLECTAR TODOS LOS INGREDIENTES NECESARIOS PARA EL GLASE', '0', '', '" + images.fotoTapaGlase + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso11.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '13', 'H', 'INGREDIENTES', 'AZÚCAR IMPALPABLE', '250', 'Gr', '" + images.fotoAzucar + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso12.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '14', 'H', 'INGREDIENTES', 'CLARA DE HUEVO ', '1', 'UNIDAD', '" + images.fotoClaraHuevo + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso13.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '15', 'H', 'INGREDIENTES', 'JUGO DE LIMÓN', '0.5', 'LIMON', '" + images.fotoJugoLimon + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso14.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '16', 'H', 'MEDICIONES', 'PESAR LOS INGREDIENTES HASTA CONSEGUIR LAS MEDIDAS NECESARIAS. UTILICE JARRAS MEDIDORAS Y BALANZA DE COCINA.', '0', '', '" + images.fotoBalanza + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso15.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '17', 'H', 'EMPEZANDO CON LA MASA', 'COLOCAR TODOS LOS INGREDIENTES HÚMEDOS (AGUA, ACEITE Y HUEVOS) DENTRO DE UN BOL.', '0', '', '"+ images.fotoIngredientesMasaBudin +"', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso16.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '18', 'H', 'BATIR', 'BATIR LOS INGREDIENTES HÚMEDOS.', '0', '', '" + images.fotoBatirIngredientesHumedos + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso17.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '19', 'H', 'INCORPORAR', 'INCORPORAR LA PREMEZCLA.', '0', '', '" + images.fotoIncorporoPreMezcla + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso18.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '20', 'H', 'MEZCLAR', 'MEZCLAR LOS INGREDIENTES CON BATIDOR O CUCHARA HASTA LOGRAR UNA MASA HOMOGÉNEA, SIN GRUMOS.', '0', '', '" + images.fotoBudinMezclaHomogenea + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso19.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '21', 'H', 'COLOCAR EN MOLDES', 'COLOCAR LA PREPARACIÓN DE LA MASA DENTRO DE LOS MOLDES PARA BUDINES .', '0', '', '" + images.fotoMoldeBudinAsadera + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso20.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '22', 'H', 'LLEVAR A HORNO', 'LLEVAR LA ASADERA CON LOS BUDINES AL HORNO.', '0', '', '" + images.fotoBudinHorno + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso21.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '23', 'H', 'SEGURIDAD', 'RECUERDE QUE EL HORNO ELEVA LA TEMPERATURA. EVITE EL CONTACTO ENTRE LA SUPERFICIE INTERNA DEL HORNO Y SU PIEL O ELEMENTOS QUE PUEDAN ENCENDERSE.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso22.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '24', 'H', 'COCINAR', 'COCINAR EN EL HORNO DURANTE 40 MINUTOS A 180ºC.', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso23.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '25', 'H', 'SACAR DEL HORNO', 'SACAR LOS BUDINES DEL HORNO', '0', '', '" + images.fotoBudinHorno + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso24.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '26', 'H', 'SEGURIDAD', 'RECUERDE UTILIZAR LAS MANOPLAS PARA QUITAR LAS ASADERAS DEL HORNO Y ASÍ EVITAR QUEMADURAS.', '0', '', '" + images.fotoGuantes + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso25.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '27', 'H', 'APAGAR EL HORNO', 'APAGAR EL HORNO.', '0', '', '" + images.fotoHornoHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso26.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '28', 'H', 'DEJAR ENFRIAR', 'DEJAR ENFRIAR LOS BUDINES.', '0', '', '" + images.fotoMoldeBudinAsadera + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso27.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '29', 'H', 'PREPARACIÓN DEL GLASÉ', 'COLOCAR EN UN BOL LA CLARA DE HUEVO. VERIFICAR QUE NO QUEDEN RESTOS DE YEMA.', '0', '', '" + images.fotoHuevosEnBol + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso28.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '30', 'H', 'PREPARACIÓN DEL GLASÉ', 'AGREGAR EL JUGO DE LIMÓN Y EL AZÚCAR IMPALPABLE.', '0', '', '" + images.fotoAgregarLimonHogar + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso29.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '31', 'H', 'PREPARACIÓN DEL GLASÉ', 'MEZCLAR CON BATIDOR DE ALAMBRE HASTA FORMAR UNA CREMA BLANCA.', '0', '', '" + images.fotoMezclaGlaseAlambre + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso30.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '32', 'H', 'TERMINACIÓN', 'PINTAR LOS BUDINES CON EL GLASÉ CUANDO ESTÉN FRÍOS UTILIZANDO PINCEL O CUCHARA.', '0', '', '" + images.fotoBudinPintarGlase + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso31.mp3', '', '')";
tx.executeSql(sql);

sql = "INSERT INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
	"VALUES ('4', '33', 'H', 'TERMINACIÓN', 'COLOCAR EN HELADERA Y ESPERAR A QUE ESTÉN COMPLETAMENTE FRÍOS PARA EMPAQUETAR.', '0', '', '" + images.fotoBudinTerminado + "', '" + cabeceraAudio + "sound/Prod_Hog_Budin_Paso32.mp3', '', '')";
tx.executeSql(sql);
        
        console.log('FIN INSERT RECETA 4');

        //FIN PASOS RECETA BUDIN (HOGAR)
        
       sql = 'CREATE TABLE Estadisticas (idEstadistica INTEGER PRIMARY KEY AUTOINCREMENT, idReceta INTEGER, idPaso INTEGER, tiempo VARCHAR(13), fechaReceta VARCHAR(19), inicio DATETIME, fin DATETIME) ';
        tx.executeSql(sql, null,
        function () {
            console.log('Crear tabla Estadisticas OK');
            //webSqlAdapter.crearDatosPrimerEjecucion(tx);
        },
        function (tx, error) {
            //Si la tabla ya existe tira error, y no continua la ejecucion (los usuarios tambien ya existen)
            console.log('ERROR tabla Estadisticas: ' + error.message);
            return true;
        });  
        //INSERT VALORES DE PRUEBA, DESPUES BORRAR
        
        // sql = "INSERT OR REPLACE INTO Estadisticas (idReceta, inicio, fin) " +
            // "VALUES ('1', '10:00', '15:00')";
        // tx.executeSql(sql);
        
        // sql = "INSERT OR REPLACE INTO Estadisticas (idReceta, inicio, fin) "+
            // "VALUES ('3', '15:00', '16:00')";
        // tx.executeSql(sql);
        //
        sql = 'CREATE TABLE Unidades (idUnidad INTEGER PRIMARY KEY AUTOINCREMENT, unidadMedida VARCHAR(50), pluralMedida VARCHAR(50), limite INTEGER, unidadMedidaAlt VARCHAR(50), pluralMedidaAlt VARCHAR(50)) ';
        tx.executeSql(sql, null,
        function () {
            console.log('Crear tabla Unidades OK');
            //webSqlAdapter.crearDatosPrimerEjecucion(tx);
        },
        function (tx, error) {
            //Si la tabla ya existe tira error, y no continua la ejecucion (los usuarios tambien ya existen)
            console.log('ERROR tabla Unidades: ' + error.message);
            return true;
        });  
        sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('', '', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('GRAMO', 'GRAMOS', '1000', 'KILO', 'KILOS')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('Cm3', 'Cm3', '1000', 'LITRO', 'LITROS')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('Gr', 'Grs', '1000', 'Kg', 'Kgs')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('Kg', 'Kgs', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('PIEZA', 'PIEZAS', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('MOLDE', 'MOLDES', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('LITRO', 'LITROS', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('KILO', 'KILOS', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('UNIDAD', 'UNIDADES', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('LIMON', 'LIMONES', '0', '', '')";// NO TENDRIA QUE IR!!!!
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('CUCHARADA', 'CUCHARADAS', '0', '', '')";
        tx.executeSql(sql);
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('CUCHARADA SOPERA', 'CUCHARADAS SOPERA', '0', '', '')";
        tx.executeSql(sql);  
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('VASO', 'VASOS', '0', '', '')";
        tx.executeSql(sql);  
		sql = "INSERT INTO Unidades (unidadMedida, pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) " +
            "VALUES ('TAZA', 'TAZAS', '0', '', '')";
        tx.executeSql(sql);         
};//cierre de funcion CREADO DE TABLAS

    webSqlAdapter.borrarTablas = function(tx) {
        //AGREGAR COLUMNAS DE USUARIO
        var sql = 'DROP TABLE IF EXISTS Usuarios';
        tx.executeSql(sql, null,
        function () {
            console.log('Borrar tabla Usuarios OK');
        },
        function (tx, error) {
            console.log('Borrar tabla Usuarios error: ' + error.message);
            /*$scope.$emit('showAlert', 'Crear tabla Usuarios error: ' + error.message);*/
        });
        
        sql = 'DROP TABLE IF EXISTS Recetas';
        tx.executeSql(sql, null,
        function () {
            console.log('Borrar tabla receta OK');
        },
        function (tx, error) {
            console.log('Borrar tabla receta error: ' + error.message);
            /*$scope.$emit('showAlert', 'Crear tabla receta error: ' + error.message);*/
        });
        
        sql = 'DROP TABLE IF EXISTS PasosReceta';
        tx.executeSql(sql, null,
        function () {
            console.log('Borrar tabla PasosReceta OK');
        },
        function (tx, error) {
            console.log('Borrar tabla PasosReceta error: ' + error.message);
            /*$scope.$emit('showAlert', 'Crear tabla PasosReceta error: ' + error.message);*/
        });
        
        sql = 'DROP TABLE IF EXISTS Estadisticas';
        tx.executeSql(sql, null,
        function () {
            console.log('Borrar tabla Estadisticas OK');
        },
        function (tx, error) {
            console.log('Borrar tabla Estadisticas error: ' + error.message);
            /*$scope.$emit('showAlert', 'Crear tabla Estadisticas error: ' + error.message);*/
        });
		
		sql = 'DROP TABLE IF EXISTS Unidades';
        tx.executeSql(sql, null,
        function () {
            console.log('Borrar tabla Unidades OK');
        },
        function (tx, error) {
            console.log('Borrar tabla Unidades error: ' + error.message);
            /*$scope.$emit('showAlert', 'Crear tabla Unidades error: ' + error.message);*/
        });
        
    };
    
    webSqlAdapter.traerUsuarioEjemplo = function() {
        webSqlAdapter.executeQuery('SELECT * FROM Usuarios').then(function(resultados){
            console.log(resultados);
        }, function(){
            console.log('Problemas al ejecutar la consulta');
        });
    };
    
    webSqlAdapter.inicializar = function (borrarDatos, platformAndroid) {
        //var deferred = $.Deferred();
        webSqlAdapter.db = window.openDatabase("Panaderia", "1.0", "Panaderia", 200000);
        //Database name, Version number, Text description, Estimated size of database
        
        Files.getImages().then(function(result) {
        var images = result.data;

        if (webSqlAdapter.db) {
            webSqlAdapter.db.transaction(
                function (tx) {
                    //Creamos tabla ejemplo
                    if (borrarDatos) {
                        webSqlAdapter.borrarTablas(tx);                        
                    }
                        
                    webSqlAdapter.crearTablas(tx, images, platformAndroid);

                    //webSqlAdapter.traerUsuarioEjemplo(tx);
                    //insertarDatos(tx);
                },
                function (error) {
                    console.log('Transacción Error: ' + error.message);
                    //deferred.reject('Transacción Error: ' + error);
                },
                function () {
                    console.log('Transacción con éxito');
                    //deferred.resolve();
                }
            );
        }
            //Fin de sentencia "then" al obtener imagenes del archivo
        }, function(){
            //Si falla la lectura de imagenes
            console.log('Falló imágenes');
        });
        //return deferred.promise();
    };
    
    return webSqlAdapter;
}]) //Fin factory Sstorage

.factory('Friends', function (Storage, $q) {
    'use strict';
    // Might use a resource here that returns a JSON array
    
    var api = {};
    var sql = 'SELECT * FROM Usuarios ';
    
    api.getAll = function(){
        return Storage.executeQuery(sql).then(function(resultados){
            return resultados;
        });
    };
    
    api.get = function(id){
        var q = $q.defer();
            Storage.executeQuery(sql + 'WHERE id=' + id).then(function(resultados){
            q.resolve(resultados);
        }, function(reason) {
            console.log('Falló el get de usuarios' + reason);
            q.reject(reason);
            }

        );
        return q.promise;
        /*return Storage.executeQuery(sql + 'WHERE id=' + id).then(function(resultados){
            return resultados;
        });*/
    };
    
    api.set = function(id, name, gender, password, thumbnail, photo){
        var sqlupdate = 'UPDATE Usuarios SET ' + 
            'name = "'+name+'", '+
            'gender = "' + gender + '"';
            if (password !== '') {
                sqlupdate += ', password = "' + password + '" ';
            }
            if (photo !== '') {
                sqlupdate += ', photo = "' + photo + '" ';
            }
            if (thumbnail !== '') {
                sqlupdate += ', thumbnail = "' + thumbnail + '" ';
            }
            sqlupdate += 'where id = ' + id;
        return Storage.executeQuery(sqlupdate).then(function(resultados){
            return resultados;
        });
    };
    
    
    return api;
    
})

.factory('Camera', ['$q', function($q) {
    'use strict';
    //var options = { quality: 70, destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSource.SAVEDPHOTOALBUM, popoverOptions : popover };

  return {
    getPicture: function(options) {
        var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  };
}])

.factory('Recetas', function (Storage) {
    'use strict';
    var api = {};
    var sql = "SELECT * FROM Recetas ";
    
    api.getAll = function(){
        return Storage.executeQuery(sql).then(function(resultados){
            //console.log("Recetas: " + resultados.size);
            return resultados;
        });
    };
    
    api.get = function(id){
        return Storage.executeQuery(sql + 'WHERE idReceta =' + id).then(function(resultados){
            return resultados;
        });
    };
    
    api.getTituloRecetas = function(tipo){
        return Storage.executeQuery(sql + 'WHERE tipo=' + tipo).then(function(resultados){
            return resultados;
        });
    };
    
    api.getInformacionEdicion = function(){
        var sqlInfo = "SELECT *, CASE WHEN tipo = 'I' THEN 'INDUSTRIAL' ELSE 'HOGAR' END AS DesTipo FROM Recetas "; // CASE WHEN tipo = 'I' THEN 'INDUSTRIAL' ELSE 'HOGAR' END AS DesTipo
        return Storage.executeQuery(sqlInfo).then(function(resultados){
            return resultados;
        });
    };
    
    api.set = function(id, name, tipo, imagenPortada, Cantidad){
        var sqlupdate = "UPDATE Recetas SET " + 
            "name = '" + name + "', " +
            "tipo = '" + tipo + "', " +
            "imagenPortada = '" + imagenPortada + "', " +
            "cantidad = '" + Cantidad + "' " +
            " WHERE idReceta = " + id;
        return Storage.executeQuery(sqlupdate).then(function(resultados){
            return resultados;
        });
    };
    
    api.setNew = function(name, tipo, imagenPortada, cantMinima){
        //var last_insert_id = null;
        var sqlinsert = "INSERT OR REPLACE INTO Recetas (name, tipo, imagenPortada, cantidad) VALUES ('" + name + "', '" + tipo + "', '" + imagenPortada + "', '" + cantMinima + "' )";
        return Storage.executeInsert(sqlinsert).then(function(resultados){
            return resultados;
        });
    };
    
    api.Delete = function(id){
        var sqldelete = "DELETE FROM Recetas WHERE idReceta = " + id;
        return Storage.executeQuery(sqldelete).then(function(resultados){
            return resultados;
        });
    };
    
    return api;
})

.factory('PasosRecetas', function (Storage) {
    'use strict';
    var api = {};
    var sql = "SELECT * FROM PasosReceta ";
    
    api.getAll = function(){
        return Storage.executeQuery(sql).then(function(resultados){
            //console.log("Recetas: " + resultados.size);
            return resultados;
        });
    };
    
    api.get = function(idReceta){
        var sqlGet = "SELECT PasosReceta.*, Recetas.name, Recetas.imagenPortada, Recetas.Cantidad AS CantMinima, Recetas.Tipo AS TipoReceta FROM PasosReceta LEFT JOIN Recetas ON Recetas.IdReceta = PasosReceta.IdReceta ";
        return Storage.executeQuery(sqlGet + 'WHERE PasosReceta.idReceta =' + idReceta + ' ORDER BY idPaso ASC').then(function(resultados){
            return resultados;
        });
    };
    
    api.getSiguientePaso = function(idReceta, idPaso){
        return Storage.executeQuery(sql + 'WHERE idReceta =' + idReceta + ' AND IdPaso = '+ idPaso).then(function(resultados){
            return resultados;
        });
    };
        
    api.set = function(idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda){
        var sqlupdate = "UPDATE PasosReceta SET " + 
            "titulo = '" + titulo + "', "+
            "descripcion = '" + descripcion + "', " +
            "cantidad = '" + cantidad + "', " +
            "unidadMedida = '" + unidadMedida + "', " +
            "imagen = '" + imagen + "', " +
            "audio = '" + audio + "', " +
            "video = '" + video + "', " +
            "ayuda = '" + ayuda + "' " +
            //"idPasoSgte = '" + idPasoSgte + "', " +
            //"idPasoAnterior = '" + idPasoAnterior + "' " +            
            " WHERE idReceta ='" + idReceta +"' and idPaso ='" + idPaso + "' " ;
        return Storage.executeQuery(sqlupdate).then(function(resultados){
            return resultados;
        });
    };
    
    api.setImagen = function(idReceta, idPaso, imagen){
        var sqlupdate = "UPDATE PasosReceta SET " + 
            "imagen = '" + imagen + "' " +
            " WHERE idReceta = '" + idReceta +"' and idPaso ='" + idPaso + "' " ;
        return Storage.executeQuery(sqlupdate).then(function(resultados){
            return resultados;
        });
    };
    
    api.setNew = function(idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda){
        var sqlinsert = "INSERT OR REPLACE INTO PasosReceta (idReceta, idPaso, tipo, titulo, descripcion, cantidad, unidadMedida, imagen, audio, video, ayuda) "+
            "VALUES ('" + idReceta + "', '" + idPaso + "', '" + tipo + "', '" + titulo + "', '" + descripcion + "', '" + cantidad + "', '" + unidadMedida + "', '" + imagen + "', '" + audio + "', '" + video + "', '" + ayuda + "')";
        return Storage.executeQuery(sqlinsert).then(function(resultados){
            return resultados;
        });
    };
    
    api.Delete = function(id){
        var sqldelete = "DELETE FROM PasosReceta WHERE idReceta = " + id;
        return Storage.executeQuery(sqldelete).then(function(resultados){
            return resultados;
        });
    };
    
    api.DeleteStep = function(id, idPaso){
        var sqldelete = "DELETE FROM PasosReceta WHERE idReceta = " + id + " AND idPaso = " + idPaso;
        return Storage.executeQuery(sqldelete).then(function(resultados){
            return resultados;
        });
    };
    
    api.setIdPaso = function(id, idPaso){
        var sqlUpdate = "UPDATE PasosReceta SET idPaso = idPaso - 1 WHERE idReceta = " + id + " AND idPaso >= " + idPaso;
        return Storage.executeQuery(sqlUpdate).then(function(resultados){
            return resultados;
        });
    };
    
    api.setUpIdPaso = function(id, idPaso){
        var sqlUpdate = "UPDATE PasosReceta SET idPaso = idPaso + 1 WHERE idReceta = " + id + " AND idPaso >= " + idPaso;
        return Storage.executeQuery(sqlUpdate).then(function(resultados){
            return resultados;
        });
    };
    
    
    return api;
})

.factory('Estadisticas', function (Storage) {
    'use strict';
    var api = {};
    var sql = "SELECT * FROM Estadisticas ";
    
    api.getAll = function(){
        return Storage.executeQuery(sql).then(function(resultados){
            //console.log("estad: " + resultados.size);
            return resultados;
        });
    };
    	
	api.historial = function(){
		
		var sqlhistorial = "SELECT E.fechaReceta AS Fecha, R.name AS Receta, CASE R.tipo WHEN 'H' THEN 'HOGAREÑA' WHEN 'I' THEN 'INDUSTRIAL' END AS Tipo, E.tiempo AS Tiempo, (ROUND((((E.idPaso * 1.00) / (COUNT(P.idReceta) * 1.00))*100.00),1)) AS Porcentaje_realizado  " +
							"FROM Estadisticas E, PasosReceta P, Recetas R " +
							"WHERE E.idReceta = R.idReceta AND R.idReceta = P.idReceta GROUP BY idEstadistica";
								
		return Storage.executeQuery(sqlhistorial).then(function(resultados){
            return resultados;
        });
    };
    
    api.get = function(idEstadistica){
        return Storage.executeQuery(sql + 'WHERE idEstadistica =' + idEstadistica).then(function(resultados){
            return resultados;
        });
    };
	
	api.setNew = function(idReceta, idPaso, fechaReceta, inicio, fin){
		
        var sqlinsert = "INSERT INTO Estadisticas (idReceta, idPaso, fechaReceta, inicio, fin) "+
            "VALUES ('" + idReceta + "', '" + idPaso + "', '" + fechaReceta + "', '" + inicio + "', '" + fin + "' )";
				
		return Storage.executeQuery(sqlinsert).then(function(resultados){
            return resultados;
        });
    };
	api.set = function(idPaso, fin, tiempo){
	
        var sqlupdate = "UPDATE Estadisticas SET " + 
            "idPaso = '" + idPaso + "', " +
			"fin = '" + fin + "', " +
			"tiempo = '" + tiempo + "' " +
            " WHERE idEstadistica =(SELECT MAX(idEstadistica) FROM Estadisticas)";
			
        return Storage.executeQuery(sqlupdate).then(function(resultados){
            return resultados;
        });
    };
	
    api.Delete = function(id){
        var sqldelete = "DELETE FROM Estadisticas WHERE idReceta = " + id;
        return Storage.executeQuery(sqldelete).then(function(resultados){
            return resultados;
        });
    };
    
	api.borrarEstadisticas = function(){
		
		//var sql = "DROP TABLE IF EXISTS Estadisticas";
        var sql = "DELETE FROM Estadisticas ";
						//console.log(sqlhistorial);
        return Storage.executeQuery(sql).then(function(resultados){
            return resultados;
        });
    };
	
	api.crearEstadisticas = function(){
		
		var sql = "CREATE TABLE Estadisticas (idEstadistica INTEGER PRIMARY KEY AUTOINCREMENT, idReceta INTEGER, idPaso INTEGER, tiempo VARCHAR(15), fechaReceta VARCHAR (19), inicio DATETIME, fin DATETIME)";
								
						//console.log(sqlhistorial);
        return Storage.executeQuery(sql).then(function(resultados){
            return resultados;
        });
    };
    
    return api;
})
.factory('Unidades', function (Storage) {
    'use strict';
    var api = {};
    var sql = "SELECT * FROM Unidades ";
    
    api.getAll = function(){
        return Storage.executeQuery(sql).then(function(resultados){
            //console.log("estad: " + resultados.size);
            return resultados;
        });
    };
    	
	    
    api.get = function(unidadMedida){
		
        return Storage.executeQuery(sql + "WHERE unidadMedida = '" + unidadMedida + "'").then(function(resultados){
            return resultados;
        });
    };
	
	api.setNew = function(unidadMedida, limite, unidadMedidaAlt){
		
        var sqlinsert = "INSERT INTO Unidades (unidadMedida, , pluralMedida, limite, unidadMedidaAlt, pluralMedidaAlt) "+
            "VALUES ('" + unidadMedida + "', '" + pluralMedida + "', '" + limite + "', '" + unidadMedidaAlt + "', '" + pluralMedidaAlt + "' )";
				
		return Storage.executeQuery(sqlinsert).then(function(resultados){
            return resultados;
        });
    };
		
    api.Delete = function(id){
        var sqldelete = "DELETE FROM Unidades WHERE idunidad = " + id;
        return Storage.executeQuery(sqldelete).then(function(resultados){
            return resultados;
        });
    };
    
	api.borrarUnidades = function(){
		
		
        var sql = "DELETE FROM Unidades ";
						//console.log(sqlhistorial);
        return Storage.executeQuery(sql).then(function(resultados){
            return resultados;
        });
    };
	
	    
    return api;
})
.factory('Files', function ($http, $q) {
    'use strict';
    var api = {};
    
    api.getImages = function() {
        var imageFilename = 'imagenes.json';
        return (this.getFileContent('data/' + imageFilename));
    };
    
    api.getAboutInfo = function() {
        var filename = 'about.json';
        return (this.getFileContent('data/' + filename));
    };
    
    api.getDataFileContent = function(dataFilename) {
        return (this.getFileContent('data/' + dataFilename));
    };
    //Ver como forzar el header http que la respuesta es text/plain
    api.getFileContent = function(filename) {
        var deferred = $q.defer();
        
        $http.get(filename)
          .then(function(data, status, headers, config) {
            console.log('Archivo: '+filename+' - status: ' + status + ' - headers: '+headers+' - config: '+config);
            return deferred.resolve(data);
          },
          function(data, status, headers, config) {
            console.error(status);
            return deferred.reject({ message: 'Status: '+status + ' - headers: '+headers+' - config: '+config });
          });
        return deferred.promise;

    };
    
    api.saveFileContent = function(filename, data) {
        try {
            var writer = new FileWriter(filename);
            writer.write(data);
        } catch(e) {
            console.error(e);
        }

        
        /*$http({
            url: '#/tab/download',
            method: "POST",
            data: data, //this is your json data string
            headers: {
               'Content-type': 'application/json'
            },
            responseType: 'arraybuffer'
        }).success(function (data, status, headers, config) {
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            window.open(objectUrl);
        }).error(function (data, status, headers, config) {
            //upload failed
        });*/
        
/*        var deferred = $q.defer();
        
        $http.get(filename)
          .then(function(data, status, headers, config) {
            console.log('Archivo: '+filename+' - status: ' + status);
            return deferred.resolve(data);
          },
          function(data, status, headers, config) {
            console.error(status);
            return deferred.reject({ message: "Status: "+status });
          });
        return deferred.promise;*/

    };
    return api;
})

.factory('MediaSrv', function($q, $ionicPlatform, $window){
  'use strict';


  function loadMedia(src, onError, onStatus, onStop){
  
    var defer = $q.defer();
    $ionicPlatform.ready(function(){
      var mediaSuccess = function(){
        if(onStop){onStop();}
      };
      var mediaError = function(err){
        _logError(src, err);
        if(onError){onError(err);}
      };
      var mediaStatus = function(status){
        if(onStatus){onStatus(status);}
      };

      if($ionicPlatform.is('android')){src = '/android_asset/www/' + src;}
      try {
          // Así evito errores en pruebas en modo web
          defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
      } catch(e) {
      }
    });
    return defer.promise;
  }

  function _logError(src, err){
    console.error('media error', {
      code: err.code,
      message: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status){
    if(status === 0){return 'Media.MEDIA_NONE';}
    else if(status === 1){return 'Media.MEDIA_STARTING';}
    else if(status === 2){return 'Media.MEDIA_RUNNING';}
    else if(status === 3){return 'Media.MEDIA_PAUSED';}
    else if(status === 4){return 'Media.MEDIA_STOPPED';}
    else {return 'Unknown status <'+status+'>';}
  }

  function getErrorMessage(code){
    if(code === 1){return 'MediaError.MEDIA_ERR_ABORTED';}
    else if(code === 2){return 'MediaError.MEDIA_ERR_NETWORK';}
    else if(code === 3){return 'MediaError.MEDIA_ERR_DECODE';}
    else if(code === 4){return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';}
    else {return 'Unknown code <'+code+'>';}
  }
    
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };
    
  return service;
})
.factory('Backup', function(Files){
    'use strict';
    var api = {};

    api.saveData = function(fileName, data) {
        Files.getSaveDataFileContent('about.json', data).then(function() {
            return data.data;
        }, function(cause){
            console.error(cause);
        });
    };
    
    return api;
})
;
