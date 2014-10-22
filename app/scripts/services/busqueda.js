'use strict';

/**
 * @ngdoc service
 * @name digestoApp.Normativa
 * @description
 * # Normativa
 * Service in the digestoApp.
 */


angular.module('digestoApp')
  .factory('ServiciosDeBusqueda', ['$http','$q','ConfiguracionGeneral',function ($http,$q,ConfiguracionGeneral) {
    // AngularJS will instantiate a singleton by calling "new" on this function

        //sugenrecias de busqueda
        //http://sparl-desa.hcdn.gob.ar:8080/exist/rest/db/digesto/sugerencia.xql?query=

        //busqueda por numero de ley
        //http://sparl-desa.hcdn.gob.ar:8080/exist/rest/db/digesto/index-json2.xql?ley=14394

        //busuqeda por frase
        //http://sparl-desa.hcdn.gob.ar:8080/exist/rest/db/digesto/index-json2.xql?query=14394

    	var method  =  {
    		normaPorNumero      : function (params) { return 'index-json2.xql?ley='   + params ; },
    		sugerenciasBusqueda : function (params) { return '/sugerencia.xql?query=' + params ; },
    		normaPorQuery       : function (params) { return 'index-json2.xql?query=' + params ; }
    	};

        return  {
            getNormaPorNumero:function(numero){
                var deferred = $q.defer();

                return $http.get(ConfiguracionGeneral.getUrl('existdb','desarrollo')+method['normaPorNumero'](numero) ).then(function(response){
                
                    if (response.status === 200){ deferred.resolve(response.data); } 
                    else  {  deferred.reject({ 'errorMsg': 'getNormaPorNumero fail '  });  }
                    return deferred.promise;
                });
            },
            getSugerenciasBusqueda:function(query){
                var deferred = $q.defer();
                
                return $http.get(ConfiguracionGeneral.getUrl('existdb','desarrollo')+method['sugerenciasBusqueda'](query)).then(function(response){
                
                    if (response.status === 200){ deferred.resolve(response.data); } 
                    else  {  deferred.reject({ 'errorMsg': 'getSugerenciasBusqueda fail '  });  }
                    return deferred.promise;
                });
            },
            getNormaPorQuery:function(query){
                var deferred = $q.defer();
                
                return $http.get(ConfiguracionGeneral.getUrl('existdb','desarrollo')+method['normaPorQuery'](query)).then(function(response){
                
                    if (response.status === 200){ deferred.resolve(response.data); } 
                    else  {  deferred.reject({ 'errorMsg': 'getNormaPorQuery fail '  });  }
                    return deferred.promise;
                });
            }
        } ;
   s



  }]);