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
        "nombre":"categoria contiene ",
        "valor":"AER",
        "accion" : function (elemento){
        }
      }

    var filtros = [] ; 

    function actualizarFiltro(filtro)
      {
        //si el filtro existe
            //pisar filtro
            //return  true;
        //sino
            // return false;
      }

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
