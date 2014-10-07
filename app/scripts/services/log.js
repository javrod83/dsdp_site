'use strict';

/**
 * @ngdoc service
 * @name digestoApp.log
 * @description
 * # log
 * Factory in the digestoApp.
 */
angular.module('digestoApp')
  .factory('log', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
