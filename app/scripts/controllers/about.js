'use strict';

/**
 * @ngdoc function
 * @name digestoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the digestoApp
 */
angular.module('digestoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
