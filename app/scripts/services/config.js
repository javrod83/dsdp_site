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
            desarrollo : 'http://sparl-desa.hcdn.gob.ar:8080/exist/rest/db/digesto' ,
            produccion : 'http://sparl-desa.hcdn.gob.ar:8080/exist/rest/db/digesto'
        }
      }
    };

    // Public API here
    return {
      getUrl: function (server,profile)
        {
          console.log('ConfiguracionGeneral getUrl');
          console.log(data[server] === undefined)?undefined:((profile === undefined && data[server].url[profile])?data[server].production:data[server].url[profile]);


          return (data[server] === undefined)?undefined:((profile === undefined && data[server].url[profile])?data[server].production:data[server].url[profile]);
        }
    };

});