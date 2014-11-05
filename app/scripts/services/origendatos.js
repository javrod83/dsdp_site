'use strict';

/**
 * @ngdoc service
 * @name angularApp.OrigenDatos
 * @description
 * # OrigenDatos
 * Factory in the angularApp.
 */
angular.module('digestoApp')
  .factory('OrigenDatos',['$http','$q','ConfiguracionGeneral',function ($http,$q,ConfiguracionGeneral){
    // Service logic

    
    

    // Public API here
    return {
        getDiccionarioCategorias : function (){
                var deferred = $q.defer();

                return $http.get(ConfiguracionGeneral.getUrl('datos','desarrollo')+ConfiguracionGeneral.getNombreArchivo('categorias') ).then(function(response){
                  console.log("Y AHORA ?");
                    if (response.status === 200){ deferred.resolve(response.data); } 
                    else  {  deferred.reject({ 'errorMsg': 'getDiccionarioCategorias fail'  });  }
                    return deferred.promise;
                });
        },
        getDiccionarioTemas : function (){
                var deferred = $q.defer();

                return $http.get(ConfiguracionGeneral.getUrl('datos','desarrollo')+ConfiguracionGeneral.getNombreArchivo('temas') ).then(function(response){    
                    if (response.status === 200){ deferred.resolve(response.data); } 
                    else  {  deferred.reject({ 'errorMsg': 'getDiccionarioCategorias fail'  });  }
                    return deferred.promise;
                });
        },
        getFechasSancion : function (){
                var deferred = $q.defer();
                return $http.get(ConfiguracionGeneral.getUrl('datos','desarrollo')+ConfiguracionGeneral.getNombreArchivo('fechas') ).then(function(response){    
                    if (response.status === 200){ deferred.resolve(response.data); } 
                    else  {  deferred.reject({ 'errorMsg': 'getDiccionarioCategorias fail'  });  }
                    return deferred.promise;
                });
        }

      };
  
  }]);
