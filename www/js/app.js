angular.module('app', ['ionic','ngCordova','app.controllers', 'app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

 .state('tab.listaDeDesafios', {
    url: '/lista',
    views: {
      'tab-lista': {
        templateUrl: 'templates/listaDeDesafios.html',
        controller: 'listaDeDesafiosCtrl'
      }
    }
  }) 
  .state('tab.autor', {
    url: '/autor',
    views: {
      'tab-autor': {
        templateUrl: 'templates/autor.html',
        controller: 'autorCtrl'
      }
    }
  })
  .state('detallesDesafio', {
    url: 'desafio/:desId:backState',
    templateUrl: 'templates/detallesDesafio.html',
    controller: 'detallesDesafioCtrl' 
  })
  .state('tab.perfilLoginRegister', {
    url: '/perfil',
    views: {
      'tabs-perfil': {
        templateUrl: 'templates/perfilLoginRegister.html',
        controller: 'perfilLoginRegisterCtrl'
      }
    }
  })
  .state('tab.crearDesafio', {
    url: '/crear',
    views: {
      'tabs-crearDes': {
        templateUrl: 'templates/crearDesafio.html',
        controller: 'crearDesafioCtrl'
      }
    }
  })
 .state('tab.desafiosAceptados', {
    url: '/aceptados',
    views: {
      'tab-desAcep': {
        templateUrl: 'templates/desafiosAceptados.html',
        controller: 'desafiosAceptadosCtrl'
      }
    }
  })
  .state('tab', {
    url: '/tab',    
    templateUrl: 'templates/tabs.html',
    controller: 'tabsCtrl',
    abstract: true
  })

  $urlRouterProvider.otherwise('/tab/perfil');
});
