'use strict';

/**
 * @ngdoc function
 * @name digestoApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the digestoApp
 */
angular.module('digestoApp')
  .controller('LandingCtrl',['$scope' ,function ($scope) {

  		console.log('Landing controller');
  		$scope.variable = 'value';
  }]);

  