'use strict';

describe('Service: Consultas', function () {

  // load the service's module
  beforeEach(module('digestoApp'));

  // instantiate service
  var Consultas;
  beforeEach(inject(function (_Consultas_) {
    Consultas = _Consultas_;
  }));

  it('should do something', function () {
    expect(!!Consultas).toBe(true);
  });

});
