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

      function log(method,msg)
        {
          console.log('[NormativaCtrl]: '+method+' : '+msg);
        }


      $scope.textoBusqueda = '' ; 
      $scope.preloader     = false;
      $scope.sugerencias   = [];
      $scope.respuestas    = [];
      $scope.showResult    = false
      $scope.paginas       = [ 1,2,3,4,5 ] ; 


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

    $scope.sugerenciaSeleccionada = function(sugerencia){
        log('sugerenciaSeleccionada','iniciando'); 
        $scope.textoBusqueda = sugerencia ;
        $scope.buscar() ; 
    }; 

  $scope.buscar = function()
  	{
        log('buscar','buscando '+$scope.textoBusqueda); 
    		$scope.preloader = true;
        $scope.sugerencias = [] ; 
    		ServiciosDeBusqueda.getNormaPorQuery($scope.textoBusqueda).then(function(data){
    			//busqueda exitosa 

    			$scope.preloader = false;
          $scope.showResult = true ;
          if(data.length !== 0 )
            {
              $scope.respuestas = cleanResultados(data[0].Norma) ; 
            }
          else
            {
            }

            log('buscar','se encontraron '+$scope.respuestas.length); 
    		},function(err){
    			//eror en la bsuqueda
    			$scope.preloader = false;

    		});

  	}; 


    function cleanResultados ( resultados )
    {
      $(resultados).each(function(indice,elemento){
        elemento.texto = elemento['#texto'];
        delete elemento['#texto'];
      });

      return  resultados      
    }

  }]);
