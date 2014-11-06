'use strict';

describe('Service: Filtro', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var Filtro;
  beforeEach(inject(function (_Filtro_) {
    Filtro = _Filtro_;
  }));

  it('should do something', function () {
    expect(!!Filtro).toBe(true);
  });

});
