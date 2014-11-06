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
      },
      datos :{
        url: {
            desarrollo : 'datos/' ,
            produccion : 'datos/'
        }
      },

    };

    var archivos = {
      "categorias" : "categorias.json",
      "temas"      : "temas.json",
      "fechas"     : "fechasSancion.json",

    }

    // Public API here
    return {
      getUrl: function (server,profile){
          console.log('ConfiguracionGeneral getUrl');
          console.log(data[server] === undefined)?undefined:((profile === undefined && data[server].url[profile])?data[server].production:data[server].url[profile]);


          return (data[server] === undefined)?undefined:((profile === undefined && data[server].url[profile])?data[server].production:data[server].url[profile]);
      },
      getNombreArchivo: function (identificador){
          return  (archivos[identificador] === undefined)?undefined: archivos[identificador] ;
      }
    };

});