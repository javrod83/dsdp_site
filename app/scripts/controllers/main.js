'use strict';

/**
 * @ngdoc function
 * @name digestoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the digestoApp
 */
angular.module('digestoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
