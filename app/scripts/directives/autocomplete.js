'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:autocomplete
 * @description
 * # autocomplete
 */
angular.module('digestoApp')
  .directive('autocomplete',['ServiciosDeBusqueda', function (ServiciosDeBusqueda) {
    return {
      templateUrl: 'partials/autocomplete.html',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {

        //element.text('this is the autocomplete directive');

        console.log(scope);
        //bind evento de modificacion del campo
        element.bind('keyup',function (event){
        	

        	if (event.target.value.length >= 2)
        		{
		        	if(event.which === 13)
			        	{
			        		event.preventDefault();
			                scope.buscar();
			            }
			        else
			        	{
			        		scope.buscarSugerencias()
			        	}
        		}
        	



        });


      }
    };
  }]);
