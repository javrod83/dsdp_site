'use strict';

/**
 * @ngdoc function
 * @name digestoApp.controller:NormativactrlCtrl
 * @description
 * # NormativactrlCtrl
 * Controller of the digestoApp
 */
angular.module('digestoApp')
  .controller('NormativaCtrl',['$scope','ServiciosDeBusqueda','OrigenDatos','FilterManager',function($scope,ServiciosDeBusqueda,OrigenDatos,FilterManager) {

      var resultsPerPage = 10   ; 
      var paginas             = []   ;
      
      $scope.resultadosTotales   =    '' ;
      $scope.textoBusqueda       =    '' ; 
      $scope.ultimoTextoBusqueda =    '' ;
      $scope.sugerencias         =   [ ] ;
      $scope.respuestas          =   [ ] ;
      $scope.numeroDePaginas     =   [ ] ; 
      $scope.preloader           = false ; 
      $scope.showResult          = false ;


      //filtros ! 
      $scope.categories      = [] ;
      $scope.categoriasCampo  = '' ;
      $scope.topics           = [] ;
      $scope.dates           = [] ;
      $scope.currentSinceDate = 0 ;
      $scope.currentUntilDate = 0;
      $scope.activeFilters   = FilterManager.filter; 

      buscarDiccionarios();



    $scope.addCategoryFilter = function (){
      //console.log('agregarfiltroCategoria llamado')
      //$scope.activeFilters.push($scope.currentCategory);
          FilterManager.add ({
            'name'  : $scope.currentCategory.name,
            'value' : $scope.currentCategory.value,
            action  : function (element){ return element[this.field] === this.value ;  }
          });
    };

    $scope.agregarfiltroTema = function (){
     // console.log('agregarfiltroTema llamado')
     // $scope.activeFilters.push($scope.temaActual);
    };


    function getDateBetween(sinceDate,UntilDate){
      console.log("filter Between")
      return {
              'name'  : 'Entre '+sinceDate+" y "+UntilDate,
              'value' : 'DateFilter',
              action  : function (element){ return element.FechaSanc.anio >= this.value ;  }
            };
    }
    function getDateIsOlderThan(date){
      console.log("filter date older than ")
      return {
              'name'  : 'Desde '+date,
              'value' : 'DateFilter',
              action  : function (element){ return element.FechaSanc.anio >= date ;  }
            };
    }
    function getDateIsEarlier(date){
      console.log("filter date earlier than")
      return {
              'name'  : 'Hasta '+date,
              'value' : 'DateFilter',
              action  : function (element){ return element.FechaSanc.anio >= date ;  }
            };
    }

    $scope.checkDateFilter = function()
      {
        console.log('Desde: '+$scope.currentSinceDate+' Hasta'+ $scope.currentUntilDate);
        
       // $scope.activeFilters.push($scope.currentCategory);

        //si los campos son null o 0 
          //borrar filtro de la lita 
          //si lo

          if (($scope.currentSinceDate === 0 && $scope.currentUntilDate === 0) || ($scope.currentSinceDate === null && $scope.currentUntilDate === null) ) 
              {
                  FilterManager.delete("DateFilter");  
              }
          else if(  ($scope.currentSinceDate !== 0 && $scope.currentUntilDate !== 0 ) && ($scope.currentSinceDate !== null && $scope.currentUntilDate !== null )  )
              {
                FilterManager.add(getDateBetween($scope.currentSinceDate,$scope.currentUntilDate))
              }
          else if ($scope.currentSinceDate !== 0 && $scope.currentSinceDate !== null )
              {
                FilterManager.add(getDateIsOlderThan($scope.currentSinceDate));
              }
          else
              { 
                FilterManager.add(getDateIsEarlier($scope.currentUntilDate));
              }
              
    


      };

      $scope.deleteFilter = function (filterValue){


          console.log("Delete filter: ");
          console.log(filterValue);
          FilterManager.delete(filterValue);  
         if (filterValue == 'DateFilter')
         {
            $scope.currentSinceDate = '' ;
            $scope.currentUntilDate = '' ;
         }

        
      }

    $scope.mostrarPagina = function (numeroDePagina)
      {
        log('mostrarPagina','change to page '+numeroDePagina);
        $scope.respuestas = $scope.pages[numeroDePagina]; 
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
          $scope.ultimoTextoBusqueda = $scope.textoBusqueda;
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
                    var results =  data[0].Norma;
                    renameTextProperties(results);
                    $scope.resultadosTotales = results.length ; 
                    paginate(results);
                    
                }
            else
                {
                  // mostrar mensaje de que no hay resultados 
                }      
        }

   function paginate(results)
    {
        //paginar resultados ? ? 
        if (results.length > resultsPerPage)
            {
                $scope.pages         = [] ; 
                $scope.numeroDePaginas = [] ; 

                var cotaMenor = 0 ; 
                var cotaMayor = 0 ; 

                for (var i = 1; i < (Math.ceil(results.length/resultsPerPage)); i++)
                    {
                        cotaMenor = ( i - 1 ) * resultsPerPage ; 
                        cotaMayor =   Math.min(( cotaMenor + (resultsPerPage - 1 ) ),results.length-1)    ; 
                        $scope.pages[i]=results.slice(cotaMenor,cotaMayor) ;
                        $scope.numeroDePaginas.push(i);
                    }

                $scope.respuestas =  $scope.pages[1];
            }
        else
            { $scope.respuestas = results; }

        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
    }

    function buscarDiccionarios()
      {
          OrigenDatos.getDiccionarioCategorias().then(function(data){
             if (data.categories !== undefined)
                {
                  $scope.categories      = data.categories;
                  $scope.categoriasCampo = data.field ; 
                }
          },function(err){});

          $scope.topics = OrigenDatos.getDiccionarioTemas().then(function(data){
             if (data.topics !== undefined)
                {
                  $scope.topics = data.topics;
                }

          },function(err){});

          $scope.dates = OrigenDatos.getFechasSancion().then(function(data){
             if (data.dates !== undefined)
                {
                  $scope.dates = data.dates;
                }

          },function(err){});
      }

    function log(method,msg)
      {
        console.log('[NormativaCtrl]: '+method+' : '+msg);
      }

    function renameTextProperties(resultados )
      {
          //modificar el atributo #texto por texto 
          $(resultados).each(function(indice,elemento){
            elemento.texto = elemento['#texto'];
            delete elemento['#texto'];
          });
      }

  }]);
