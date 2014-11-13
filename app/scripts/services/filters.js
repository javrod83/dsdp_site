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
    var key    = [] ; 

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
          key    = [] ; 
      },
      add: function (newFilter) {
          console.log("Filter manager add: ");
          console.log(newFilter);
          if ( key[newFilter.value]  === undefined)
            key[newFilter.value] =( filter.push(newFilter) -1 );
          else
            filter[key[newFilter.value]] = newFilter ; 
      },
      delete:function(filterValue){
          console.log("Delete filter: ");
          console.log(filterValue);
        console.log(key[filterValue]);


        filter.splice(key[filterValue],1);
        delete key[filterValue];
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
