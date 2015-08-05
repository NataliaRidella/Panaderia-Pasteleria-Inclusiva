angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform, $rootScope, Storage, $ionicLoading, $ionicPopup, $state, Friends) {
    'use strict';
    var config = {};
    config.environment = 'p';
    config.isProduction = (config.environment === 'p');
    // Con esta linea comentada, deshabilitamos el sonido para toda la app
    config.appSound = true; // Por default el sonido está activado
    config.adminID = 1;
    config.guestID = 2;
    $rootScope.currentUser = {};
    $rootScope.config = config;
    $rootScope.config.maxCantidadIntentosPW = 3;
    $rootScope.config.maxLargoPW = 8;
    
    $rootScope.adminLoggedIn = false;
    $rootScope.loginMaster = false;
    
    $rootScope.showLoading = function() {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html'
        });
    };
    $rootScope.hideLoading = function(){
        $ionicLoading.hide();
    };
        //Funciones accesibles de toda la app
    $rootScope.reload = function() {
        $state.go($state.current, {}, {reload: true});
    };
    
    $rootScope.showAlert = function(mensaje) {
        $ionicPopup.alert({
            title: '¡Atención!',
            content: mensaje
        });
    };
    
        // Defino que debe hacer al lanzarse el evento AdminLoggedIn
    $rootScope.$on('AdminLoggedIn', function(event, unfoundState) { //fromState, fromParams
        $rootScope.utils.logEvent(event, 'Login Master: ' + unfoundState.loginMaster);
        /*$rootScope.currentUser = Friends.get($rootScope.config.adminID);*/
        Friends.get($rootScope.config.adminID).then(function(friend){
            $rootScope.currentUser = (friend.length ? angular.copy(friend[0]) : {});
        });
        $rootScope.adminLoggedIn = true;
        $rootScope.loginMaster = unfoundState.loginMaster;
        $state.go('tab.account', {'loginMaster': unfoundState.loginMaster});
    });

    $rootScope.$on('AdminLoggedOut', function() { //event, unfoundState, fromState, fromParams
        /*$rootScope.currentUser = Friends.get($rootScope.config.guestID);*/
        Friends.get($rootScope.config.guestID).then(function(friend){
            $rootScope.currentUser = (friend.length ? angular.copy(friend[0]) : {});
        });
        $rootScope.adminLoggedIn = false;
        $rootScope.loginMaster = false;
    });
    
    // Consumidores de eventos generales
    $rootScope.$on('showAlert', function(event, mensaje) {
        $rootScope.utils.logEvent(event, mensaje);
        $rootScope.showAlert(mensaje);
    });
    
    $rootScope.salir = function() {
        $rootScope.$emit('Exit', {});
        return false;
    };
    
    $ionicPlatform.registerBackButtonAction(function(){ 
        console.log('tiro boton atras');
    }, 100);
    
    $rootScope.toggleSound = function() {
        $rootScope.config.appSound = !$rootScope.config.appSound;
        console.log('Sonido: ' + ($rootScope.config.appSound?'activado':'inactivo'));
        $rootScope.$broadcast('SoundMute', {});
    };

    $rootScope.$on('Exit', function(event) {
        $ionicPopup.confirm({
            title: 'Salir de la aplicación',
            template: '¿Está seguro que desea salir?'
        }).then(function(res) {
            if(res) {
                $rootScope.showLoading();
                //Chequear estado de receta antes de salir
                ionic.Platform.exitApp();
                //Si el exitApp falla por algo, se esconde el loading
                $rootScope.hideLoading();
            } else {
                $rootScope.utils.logEvent(event);
            }
        });
    });
    //
    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        
        Storage.inicializar(false);
        Friends.get($rootScope.config.guestID).then(function(friend) {
            $rootScope.currentUser = (friend.length ? angular.copy(friend[0]) : {});
        },
        function(cause) {
            console.log(cause);
        });
        $rootScope.utils = {};
        
        $rootScope.utils.getById = function(id) {
            return (document.getElementById(id));
        };
        
        $rootScope.utils.logEvent = function(event, extras) {
            if (!extras) {
                extras = '';
            }
            if ($rootScope.config.environment !== 'p') {
                if (extras !== '') {
                    extras = ' - ' + extras;
                }
                var mensaje = 'Evento consumido: ' + event.name + extras;
                console.log(mensaje);
            }
        };
        
        $rootScope.$on('$stateChangeStart', function(event){
            $rootScope.utils.logEvent(event);
        });
        
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  'use strict';
  $stateProvider

    // setup an abstract state for the tabs directive
  .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

  .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
  .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })
  
  .state('tab.modalidad', {
      url: '/modalidad',
      views: {
        'modalidad': {
          templateUrl: 'templates/modalidad.html',
          controller: 'ModalidadCtrl'
        }
      }
    })
  
  .state('tab.seleccionRecetas', {
      url: '/seleccionRecetas/:type',
      views: {
        'seleccionRecetas': {
          templateUrl: 'templates/seleccionRecetas.html',
          controller: 'ListaRecetaCtrl'
        }
      }
    })
  .state('tab.receta', {
      url: '/receta/:idReceta',
      views: {
        'receta': {
          templateUrl: 'templates/receta.html',
          controller: 'RecetaCtrl'
        }
      }
    })
  .state('tab.account', {
      url: '/account/:loginMaster',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
  .state('tab.estadisticas', {
      url: '/estadisticas',
      views: {
        'estadisticas': {
          templateUrl: 'templates/estadisticas.html',
          controller: 'EstadisticasCtrl'
        }
      }
    })
  .state('tab.datos', {
      url: '/datos',
      views: {
        'datos': {
          templateUrl: 'templates/datos.html',
          controller: 'DatosCtrl'
        }
      }
    })
  .state('tab.editarReceta', {
      url: '/editarReceta',
      views: {
        'datos': {
          templateUrl: 'templates/editarReceta.html',
          controller: 'edicionReceta'
        }
      }
    })
  .state('tab.editarPasosReceta', {
      url: '/editarPasosReceta/:modo/:idReceta',
      views: {
        'datos': {
          templateUrl: 'templates/editarPasosReceta.html',
          controller: 'editarPasosReceta'
        }
      }
    })
    .state('tab.download', {
      url: '/download',
      views: {
        'download': {
          templateUrl: 'templates/download.html',
          controller: 'DownloadCtrl'
        }
      }
    })
    .state('tab.about', {
      url: '/about',
      views: {
        'about': {
          templateUrl: 'templates/about.html',
          controller: 'AboutCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

/*.constant('$ionicLoadingConfig', {
  template: 'Default Loading Template...'
});*/