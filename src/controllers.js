angular.module('starter.controllers', ['ngGrid', 'ngAnimate'])
.controller('DashCtrl', function($rootScope, $scope, $ionicPopup, $ionicLoading, $timeout, Friends) {
    'use strict';

    $rootScope.modoIndustrial = false;
    $rootScope.modoHogar = false;
		
    /*Friends.get(2).then(function(friend){
        $rootScope.currentUser = (friend.length ? angular.copy(friend[0]) : {});
    });*/   

    // Recibo el evento de inicio de receta
    $scope.$on('InicioReceta', function(event, type) {
        $scope.utils.logEvent(event, 'tipo: ' + type);
        if (type==='I') {
            $scope.modoIndustrial = true;
            $scope.modoHogar = false;
        } else if (type==='H') {
            $scope.modoHogar = true;
            $scope.modoIndustrial = false;
        }
        $scope.recetaEnCurso = true;
        $scope.utils.logEvent(event, 'modoIndustrial: ' + $scope.modoIndustrial);
        $scope.utils.logEvent(event, 'modoHogar: ' + $scope.modoHogar);
        
        //Creación de estadíssticas
		
    });
	
	
    // Final de receta
    $scope.$on('CanceloReceta', function(event) {
        $scope.utils.logEvent(event);
        $scope.recetaEnCurso = false;
        $scope.modoHogar = false;
        $scope.modoIndustrial = false;
        //Actualizar estadíssticas
    });

    $scope.$on('FinReceta', function(event) {
        $scope.utils.logEvent(event);
        $scope.recetaEnCurso = false;
        $scope.modoHogar = false;
        $scope.modoIndustrial = false;
        //Actualizar estadíssticas
    });
    // Fin eventos
    
    $scope.loginAdmin = function() {
        //Si nos encontramos en pantalla de admin o ejecutando una receta, no permite ingreso a admin
        if ($scope.adminLoggedIn || $scope.recetaEnCurso) {
            return false;
        }
        Friends.get($rootScope.config.adminID).then(function(friend) {
            //console.log('PASS: ' + pw);
            $scope.showPopup(friend);
        },
        function(cause) {
            console.log(cause);
        });
    };
	
    // Defino una funcion showPopup para solicitar la clave de admin
    $scope.showPopup = function(friend) {
        $scope.data = {};
        $scope.data.cantIntentos = 0;
        $scope.pw = friend.length ? angular.copy(friend[0]).password : {};
        $scope.pwMaster = (friend.length ? angular.copy(friend[0]).passwordMaster : {});
        var myPopup = $ionicPopup.show({

            templateUrl: 'templates/promptPW.html',
            title: 'Acceso de administrador',
            subTitle: 'Ingrese la contraseña',
            scope: $scope,
            buttons: [
              { text: 'Cancelar' },
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: $scope.claveIngresada
              },
            ]
          });
        
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $timeout(function() {
         myPopup.close(); // Si por 30 segundos no se ingresa clave, se cancela el popup
      }, 30000);
    }; 

    $scope.claveIngresada = function(e) {
          if (!$scope.data.clave) {
            //don't allow the user to close unless he enters password
            e.preventDefault();
            $scope.utils.getById('pass').focus();
          } else { 
            var logged;
			var loginRegularAdmin = ($scope.data.clave === $scope.pw);
			var loginMaster = ($scope.data.clave === $scope.pwMaster);
            if (($scope.data.cantIntentos < $scope.config.maxCantidadIntentosPW && loginRegularAdmin) || loginMaster) {
                $scope.data.cantIntentos = 0;
                // Si la clave es correcta, lanzo el evento AdminLoggedIn
                logged = true;
                $scope.$emit('AdminLoggedIn', {'loginMaster': loginMaster});
            } else {
                $scope.data.cantIntentos++;
                // Si la clave es incorrecta vuelve al inicio
                console.log('Clave inválida al ingresar como admin.');
                $scope.data.clave = '';
                if ($scope.data.cantIntentos >= $scope.config.maxCantidadIntentosPW) {
                    var mensaje = 'Ingrese con la  clave maestra y modifique la clave de administrador';
                    $scope.$emit('showAlert', mensaje);
                }
                $scope.data.mensaje = 'Ingrese nuevamente la clave' + ($scope.config.isProduction?'':' - '+$scope.data.cantIntentos);
                /*$scope.utils.getById('mensaje').value = 'Error';*/
                /*logged = false;*/
                e.preventDefault();
                $scope.utils.getById('pass').focus();
            }
/*            $scope.pw = '';
            $scope.pwMaster = '';*/
            return logged;
          }
        };
})
                    
