'use strict';

describe('Controller: NormativactrlCtrl', function () {

  // load the controller's module
  beforeEach(module('digestoApp'));

  var NormativactrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NormativactrlCtrl = $controller('NormativactrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
