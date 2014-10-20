'use strict';

/**
 * @ngdoc service
 * @name digestoApp.Normativa
 * @description
 * # Normativa
 * Service in the digestoApp.
 */
angular.module('digestoApp')
  .factory('ServiciosdeBusqueda', ['$http','$q','config',function ($http,$q,config) {
    // AngularJS will instantiate a singleton by calling "new" on this function


    	var method : {
    		normaPorNumero : function (params){

    			return '/norma.xql?numero=' + params ; 
    		},
    		sugerenciasBusqueda : function (params){

    			return '/sugerencia.xql?query=' + params ; 
    		},
    		normaPorQuery : function (params){

    			return '/normas.xql?query=' + params ; 
    		}
    	}


    	return {
    		getNormaPorNumero:function(numero){
    			var deferred = $q.defer();

    			return $http.get(config.getUrl('existdb','desarrollo')+method['normaPorNumero'](numero) ).then(function(response){
 				
	 				if (response.status === 200){ deferred.resolve(response.data); } 
	                else  {  deferred.reject({ 'errorMsg': 'getNormaPorNumero fail '  });  }
	                return deferred.promise;
    			});
    		},
    		getSugerenciasBusqueda:function(query){
				var deferred = $q.defer();
    			
    			return $http.get(config.getUrl('existdb','desarrollo')+method['sugerenciasBusqueda'](query)).then(function(response){
 				
	 				if (response.status === 200){ deferred.resolve(response.data); } 
	                else  {  deferred.reject({ 'errorMsg': 'getSugerenciasBusqueda fail '  });  }
	                return deferred.promise;
    			});
    		},
    		getNormaPorQuery:function(query){
				var deferred = $q.defer();
    			
    			return $http.get(config.getUrl('existdb','desarrollo')method['normaPorQuery'](query)).then(function(response){
 				
	 				if (response.status === 200){ deferred.resolve(response.data); } 
	                else  {  deferred.reject({ 'errorMsg': 'getNormaPorQuery fail '  });  }
	                return deferred.promise;
    			});
    		}
    	};



  }]);



/*
        vote : function(id) {
            var deferred = $q.defer();
            var url      = FarmServices.config.urls.vote;
            var uid      = localStorage.uid;
            var token    = localStorage.token;
            var vid      = FarmServices.status.current.frame.data.vid;

            Collection._saveVote(vid);

            //http://vote.farm.scrnz.com/v?u=<UID>&t=<TOKEN>&vi=<VID>&v=<SELECTION>
            return $http.get(url+'u='+uid+'&t='+token+'&vi='+vid+'&v='+id).then(function(response) {
            //return $http.post(url+'u='+uid+'&t='+token+'&vi='+vid+'&v='+id,{}).then(function(response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject({
                        'errorMsg': 'vote unsuccessfull ! '
                    });
                }
                return deferred.promise;
            });
*/