.controller('FriendsCtrl', function($scope, Friends, $timeout) {
    'use strict';
    Friends.getAll().then(function(allFriends){
        $scope.friends = allFriends;           
    },
    function(cause) {
        console.log(cause);
    });
    $scope.doRefresh = function() {
    
    console.log('Recargando!');
    $timeout( function() {
      //Recargar los usuarios

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
})

.controller('FriendDetailCtrl', function($rootScope, $scope, $ionicPopup, $stateParams, Friends, $window, Camera) {
    'use strict';
  //$ionicLoading.show();
    $scope.friend = {};
    Friends.get($stateParams.friendId).then(function(friend){
        $scope.friend = friend.length ? angular.copy(friend[0]) : {};
        $scope.photo = friend.photo;
        $scope.photoChanged = false;
    },
    function(cause) {
        console.log(cause);
    });
        
    $scope.limpiarPW = function() {
        $scope.utils.getById('pass').value = '';
        $scope.utils.getById('newpass1').value = '';
        $scope.utils.getById('newpass2').value = '';
        $scope.utils.getById('pass').focus();
        /*angular.element('#pass').val('');
        angular.element('#newpass1').val('');
        angular.element('#newpass2').val('');*/
    };
        
    $scope.guardarDatos = function() {
        var pw = '';
        if ($scope.friend.userType === 'A') {
            var newpass = $scope.utils.getById('newpass1').value;
            var newpass2 = $scope.utils.getById('newpass2').value;
            var actualPass = $scope.utils.getById('pass').value;
            /*var newpass = angular.element('#newpass1').val();
            var newpass2 = angular.element('#newpass2').val();
            var actualPass = angular.element('#pass').val();*/
            var cambioPw = ((newpass !== '' || actualPass !== '' || newpass2 !== '') && (newpass !== $scope.friend.password) );
            if (cambioPw) {
                var pwAValidar = angular.copy($scope.loginMaster? $scope.friend.passwordMaster: $scope.friend.password);
                if (!actualPass.length) {
                    $scope.$emit('showAlert', '¡Debe ingresar la contraseña actual!');
                    $scope.limpiarPW();
                    return false;
                } else if (pwAValidar !== actualPass) {
                    var mensaje = '¡La contraseña actual es incorrecta!' + ($scope.loginMaster?'<br>Debe ingresar la  clave maestra.':'');
                    $scope.$emit('showAlert', mensaje);
                    $scope.limpiarPW();
                    return false;
                } else if (newpass.length > $scope.config.maxLargoPW) {
                    $scope.$emit('showAlert', 'La clave no debe tener más de ' + $scope.config.maxLargoPW + ' caracteres');
                    $scope.limpiarPW();
                    return false;
                } else if (!newpass.length || !newpass2.length) {
                        $scope.$emit('showAlert', 'Debe ingresar la nueva contraseña');
                        $scope.limpiarPW();
                        return false;
                } else {
                    if (newpass === newpass2) {
                        pw = newpass;
                    } else {
                        $scope.$emit('showAlert', '¡No coinciden las contraseñas!');
                        $scope.limpiarPW();
                        return false;
                    }
                }
            }
            
        }
        
        if (!$scope.friend.name.length) {
            $scope.$emit('showAlert', '¡ingrese el nombre de usuario!');
            return false;
        }
        
		var newPhoto = '';
        if ($scope.photoChanged) {
            newPhoto = $scope.friend.photo;
        }
        Friends.set($scope.friend.id, $scope.friend.name, $scope.friend.gender, pw, newPhoto, newPhoto).then(function(){
            $scope.$emit('showAlert', 'Información modificada satisfactoriamente');
            $window.location='#/tab/friends';
        });
        return true;
    }; 
                    
    $scope.cancelarEdicion= function() {
        $scope.friend.photo = $scope.fotoAnterior;
        $window.location='#/tab/friends';
    };
    
    $scope.uploadFile = function($event) {
        //angular.element('#fileUploader').click();
        //_PROBAR
        $scope.utils.getById('fileUploader').click();
        $event.preventDefault();
    };
    
    //FUNCION PARA SACAR FOTO, ES PARA QUE TOME FOTO DEL USUARIO
    $scope.getPhoto = function() {
        $scope.fotoAnterior = $scope.friend.photo;
        Camera.getPicture({
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false,
            destinationType: 0, //file, hay q usar 0 para q traiga en base64
            sourceType: 1, // 0-photolibrary, 1-camara
            encodingType: 0,
            correctOrientation: 1
        }).then(function(imageURI) {
          //console.log(imageURI);
          //$scope.lastPhoto = imageURI;
            console.log(imageURI);
            $scope.friend.photo = 'data:image/jpeg;base64,' + imageURI;
            $scope.photoChanged = true;
            
            //hay q poner esto:
            //var image = document.getElementById('myImage');
            //image.src = 'data:image/jpeg;base64,' + imageData;
        }, function(err) {
            console.err(err);
            $scope.photoChanged = false;
        });
        
    };

  //$scope.friend = Friends.get($stateParams.friendId);
  //$ionicLoading.hide();
})

.controller('ModalidadCtrl', function() { //$scope, $rootScope, $ionicPopup, $timeout, $state, Recetas
    'use strict';
})

.controller('EstadisticasCtrl', function($scope, $rootScope, $ionicPopup, $timeout, $state, Estadisticas, $ionicPlatform) {
    'use strict';
    
   $scope.filterOptions = {
        filterText: '',
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10],
        pageSize: 10,
        currentPage: 1
    };	
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                	Estadisticas.historial().then(function (largeLoad) {		
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                Estadisticas.historial().then(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    
    $scope.estadisticasOptions = { data: 'myData',
                                  /*data: 'estadisticas', */
       columnDefs: [{field: 'Fecha', displayName: 'Fecha y hora', cellFilter: 'date:\'dd/MM/yyyy HH:MM Z\''},
                    {field: 'Receta', displayName: 'Nombre Receta'},
                    {field: 'Tipo', displayName: 'Tipo amasado'},
                    {field: 'Tiempo', displayName: 'Tiempo transcurrido'},
                     {field:'Porcentaje_realizado', displayName:'Avance obtenido', 
                        cellTemplate: '<div ng-class="{green: row.getProperty(col.field) == 100}"><div ng-class="{yellow: row.getProperty(col.field) >= 30 && row.getProperty(col.field) < 100}"><div ng-class="{orange: row.getProperty(col.field) < 30}"><div ng-class="{red: row.getProperty(col.field) == 0}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'}],
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        plugins: [new ngGridFlexibleHeightPlugin(),
                  ($ionicPlatform.is('android')? {}: new ngGridCsvExportPlugin({linkLabel: ' Exportar ', fileName: 'estadisticas.csv'}))]
                                 };
	$scope.inicializarEstadisticas = function () {
        $ionicPopup.confirm({
                title: 'Borrar Estadísticas',
                cancelText: 'Cancelar',
                template: '<p class="center-text">¿Está seguro que desea borrar las estadísticas?</p>'
            }).then(function(res) {
                if(res) {
                    $scope.showLoading();
					Estadisticas.borrarEstadisticas().then(function(){
						$scope.hideLoading();
						$state.go('tab.account', {'loginMaster': $scope.loginMaster});
                    });
/*
					$timeout(function() {
						$scope.hideLoading();
						$state.go('tab.account', {});
						//$window.location.reload();
						//$scope.reload();
					}, 1000);
*/
						}
				});
		
				
    };
    $scope.crearBackup  = function () {
    };
})

.controller('ListaRecetaCtrl', function($scope, $rootScope, $ionicPopup, $timeout, Recetas, $state, $stateParams) {
    'use strict';
    Recetas.getAll().then(function(allRecetas){
        $scope.recetas = allRecetas.filter(function(receta){
            return (receta.tipo === $stateParams.type);
        });
        $scope.$emit('InicioReceta', $stateParams.type);
    });
    
    $scope.cancelar = function() {
        $ionicPopup.confirm({
                title: 'Cancelar',
                cancelText: 'No',
                okText: 'Sí',
                template: '<p class="center-text">¿Está seguro de cancelar?</p>'
            }).then(function(res) {
                if(res) {
                    $state.go('tab.modalidad');
                    $scope.$emit('CanceloReceta', {});
                }
            });
    };
})

.controller('RecetaCtrl', function($scope, $ionicPopup, $timeout, Recetas, PasosRecetas, $state, $stateParams, $window, $q, Estadisticas, Camera, $ionicPlatform, Unidades, $ionicScrollDelegate) {
    'use strict';
    //var deferred = $q.defer();
    //El primer paso que se muestra es el cero
    $scope.coeficiente = 1;
    $scope.pasoActual = 0;
    $scope.MostrarFelicitaciones = false;
    //Por default se visualiza la receta
    $scope.edicion = false;
    
    //Lo primero que se pide es la cantidad a preparar
    $scope.MostrarCantidad = true;
    $scope.MostrarPaso = false;

    $scope.goTop = function() {
        console.debug('goTop');
        $ionicScrollDelegate.scrollTop(true);
    };

    PasosRecetas.get($stateParams.idReceta).then(function(pasos){
        $scope.pasosreceta = angular.copy(pasos);
        $scope.tituloPortadaReceta = "Ingrese la cantidad de " + $scope.pasosreceta[0].name + " que desea fabricar";
        $scope.CantidadesDisponibles();
        $scope.cantidadAPreparar = $scope.pasosreceta[0].CantMinima;
        $scope.$apply();
        $scope.goTop();
    });

	$scope.inicioReceta = new Date(); //cuando arranca la ejec de la receta
    try {
        // Así evito errores en pruebas en modo web
        $scope.audio = new Media(); //para la rep de sonido
    } catch(e) {
        $scope.audio = {};
		$scope.audioPlayer = $scope.utils.getById('player');
    }
	$scope.playing = false;
	
	//================concateno la fecha y la hora ========================
	var fechaReceta = $scope.inicioReceta.getFullYear() + '/';
	
	if (($scope.inicioReceta.getMonth() + 1) <=9 ){
		fechaReceta = fechaReceta + '0';
	}
	fechaReceta = fechaReceta + ($scope.inicioReceta.getMonth() + 1) + '/';
	if ($scope.inicioReceta.getDate() <=9 ){
		fechaReceta = fechaReceta + '0';
	}
	fechaReceta = fechaReceta + $scope.inicioReceta.getDate() + ' ';
	
	if ($scope.inicioReceta.getHours() <=9 ){
		fechaReceta = fechaReceta + '0';
	}
	fechaReceta = fechaReceta + $scope.inicioReceta.getHours() + ':';
	if ($scope.inicioReceta.getMinutes() <=9 ){
		fechaReceta = fechaReceta + '0';
	}
	fechaReceta = fechaReceta + $scope.inicioReceta.getMinutes() + ':';
	if ($scope.inicioReceta.getSeconds() <=9 ){
		fechaReceta = fechaReceta + '0';
	}
	fechaReceta = fechaReceta + $scope.inicioReceta.getSeconds();
	
	//===================================================================
	
	Estadisticas.setNew($stateParams.idReceta, $scope.pasoActual, fechaReceta, $scope.inicioReceta, $scope.inicioReceta);
			
    $scope.CantidadesDisponibles = function(){
        $scope.cantidadesArray = [];
        for(var i = 1; i < 11; i++) {
            $scope.cantidadesArray.push($scope.pasosreceta[0].CantMinima * i );
        }
    //$scope.cantidadAPreparar = $scope.cantidadesArray[0];
        
    };
    
    $scope.siguientePaso = function() {
		$scope.parar(); //detengo la reproduccion
		
        var fecha1 = new Date($scope.inicioReceta);
		var fecha2 = new Date();
		var diferencia = (fecha2.getTime() - fecha1.getTime());
		var minutos = Math.floor(diferencia / (1000 * 60));
		var segundos = Math.floor(diferencia / (1000));
		var hora = minutos + ' Min ' + (segundos - (minutos * 60)) + ' Seg';
		
				
		Estadisticas.set($scope.pasoActual + 1, fecha2, hora);
		
		if($scope.pasoActual === $scope.pasosreceta.length - 1) {
            //Si el paso es el ultimo, muestro mensaje de felictaciones
            $scope.MostrarFelicitaciones = true;
            $scope.MostrarPaso = false;
        } else {
            //Sino, paso al siguiente paso
            $scope.pasoActual++;
        }
		//===== verifico si hace falta cambiar la unidad de medida========
		$scope.cambiarUnidad();
		//================================================================
        $scope.goTop();
    };
    
    
    $scope.pasoAnterior = function() {
		$scope.parar(); //detengo la reproduccion
		
        if($scope.pasoActual === 0) {
            //Si el paso es el primero, redirecciono a modalidad
            //$window.location = '#/tab/seleccionRecetas/' + $scope.pasosreceta[0].tipo;
            $scope.MostrarCantidad = true;
            $scope.MostrarPaso = false;
        } else {
            //Sino, paso al paso anterior
            $scope.pasoActual--;            
        }
		//===== verifico si hace falta cambiar la unidad de medida========
		$scope.cambiarUnidad();
		//================================================================
        $scope.goTop();
    };
    
    $scope.cancelarReceta = function() {
		$scope.parar(); //detengo la reproduccion
        $ionicPopup.confirm({
                title: 'Cancelar receta',
                cancelText: 'No',
                okText: 'Sí',
                template: '<p class="center-text">¿Está seguro de cancelar la receta?</p>'
            }).then(function(res) {
                if(res) {
                    $window.location = '#/tab/seleccionRecetas/' + $scope.pasosreceta[0].tipo;
                    $scope.$emit('CanceloReceta', {});
                }
            });
    };
    
    $scope.volverInicio = function() {
		$scope.parar(); //detengo la reproduccion
        $window.location = '#/tab/dash';
        $scope.$emit('FinReceta', {});
    };
    
    $scope.volverModalidad = function() {
		$scope.parar(); //detengo la reproduccion
        $window.location = '#/tab/seleccionRecetas/' + $scope.pasosreceta[0].tipo;
        $scope.$emit('FinReceta', {});
    };
    
    $scope.comenzarReceta = function(cantidad) {
        $scope.coeficiente = (cantidad / $scope.pasosreceta[0].CantMinima);
        $scope.MostrarCantidad = false;
        $scope.MostrarPaso = true;
		//===== verifico si hace falta cambiar la unidad de medida========
		$scope.cambiarUnidad();
		//================================================================
        $scope.goTop();
    };
    
    $scope.editarPaso = function() {
        $scope.edicion = true;
        //Habilitar inputs
    };

    $scope.finEditarPaso = function() {
        //Deshabilitar inputs y guardar datos
        $scope.edicion = false;
    };
	
	$scope.cambiarUnidad = function() {
		var cantidadRecalculada;
        //===== verifico si hace falta cambiar la unidad de medida========
		if($scope.pasosreceta[$scope.pasoActual].unidadMedida !== '') { 
			//cargo el limite y la var alternativa...si hay
				
				Unidades.get($scope.pasosreceta[$scope.pasoActual].unidadMedida).then(function(unidad){
				if (unidad[0].limite !== 0){
					if (($scope.pasosreceta[$scope.pasoActual].cantidad * $scope.coeficiente) >= unidad[0].limite) {
						console.log("mayor");
						cantidadRecalculada = ($scope.pasosreceta[$scope.pasoActual].cantidad * $scope.coeficiente )/unidad[0].limite;
						if ((cantidadRecalculada % 1) !== 0){
							$scope.cantidadPaso = cantidadRecalculada.toFixed(2);
						}
						else {
							$scope.cantidadPaso = cantidadRecalculada;
						}
						
						console.log("la nueva cantidad es: " + $scope.cantidadPaso);
						if ($scope.cantidadPaso > 1 ){
							$scope.unidadPaso = unidad[0].pluralMedidaAlt;
						}
						else {
							$scope.unidadPaso = unidad[0].unidadMedidaAlt;
						}
					}
					else {
						console.log("menor");
						cantidadRecalculada = $scope.pasosreceta[$scope.pasoActual].cantidad * $scope.coeficiente;
						if ((cantidadRecalculada % 1) !== 0){
							$scope.cantidadPaso = cantidadRecalculada.toFixed(2);
						}
						else {
							$scope.cantidadPaso = cantidadRecalculada;
						}
						
						if ($scope.cantidadPaso > 1 ){
							$scope.unidadPaso = unidad[0].pluralMedida;
						}
						else {
							$scope.unidadPaso = unidad[0].unidadMedida;
						}
					}
				}
				else {
					console.log("limite 0");
					cantidadRecalculada = $scope.pasosreceta[$scope.pasoActual].cantidad * $scope.coeficiente;
					if ((cantidadRecalculada % 1) !== 0){
						$scope.cantidadPaso = cantidadRecalculada.toFixed(2);
					}
					else {
						$scope.cantidadPaso = cantidadRecalculada;
					}
					
					if ($scope.cantidadPaso > 1 ){
						$scope.unidadPaso = unidad[0].pluralMedida;
					}
					else {
						$scope.unidadPaso = unidad[0].unidadMedida;
					}
				}
			});
			
			
        } else {
			cantidadRecalculada = $scope.pasosreceta[$scope.pasoActual].cantidad * $scope.coeficiente;
			if ((cantidadRecalculada % 1) !== 0){
				$scope.cantidadPaso = cantidadRecalculada.toFixed(2);
			}
			else {
				$scope.cantidadPaso = cantidadRecalculada;
			}
			$scope.unidadPaso = $scope.pasosreceta[$scope.pasoActual].unidadMedida;
        }
		//================================================================
    };
    
    
    //FUNCION PARA SACAR FOTO, ES PARA QUE TOME FOTO DEL BROWSER PARA LA RECETA
    $scope.getPhoto = function() {
        console.log($scope.pasosreceta[$scope.pasoActual].imagen);
        console.log($scope.pasoActual);
        $scope.fotoAnterior = $scope.pasosreceta[$scope.pasoActual].imagen; 
        //$scope.pasosreceta[$scope.pasoActual].imagen = '';
        Camera.getPicture({
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false,
            destinationType: 0, //file, hay q usar 0 para q traiga en base64
            sourceType: 0, // 0-photolibrary, 1-camara
            encodingType: 0,
            correctOrientation: 1
        }).then(function(imageURI) {
          //console.log(imageURI);
          //$scope.lastPhoto = imageURI;
            console.log(imageURI);
            $scope.pasosreceta[$scope.pasoActual].imagen = 'data:image/jpeg;base64,' + imageURI;
            PasosRecetas.setImagen($scope.pasosreceta[$scope.pasoActual].idReceta, $scope.pasosreceta[$scope.pasoActual].idPaso, $scope.pasosreceta[$scope.pasoActual].imagen);
            //SOLO PARA PRUEBA
        }, function(err) {
            console.err(err);
            $scope.photoChanged = false;
        });
        
    };
    
    $scope.audio.statusCallback = function(status) {
        if ($scope.playing && 
            (status === Media.MEDIA_PAUSED) || (status === Media.MEDIA_STOPPED)) {
            $scope.playing = false;
        }
    };

	$scope.reproducir = function(audioPaso){
	
	//MediaSrv.loadMedia(audioPaso).then(function(media){
		if($ionicPlatform.is('android')) {
			if (!$scope.playing) {
				//var ruta = '/android_asset/www/' + audioPaso;
				$scope.audio.src = audioPaso;
				$scope.playing = true;
				$scope.audio.play();
			}
		}
		else {
			console.log('no es android');
			//var audioPlayer = document.getElementById('player');
			//if (audioPlayer !== undefined){
			$scope.audioPlayer.src = audioPaso;
			//if ($scope.audioPlayer.paused){
				//audioPlayer.controls=true;
				$scope.audioPlayer.play();
                $scope.playing = true;
			//}
			//else {
				//audioPlayer.controls=false;
			//	$scope.audioPlayer.pause();
			//}
			
		}
		
		
	
	};
	
	$scope.parar = function(){
	
	//MediaSrv.loadMedia(audioPaso).then(function(media){
		if($ionicPlatform.is('android')) {
			if ($scope.playing) {
				//var ruta = "/android_asset/www/" + audioPaso;
				//console.log("stop " + ruta);
				$scope.audio.stop();
				// console.log("stopio ");
				// $scope.audio.src = ruta;
				//$scope.audio = new Media(ruta);
				// $scope.audio.play();
				$scope.playing = false;
			}			
		}
		else {
			console.log('no es android');	
			//audioPlayer = document.getElementById('player');
			//if (audioPlayer !== undefined){
			$scope.audioPlayer.pause();
            $scope.playing = false;
		}
		
	};
    
    $scope.$on('SoundMute', function(event){
        $scope.utils.logEvent(event);

        if ($scope.playing && !$scope.config.appSound) {
            $scope.parar();
        }
    });    
})
.controller('DatosCtrl', function($scope, $rootScope, $ionicLoading, $timeout, Friends, Recetas, PasosRecetas, Estadisticas, Storage, Files, $state, Unidades, $ionicPlatform) {
    'use strict';
    //Pantalla de datos

    
    Friends.getAll().then(function(allUsuarios){
        console.log('Usuarios obtenidos: ' + allUsuarios.length);
        $scope.usuarios = allUsuarios;
    },
    function(cause) {
        console.log(cause);
    });
        
    $scope.usuariosOptions = { data: 'usuarios' };
        
    Recetas.getAll().then(function(allRecetas){
        console.log('Recetas obtenidos: ' + allRecetas.length);
        $scope.recetas = allRecetas;
    });
        
    $scope.recetasOptions = { data: 'recetas' };
    
    PasosRecetas.getAll().then(function(allPasosRecetas){
        console.log('Pasos obtenidos: ' + allPasosRecetas.length);
        $scope.pasosRecetas = allPasosRecetas;
    });
    
    $scope.pasosRecetasOptions = { data: 'pasosRecetas' };
    
    Estadisticas.getAll().then(function(allEstadisticas){
        console.log('Estadisticas obtenidos: ' + allEstadisticas.length);
        $scope.estadisticas = angular.copy(allEstadisticas);
    });
	
    $scope.estadisticasOptions = { data: 'estadisticas' };
	
	Unidades.getAll().then(function(allUnidades){
        console.log('Unidades obtenidos: ' + allUnidades.length);
        $scope.unidades = allUnidades;
    });
    
    $scope.unidadesOptions = { data: 'unidades' };

    $scope.inicializarDatos = function () {
        $scope.showLoading();
        //Inicializar borrando previamente
        Storage.inicializar(true, $ionicPlatform.is('android'));
        
        $timeout(function() {
            $scope.hideLoading();
            $state.go('tab.account', {'loginMaster': $scope.loginMaster});
        }, 500);
    };
	
    $scope.reproducir = function(){
	var audioPlayer = document.getElementById('player');
	//if (audioPlayer !== undefined){
		if (audioPlayer.paused){
			audioPlayer.controls=true;
			audioPlayer.play();
		}
		else {
			audioPlayer.controls=false;
			audioPlayer.pause();
		}
    };

})
.controller('edicionReceta', function($scope, $rootScope, $ionicLoading, $timeout, $ionicPopup, Recetas, PasosRecetas, Storage, Files, $state, Estadisticas, $window, $ionicScrollDelegate) {
    'use strict';
    
    $scope.goTop = function() {
        console.debug('goTop');
        $ionicScrollDelegate.scrollTop(true);
    };
    
    $scope.editableInPopup = '<button id="editBtn" type="button" class="btn btn-primary ion-edit table-button" ng-click="edit(row.entity.idReceta)" title="Editar"></button> ';
    $scope.deleteInPopup = '<button id="deletbtn" type="button" class="btn btn-primary ion-android-trash table-button" ng-click="borrar(row.entity.idReceta)" title="Borrar"></button> ';

    $scope.borrar = function (id)
    {
        //console.log('intento borrar ' + id);
        $ionicPopup.confirm({
                title: 'Borrar receta',
                cancelText: 'Cancelar',
                template: '<p class="center-text">¿Está seguro de borrar la receta? </p>'
            }).then(function(res) {
                if(res) {
                    Recetas.Delete(id);        
                    PasosRecetas.Delete(id);
                    Estadisticas.Delete(id);
                    $scope.getInformacionEdicion();
                }
            });
    };
    
    $scope.edit = function (id)
    {
        $window.location = '#/tab/editarPasosReceta/2/'+id;
        console.log('intento editar ' + id);
    };
    
    $scope.nuevaReceta = function()
    {
        $window.location = '#/tab/editarPasosReceta/1/0';
        $scope.goTop();
    };
    
    $scope.getInformacionEdicion = function() {
        $scope.showLoading();
        Recetas.getInformacionEdicion().then(function(allRecetas){
            $scope.hideLoading();
            console.log('Recetas obtenidos: ' + allRecetas.length);
            $scope.recetas = allRecetas;
        });
    };
        
    $scope.getInformacionEdicion();
    //$scope.recetasOptions = { data: 'recetas' };
    $scope.recetasOptions = {
        data : 'recetas',
        columnDefs : [ {
            field : 'idReceta',
            displayName : 'IdReceta'
        }, {
            field : 'name',
            displayName : 'Nombre',
            
        }, {
            field : 'DesTipo',
            displayName : 'Tipo',
            
        }, {
            displayName : 'Editar',
            cellTemplate : $scope.editableInPopup,
            sortable : false,
            cellClass : 'center-text'
        }, {
            displayName : 'Borrar',
            cellTemplate : $scope.deleteInPopup,
            sortable : false,
            cellClass : 'center-text'
        } ],
        multiSelect: false
    };

})

.controller('editarPasosReceta', function($scope, $rootScope, $ionicLoading, $ionicPopup, $timeout, Recetas, PasosRecetas, Storage, Files, $state, $window, $q, Estadisticas, Camera, $stateParams, Unidades, $ionicScrollDelegate) {
    'use strict';
    
    $scope.MostrarPortada = 1;
    $scope.MostrarPasos = 0;
    $scope.pasoActual = 0;
    $scope.mostrarImagen = 0;
    $scope.mostrarImagenPasoNuevo = 0;
    $scope.agregarPaso = 0;
    $scope.NuevoPaso = 0;
    
    //cargo vector de tipos de receta
    $scope.tiposDeRecetaArray = [{tipoReceta: 'Hogareña', id: 'H'}, {tipoReceta: 'Industrial', id: 'I'}];        
    $scope.tiposDeReceta = $scope.tiposDeRecetaArray[0];
    //
    
    $scope.goTop = function() {
        console.debug('goTop');
        $ionicScrollDelegate.scrollTop(true);
    };

    //cargo vector de unidades
    $scope.tiposDeUnidadMedidaArray = [];
    Unidades.getAll().then(function(unidades){
        angular.forEach(unidades, function(unidad){
            $scope.tiposDeUnidadMedidaArray.push({descripcion: unidad.unidadMedida});
            $scope.unidadDeMedida = $scope.tiposDeUnidadMedidaArray[0];
            $scope.unidadDeMedidaNuevoPaso = $scope.tiposDeUnidadMedidaArray[0];
        });
    });
    
    //$scope.tiposDeUnidadMedidaArray = [{descripcion: '', id: ''}, {descripcion: 'GR', id: 'GR'}, {descripcion: 'KG', id: 'KG'}, {descripcion: 'CC', id: 'CC'}, {descripcion: 'LT', id: 'LT'}, {descripcion: 'Unidades', id: 'Unidades'}];        
    //$scope.unidadDeMedida = $scope.tiposDeUnidadMedidaArray[1];
    //$scope.tiposDeReceta = $scope.tiposDeRecetaArray[0];
    //
    
    console.log ('modo: ' + $stateParams.modo);
    if ($stateParams.modo === '1') {
        $scope.edicionReceta = 0;
        $scope.nuevaReceta = 1;
        $scope.titulo = 'Nueva Receta';
        $scope.CantMinima = 1;
        $scope.agregarPaso = 0;
    } else {
        $scope.edicionReceta = 1;
        $scope.nuevaReceta = 0;
        $scope.titulo = 'Edicion de Receta';
        
        PasosRecetas.get($stateParams.idReceta).then(function(pasos){
            $scope.pasosreceta = angular.copy(pasos);
            //$scope.CantidadesDisponibles();
            $scope.imagen = $scope.pasosreceta[0].imagenPortada;
            $scope.nombre = $scope.pasosreceta[0].name;
            //$scope.CantMinima = $scope.pasosreceta[0].CantMinima;
            //PROBAR
            //angular.element('#CantMinima').val($scope.pasosreceta[0].CantMinima) ;
            //angular.element('#tipoDeReceta').val($scope.pasosreceta[0].TipoReceta) ;
            $scope.utils.getById('CantMinima').value = $scope.pasosreceta[0].CantMinima;
            $scope.utils.getById('tipoDeReceta').value = $scope.pasosreceta[0].TipoReceta;
            $scope.mostrarImagen = 1;
        });
    }
    
    $scope.siguientePaso = function() {
        if ($scope.MostrarPortada === 1){
            $scope.MostrarPortada = 0;
            $scope.MostrarPasos = 1;
            $scope.infoPaso();
        }else{
            if($scope.pasoActual === $scope.pasosreceta.length - 1) {
                //Si el paso es el ultimo, muestro mensaje de felictaciones
                $scope.finalizarReceta();
            } else {
                //Sino, paso al siguiente paso
                $scope.pasoActual++;
                $scope.infoPaso();
            }
        }
        $scope.goTop();
    };
    
    $scope.pasoAnterior = function() {
		if ($scope.MostrarPortada === 1){
            $scope.finalizarReceta();
        }else{
            if($scope.pasoActual === 0) {
                $scope.MostrarPortada = 1;
                $scope.MostrarPasos = 0;
            } else {
                //Sino, paso al paso anterior
                $scope.pasoActual--;            
                $scope.infoPaso();
            }
        }
    };
    
    $scope.infoPaso = function(){
        $scope.Titulo = $scope.pasosreceta[$scope.pasoActual].titulo;
        $scope.Descripcion = $scope.pasosreceta[$scope.pasoActual].descripcion;
        $scope.Cantidad = $scope.pasosreceta[$scope.pasoActual].cantidad;
        $scope.imagenPaso = $scope.pasosreceta[$scope.pasoActual].imagen;
        $scope.audioReceta =  $scope.pasosreceta[$scope.pasoActual].audio; //Trae el path del audio
        $scope.nombrePaso = 'Paso ' + $scope.pasosreceta[$scope.pasoActual].idPaso;
        angular.element('#unidadDeMedida').val($scope.pasosreceta[$scope.pasoActual].unidadMedida);
        $scope.mostrarImagen = 1;
    };
        
    
    //FUNCION PARA SACAR FOTO, ES PARA QUE TOME FOTO DEL BROWSER PARA LA RECETA
    $scope.getPhoto = function() {
        //Descomentar esto si es para edicion
        //$scope.fotoAnterior = $scope.pasosreceta[$scope.pasoActual].imagen; 
        //$scope.pasosreceta[$scope.pasoActual].imagen = '';
        Camera.getPicture({
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false,
            destinationType: 0, //file, hay q usar 0 para q traiga en base64
            sourceType: 0, // 0-photolibrary, 1-camara
            encodingType: 0,
            correctOrientation: 1
        }).then(function(imageURI) {
            console.log(imageURI);
            
            if ($scope.MostrarPortada === 1){
                $scope.imagen = 'data:image/jpeg;base64,' + imageURI;
            }else{
                //$scope.idPasoAnterior = $scope.idPaso;
                if ($scope.agregarPaso===0) {
                    $scope.imagenPaso = 'data:image/jpeg;base64,' + imageURI;
                    $scope.mostrarImagen = 1;
                }else{
                    $scope.imagenPasoNuevo = 'data:image/jpeg;base64,' + imageURI;
                    $scope.mostrarImagenPasoNuevo = 1;
                }
            }
                
        }, function(err) {
            $scope.mostrarImagen = 0;
            $scope.mostrarImagenPasoNuevo = 0;
            console.err(err);
        });

    };
    
    $scope.cancelarReceta = function() {
        $ionicPopup.confirm({
                title: 'Cancelar receta',
                cancelText: 'No',
                okText: 'Sí',
                template: '<p class="center-text">¿Está seguro de cancelar la receta?</p>'
            }).then(function(res) {
                if(res) {
                    $window.location = '#/tab/editarReceta';
                    $scope.$emit('CanceloReceta', {});
                }
            });
    };
    
    $scope.cancelarEdicionReceta = function() {
        $ionicPopup.confirm({
                title: 'Cancelar edicion de receta',
                cancelText: 'No',
                okText: 'Sí',
                template: '<p class="center-text">¿Está seguro de cancelar la edicion de la receta?</p>'
            }).then(function(res) {
                if(res) {
                    $window.location = '#/tab/editarReceta';
                    $scope.$emit('CanceloReceta', {});
                }
            });
    };
    
    $scope.finalizarReceta = function() {
        $scope.$emit('showAlert', 'Receta almacenada correctamente');
        $window.location = '#/tab/editarReceta';
    };
    
    $scope.cancelarPasoInsertReceta = function() {
        $ionicPopup.confirm({
                title: 'Cancelar receta',
                cancelText: 'No',
                okText: 'Sí',
                template: '<p class="center-text">¿Está seguro de cancelar la receta? (se perderan los cambios realizados)</p>'
            }).then(function(res) {
                if(res) {
                    Recetas.Delete($scope.NuevoId);
                    PasosRecetas.Delete($scope.NuevoId);
                    $window.location = '#/tab/editarReceta';
                    $scope.$emit('CanceloReceta', {});
                }
            });
    };
    
    $scope.grabarPortadaReceta = function() {
        var name = angular.element('#nombre').val();
        var vCantMinima = parseInt(angular.element('#CantMinima').val());
        var vTipo = angular.element('#tipoDeReceta').val();
        var mensaje = '';

        if (!name.length) {
            mensaje = 'Ingrese el nombre de la receta';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (isNaN(vCantMinima) || vCantMinima < 0) {
            mensaje = 'Ingrese la cantidad minima a fabricar';
            $scope.$emit('showAlert', mensaje);
            return false;
        }
        
        Recetas.setNew(name, vTipo, $scope.imagen, vCantMinima).then(function(NuevoId){
            console.log('ultimo id: ' + NuevoId);
            $scope.NuevoId=NuevoId;
            $scope.MostrarPortada = 0;
            $scope.MostrarPasos = 1;
            $scope.idPaso = 1;
            $scope.mostrarImagen = 0;
            $scope.nombrePaso = 'Paso ' + $scope.idPaso;
            $scope.goTop();
        });
    };

    $scope.grabarEdicionPortadaReceta = function(){
        var vIdReceta = $scope.pasosreceta[$scope.pasoActual].idReceta;
        var vNombre = angular.element('#nombre').val();
        var vCantMinima = parseInt(angular.element('#CantMinima').val());
        //estos dos de abajo no funcionan
        var vTipo = angular.element('#tipoDeReceta').val();
        var mensaje = '';
        
        if (!vNombre.length) {
            mensaje = 'Ingrese el nombre de la receta';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (isNaN(vCantMinima) || vCantMinima < 0) {
            mensaje = 'Ingrese la cantidad minima a fabricar';
            $scope.$emit('showAlert', mensaje);
            return false;
        }
        
        Recetas.set(vIdReceta, vNombre, vTipo, $scope.imagen, vCantMinima).then(function(){
            $scope.siguientePaso();
        });
        $scope.goTop();
    };
        
    $scope.grabarEdicionPasosReceta = function(){
        var vIdReceta = $scope.pasosreceta[$scope.pasoActual].idReceta; 
        var vIdPaso = $scope.pasosreceta[$scope.pasoActual].idPaso;
        var vTipo = angular.element('#tipoDeReceta').val();
        var vTitulo = angular.element('#Titulo').val();
        var vDescripcion = angular.element('#Descripcion').val();      
        var vCantidad = parseInt(angular.element('#Cantidad').val());
        //var vAudioPaso = angular.element('#audioReceta').val(); 
        var mensaje = '';
        //console.log("el valor de vaudiopaso antes de grabar: " + vAudioPaso);
        if (!vTitulo.length) {
            mensaje = 'Ingrese el titulo del paso de la receta';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (!vDescripcion.length) {
            mensaje = 'Ingrese la descripcion de la receta';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (isNaN(vCantidad) || vCantidad < 0) {
            mensaje = 'Ingrese la cantidad minima (minimo 0)';
            $scope.$emit('showAlert', mensaje);
            return false;
        }
        
        //estos dos de abajo no funcionan
        var vUnidadMedida = angular.element('#unidadDeMedida').val();
        PasosRecetas.set(vIdReceta, vIdPaso, vTipo, vTitulo, vDescripcion, vCantidad, vUnidadMedida, $scope.imagenPaso, $scope.audioReceta, '', '').then(function(){
            $scope.siguientePaso();
        });
        $scope.goTop();
    };        
    
    $scope.finalizarEdicionPortadaReceta = function(){
        $scope.grabarEdicionPortadaReceta();
        //$scope.grabarEdicionPortadaReceta(nombre, cantMinima);
        $scope.finalizarReceta();
    };
    
    $scope.finalizarEdicionPasosReceta = function(){
        
        var vTitulo = angular.element('#Titulo').val();
        var vDescripcion = angular.element('#Descripcion').val();      
        var vCantidad = parseInt(angular.element('#Cantidad').val());
        var mensaje = '';
        
        if (!vTitulo.length) {
            mensaje = 'Ingrese el titulo del paso de la receta';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (!vDescripcion.length) {
            mensaje = 'Ingrese la descripcion de la receta';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (isNaN(vCantidad) || vCantidad < 0) {
            mensaje = 'Ingrese la cantidad minima (minimo 0)';
            $scope.$emit('showAlert', mensaje);
            return false;
        }         
        $scope.grabarEdicionPasosReceta();
        //$scope.grabarEdicionPortadaReceta(nombre, cantMinima);
        $scope.finalizarReceta();
    };
    
    $scope.grabarPasoReceta = function() {
        var vTipo = angular.element('#tipoDeReceta').val();
        var vTitulo = angular.element('#Titulo').val();
        var vDescripcion = angular.element('#Descripcion').val();      
        var vCantidad = parseInt(angular.element('#Cantidad').val());
        var vUnidadMedida = angular.element('#unidadDeMedida').val(); 
        //var vAudioPaso = angular.element('#audioReceta').val(); 
        var mensaje = '';
        //console.log("Audio de la receta " + vAudioPaso);
        if (!vTitulo.length) {
            mensaje = 'Ingrese el titulo del paso';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (!vDescripcion.length) {
            mensaje = 'Ingrese la descripcion del paso';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (isNaN(vCantidad) || vCantidad < 0) {
            mensaje = 'Ingrese la cantidad minima (minimo 0)';
            $scope.$emit('showAlert', mensaje);
            return false;
        }
        
        PasosRecetas.setNew($scope.NuevoId, $scope.idPaso, vTipo, vTitulo, vDescripcion, vCantidad, vUnidadMedida, $scope.imagenPaso, $scope.audioReceta, '', '').then(function(){
            //$scope.idPasoAnterior = $scope.idPaso;
            $scope.idPaso++;          
            $scope.reinicioValores();
        });
    };
    
    $scope.EliminarPasosReceta = function(){
        
        $ionicPopup.confirm({
                title: 'Borrar paso de receta',
                cancelText: 'Cancelar',
                template: '<p class="center-text">¿Está seguro de borrar este paso de la receta?</p>'
            }).then(function(res) {
                if(res) {
                    $scope.showLoading();
                    var vIdReceta = $scope.pasosreceta[$scope.pasoActual].idReceta; 
                    var vIdPaso = $scope.pasosreceta[$scope.pasoActual].idPaso;
                    PasosRecetas.DeleteStep(vIdReceta, vIdPaso).then(function(){
                        PasosRecetas.setIdPaso(vIdReceta, vIdPaso).then(function(){
                            $scope.siguientePaso();
                            $scope.hideLoading();
                        });
                    });
                    $scope.goTop();
                }
            });
    };
    
    $scope.AgregarPasosReceta = function(){
        $scope.agregarPaso = 1;
        $scope.MostrarPortada = 0;
        $scope.MostrarPasos = 0;
        $scope.NuevoPaso = 0;
        $scope.reinicioValoresNuevoPaso();
        $scope.goTop();
    };
    
    $scope.cancelarNuevoPasoReceta = function(){
        
        $ionicPopup.confirm({
                title: 'Cancelar nuevo Paso',
                cancelText: 'No',
                okText: 'Sí',
                template: '<p class="center-text">¿Está seguro de cancelar el nuevo paso?</p>'
            }).then(function(res) {
                if(res) {
                    $scope.agregarPaso = 0;
                    $scope.MostrarPortada = 0;
                    $scope.MostrarPasos = 1;
                }
            });               
    };
    
    $scope.grabarNuevoPasoReceta = function(){
        var vIdReceta = $scope.pasosreceta[$scope.pasoActual].idReceta; 
        var vTipo = angular.element('#tipoDeReceta').val();
        var vTitulo = angular.element('#TituloNuevoPaso').val();
        var vDescripcion = angular.element('#DescripcionNuevoPaso').val();      
        var vCantidad = parseInt(angular.element('#CantidadNuevoPaso').val());
        var vUnidadMedida = angular.element('#unidadDeMedidaNuevoPaso').val();   
        //var vAudioPaso = angular.element('#audioRecetaPasoNuevo').val();
        var mensaje = '';
        
        if (!vTitulo.length) {
            mensaje = 'Ingrese el titulo del paso';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (!vDescripcion.length) {
            mensaje = 'Ingrese la descripcion del paso';
            $scope.$emit('showAlert', mensaje);
            return false;
        } else if (isNaN(vCantidad) || vCantidad < 0) {
            mensaje = 'Ingrese la cantidad minima (minimo 0)';
            $scope.$emit('showAlert', mensaje);
            return false;
        }
        
        //$scope.idPasoAnterior = $scope.idPaso;
        $scope.showLoading();
        PasosRecetas.setUpIdPaso(vIdReceta, $scope.NuevoPaso).then(function(){
            PasosRecetas.setNew(vIdReceta, $scope.NuevoPaso, vTipo, vTitulo, vDescripcion, vCantidad, vUnidadMedida, $scope.imagenPasoNuevo, $scope.audioRecetaPasoNuevo, '', '').then(function(){
                $scope.agregarPaso = 0;
                $scope.MostrarPortada = 0;
                $scope.MostrarPasos = 1;
                if($scope.pasoActual === $scope.pasosreceta.length - 1) {
                    $scope.finalizarReceta();
                }else{                        
                    
                    PasosRecetas.get($stateParams.idReceta).then(function(pasos){
                        $scope.pasosreceta = angular.copy(pasos);
                    //$scope.CantidadesDisponibles();
                        $scope.pasoActual = $scope.NuevoPaso;
                    
                //Si el paso es el ultimo, muestro mensaje de felictaciones
                        $scope.infoPaso();
                        $scope.mostrarImagen = 1;
                        $scope.hideLoading();
                    });
                }
            });            
        });
    };
    
    $scope.reinicioValoresNuevoPaso = function(){
        console.log('reinicio valores');
        //$scope.Descripcion ='';
        angular.element('#TituloNuevoPaso').val('');
        angular.element('#DescripcionNuevoPaso').val('');
        angular.element('#CantidadNuevoPaso').val('');
        var vIdPaso = parseInt($scope.pasosreceta[$scope.pasoActual].idPaso);
        $scope.NuevoPaso = vIdPaso + 1;
        //$scope.Titulo ='';
        //$scope.Cantidad = '';
        //$scope.unidadDeMedida = '';
        //$scope.unidadDeMedida = $scope.tiposDeUnidadMedidaArray[0];
        $scope.nombrePaso = 'Nuevo paso ' + $scope.NuevoPaso;
        $scope.imagenPasoNuevo = '';
        $scope.mostrarImagenPasoNuevo = 0;
        $scope.audioRecetaPasoNuevo =  '';
        //angular.element('#imagenPaso').attr("src", "");
    };
    
    $scope.reinicioValores = function(){
        console.log('reinicio valores');
        //$scope.Descripcion ='';
        angular.element('#Titulo').val('');
        angular.element('#Descripcion').val('');
        angular.element('#Cantidad').val('');
        //$scope.Titulo ='';
        //$scope.Cantidad = '';
        //$scope.unidadDeMedida = '';
        $scope.nombrePaso = 'Paso ' + $scope.idPaso;
        angular.element('#unidadDeMedida').val('');
        //$scope.unidadDeMedida = '';// $scope.tiposDeUnidadMedidaArray[0];
        $scope.imagenPaso = '';
        $scope.audioReceta =  '';
        $scope.mostrarImagen = 0;
        //angular.element('#imagenPaso').attr("src", "");
    };
    
    $scope.fileChoose = function() {
        fileChooser.open(function(data){
            //Solo como ejemplo, seteo la imagen directo en el 
            $scope.audioReceta =  data;
			console.log(data);
			console.log("scope: " + $scope.audioReceta);
        });
    };

})

.controller('AccountCtrl', function($scope) { //$scope
    'use strict';
    console.log('loginMaster: ' + $scope.loginMaster);
    
    $scope.logOutAdmin = function() {
        $scope.$emit('AdminLoggedOut', {});
    };
})
.controller('AboutCtrl', function($scope, Files) {
    'use strict';
    $scope.data = {};
    Files.getAboutInfo().then(function(result) {
        $scope.data = result.data;
    }, function(cause) {
        console.error(cause);
    });

})

.directive('onValidSubmit', ['$parse', function($parse) {
'use strict';
return {
  require: '^form',
  restrict: 'A',
  link: function(scope, element, attrs, form) {
    form.$submitted = false;
    var fn = $parse(attrs.onValidSubmit);
    element.on('submit', function(event) {
      scope.$apply(function() {
        element.addClass('ng-submitted');
        form.$submitted = true;
        if (form.$valid) {
          if (typeof fn === 'function') {
            fn(scope, {$event: event});
          }
        }
      });
    });
  }
};
}])
// Revisar y probar para subir los archivos de audio
// Para usar, en el tempalte agregar así:  <input type="file" file-upload />
// y descomentar lo de acá abajo:

/*.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
})*/
.exports = {
    open: function (success, failure) {
        'use strict';
        cordova.exec(success, failure, "FileChooser", "open", []);
    }
}
;
