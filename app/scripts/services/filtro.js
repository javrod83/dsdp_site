'use strict';

/**
 * @ngdoc service
 * @name angularApp.Filtro
 * @description
 * # Filtro
 * Factory in the angularApp.
 */
angular.module('digestoApp')
  .factory('Filtro', function () {
    
    //filtro
     var unFiltro =  {
        "nombre":"categoria es ",
        "valor":"AER",
        "accion" : function (elemento){
          elemento.nombre.
        }
      }

    var filtros = [] ; 



    // Public API here
    return {
      limpiar: function () {
        filtros = [] ; 
      },
      agregar: function (filtro) {
        if (!actualizarFiltro(filtro))
          filtros.push(filtro);

      },
      eliminarFiltro:function(id){

      },
      listarFiltros : function(){},
      usarEn:function(listaItems){}
    };

  });
