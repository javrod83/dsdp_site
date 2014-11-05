'use strict';

describe('Service: OrigenDatos', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var OrigenDatos;
  beforeEach(inject(function (_OrigenDatos_) {
    OrigenDatos = _OrigenDatos_;
  }));

  it('should do something', function () {
    expect(!!OrigenDatos).toBe(true);
  });

});
