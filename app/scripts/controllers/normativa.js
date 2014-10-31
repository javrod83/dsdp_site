'use strict';

/**
 * @ngdoc function
 * @name digestoApp.controller:NormativactrlCtrl
 * @description
 * # NormativactrlCtrl
 * Controller of the digestoApp
 */
angular.module('digestoApp')
  .controller('NormativaCtrl',['$scope','ServiciosDeBusqueda',function ($scope,ServiciosDeBusqueda) {

      var resultadosPorPagina = 10   ; 
      var paginas             = []   ;
      
      $scope.resultadosTotales   =    '' ;
      $scope.textoBusqueda       =    '' ; 
      $scope.sugerencias         =   [ ] ;
      $scope.respuestas          =   [ ] ;
      $scope.numeroDePaginas     =   [ ] ; 
      $scope.preloader           = false ; 
      $scope.showResult          = false ;


    function log(method,msg)
      {
        console.log('[NormativaCtrl]: '+method+' : '+msg);
      }

    function renombrarPropiedadTexto(resultados )
      {
          //modificar el atributo #texto por texto 
          $(resultados).each(function(indice,elemento){
            elemento.texto = elemento['#texto'];
            delete elemento['#texto'];
          });
      }

    $scope.mostrarPagina = function (numeroDePagina)
      {
        log('mostrarPagina','change to page '+numeroDePagina);
        $scope.respuestas = $scope.paginas[numeroDePagina]; 
      };
    
    $scope.buscarSugerencias = function ()
      {
        log('buscarSugerencias','buscando sugerencias'); 
        $scope.sugerencias = ['buscando sugerencias ... '];
        ServiciosDeBusqueda.getSugerenciasBusqueda($scope.textoBusqueda).then(function(data){
            log('buscarSugerencias','nuevas sugerencias '); 
            if (data.length !== 0 )
                {     
                  $scope.sugerencias = data.hit;   
                }
            else
                {      $scope.sugerencias = ['ninguna sugerencia disponible '];        }
          
        },function(err){
          //eror en la bsuqueda
          $scope.preloader = false;
          $scope.sugerencias = ['ocurrio un error ,intente nuevamente en unos momentos '];  
          log('buscarSugerencias','error al buscar  sugerencias '); 
        });
      };

    $scope.sugerenciaSeleccionada = function(sugerencia)
      {
          log('sugerenciaSeleccionada','iniciando'); 
          $scope.textoBusqueda = sugerencia ;
          $scope.buscar() ; 
      }; 

    $scope.buscar = function()
    	{
          log('buscar','buscando '+$scope.textoBusqueda); 
      		$scope.preloader = true;
          $scope.sugerencias = [] ; 
          $scope.resultadosTotales = '' ; 

      		ServiciosDeBusqueda.getNormaPorQuery($scope.textoBusqueda).then(function(data){
      		    //busqueda exitosa 
        			$scope.preloader = false;
              procesarResultados(data) ; 
              //log('buscar','se encontraron '+$scope.respuestas.length); 
      		},function(err){
      			//eror en la bsuqueda
      			$scope.preloader = false;
      		});
    	}; 

    function procesarResultados ( data )
        {
            //detener loader 
            $scope.showResult = true ;
            if(data.length !== 0 )
                {
                    var resultados = data[0].Norma;
                    renombrarPropiedadTexto(resultados);
                    $scope.resultadosTotales = resultados.length ; 

                    //paginar resultados ? ? 
                    if (resultados.length > resultadosPorPagina)
                        {
                            $scope.paginas         = [] ; 
                            $scope.numeroDePaginas = [] ; 

                            var cotaMenor = 0 ; 
                            var cotaMayor = 0 ; 

                            for (var i = 1; i < (Math.ceil(resultados.length/resultadosPorPagina)); i++)
                                {
                                    cotaMenor = ( i - 1 ) * resultadosPorPagina ; 
                                    cotaMayor =   Math.min(( cotaMenor + (resultadosPorPagina - 1 ) ),resultados.length-1)    ; 
                                    $scope.paginas[i]=resultados.slice(cotaMenor,cotaMayor) ;
                                    $scope.numeroDePaginas.push(i);
                                }

                            $scope.respuestas =  $scope.paginas[1];
                        }
                    else
                        {
                            $scope.respuestas = resultados;
                        }
                }
            else
                {
                  // mostrar mensaje de que no hay resultados 
                }      
        }
  }]);
