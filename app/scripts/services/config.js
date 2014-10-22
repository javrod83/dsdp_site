'use strict';

/**
 * @ngdoc service
 * @name angularApp.ConfiguracionGeneral
 * @description
 * # ConfiguracionGeneral
 * Factory in the angularApp.
 */
angular.module('digestoApp')
  .factory('ConfiguracionGeneral', function () {
    // Service logic
    // ...
    var data = {
      existdb :{
        url: {
            development : 'http://sparl-desa.hcdn.gob.ar:8080/exist/rest/db/digesto' ,
            production : 'http://sparl-desa.hcdn.gob.ar:8080/exist/rest/db/digesto'
        }
      }
    };

    // Public API here
    return {
      getUrl: function (server,profile)
        {return (data[server] === undefined)?undefined:((profile === undefined && data[server].url[profile])?data[server].production:data[server].url[profile]);}
    };

});