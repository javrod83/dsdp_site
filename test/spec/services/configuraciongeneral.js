'use strict';

describe('Service: ConfiguracionGeneral', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var ConfiguracionGeneral;
  beforeEach(inject(function (_ConfiguracionGeneral_) {
    ConfiguracionGeneral = _ConfiguracionGeneral_;
  }));

  it('should do something', function () {
    expect(!!ConfiguracionGeneral).toBe(true);
  });

});
