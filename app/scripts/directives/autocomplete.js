'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:autocomplete
 * @description
 * # autocomplete
 */
angular.module('angularApp')
  .directive('autocomplete', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the autocomplete directive');
      }
    };
  });
