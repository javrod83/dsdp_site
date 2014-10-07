'use strict';

describe('Controller: IndiceCtrl', function () {

  // load the controller's module
  beforeEach(module('digestoApp'));

  var IndiceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndiceCtrl = $controller('IndiceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
