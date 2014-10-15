'use strict';

/**
 * @ngdoc function
 * @name digestoApp.controller:NormativactrlCtrl
 * @description
 * # NormativactrlCtrl
 * Controller of the digestoApp
 */
angular.module('digestoApp')
  .controller('NormativaCtrl', function ($scope) {



     var state = "indice"  ;  // estados  "test" ,'indice' y "mock"

    var url = {
        mock : "http://dsdp.hcdn.gob.ar/digesto/json.txt",
        test : "http://sparl-desa.hcdn.gob.ar:8080/exist/rest/digesto/index-json.xql",
      indice : "http://dsdp.hcdn.gob.ar/digesto/indice.txt",

    };


    var vocales = {
        a : '[aàáâãå]',
        e : '[eèéêë]',
        i : '[iìíîï]',
        o : '[oòóôö]',
        u : '[uùúûü]'
    }

    function replaceAll(str,find, replace) {
          return str.replace(new RegExp(find, 'g'), replace);
        }

    function getRegex(str)
        {
            var out = str ;
            for(var index in vocales) 
                {
                    out = replaceAll(out,index,vocales[index]);
                      
                }
                 
            return out ;
        }





  });
