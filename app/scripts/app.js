'use strict';

/**
 * @ngdoc overview
 * @name digestoApp
 * @description
 * # digestoApp
 *
 * Main module of the application.
 */
angular
  .module('digestoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider)  {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('land', {
      url: '/',
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
    }).state('ley', {
      url: '/ley',
      templateUrl: 'views/ley.html',
      controller: 'LeyCtrl'
    }).state('consultas', {
      url: '/consultas',
      templateUrl: 'views/consultas.html',
      controller: 'ConsultasCtrl'
    }).state('normativa', {
      url: '/normativa',
      templateUrl: 'views/normativa.html',
      controller: 'NormativaCtrl'
    }).state('buscar', {
      url: '/buscar',
      templateUrl: 'views/buscar.html',
      controller: 'BuscarCtrl'
    }).state('legislacion', {
      url: '/legislacion',
      templateUrl: 'views/legislacion.html',
      controller: 'LegislacionCtrl'
    });


  });




