'use strict';

describe('Service: Normativa', function () {

  // load the service's module
  beforeEach(module('digestoApp'));

  // instantiate service
  var Normativa;
  beforeEach(inject(function (_Normativa_) {
    Normativa = _Normativa_;
  }));

  it('should do something', function () {
    expect(!!Normativa).toBe(true);
  });

});
