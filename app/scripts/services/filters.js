'use strict';

/**
 * @ngdoc service
 * @name angularApp.Filtro
 * @description
 * # Filtro
 * Factory in the angularApp.
 */
angular.module('digestoApp')
  .factory('FilterManager', function () {
    
    //filtro
    // var aFilterExample =  {
    //    'name' : 'categoria contiene ',
    //    'value'  : 'AER',
    //    'id'     : 'someID',
    //    'action' : function (element){ return true ;  }
    //  };

    var filter = [] ; 

    function passFilters(item){
        var passed = true ; 
        var i = 0 ;

        while (i < filter.length && passed )
          {
              passed = filter[i].action(item); 
              i++ ; 
          }

        return passed ; 
    }



    // Public API here
    return {
      clear: function () {
          filter = [] ; 
      },
      add: function (newFilter) {
          filter[newFilter.name] = newFilter ;
      },
      delete:function(filterName){
        delete filter[filterName];
      },
      listFilters : function(){
        return filter;
      },
      apply:function(items){
        var output = [] ; 

        items.forEach(function(item){
          if (passFilters(item))
            {
                output.push(item);    
            }
          
        });

        return output; 
      },
      filter:filter
    };

  });
