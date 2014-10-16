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



    $scope.resultado = "NOTHING TO SHOW YET ";
    var xhttp = '' ;
    
        function loadXMLDoc(filename)
            {
                
                if (window.ActiveXObject)
                    {
                        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
                    }
                else 
                    {
                        xhttp = new XMLHttpRequest();
                    }

                xhttp.open("GET", filename, false);
                try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
                xhttp.send("");
                return xhttp.responseXML;
            }

        $scope.displayResult =     function ()
            {
                    console.log('displayResult');
                    $scope.resultado = "LOADING " ;
                    // var xml = loadXMLDoc("xml/ley22990.xml");
                    // var xsl = loadXMLDoc("scripts/xsl/norma_html_01.xsl");
                    // // code for IE
                    // if (window.ActiveXObject || xhttp.responseType == "msxml-document")
                    //   {
                    //     console.log('displayResult');
                    //   ex = xml.transformNode(xsl);
                    //   document.getElementById("example").innerHTML = ex;
                    //   }
                    // // code for Chrome, Firefox, Opera, etc.
                    // else if (document.implementation && document.implementation.createDocument)
                    //   {
                    //      console.log('displayResult');
                    //       var xsltProcessor = new XSLTProcessor();
                    //       xsltProcessor.importStylesheet(xsl);
                    //       console.log(xsltProcessor.transformToFragment(xml, document));
                    //       document.getElementById("example").appendChild( xsltProcessor.transformToFragment(xml, document));
                    //   }

                    transformOutput("xml/ley22990.xml","scripts/xsl/norma_html_01.xsl");
            }




function loadXMLDocument (url) { 
var httpRequest = new XMLHttpRequest(); 
httpRequest.open('GET', url, false); 
httpRequest.send(null); 

return httpRequest.responseXML; 
} 

function createXMLDocument (rootName) { 
var xmlDocument = document.implementation.createDocument('', rootName, null); 
return xmlDocument; 
} 


function transformOutput(xmlinput, xslinput, parameternames, parameters)
    { 
        var xmlDocument    = loadXMLDocument(xmlinput); 
        var xslDocument    = loadXMLDocument(xslinput); 
        var resultDocument = createXMLDocument('whatever'); 
        var xsltProcessor  = new XSLTProcessor(); 

        if (xsltProcessor.transformDocument)
            { 
                xsltProcessor.transformDocument(xmlDocument, xslDocument, resultDocument, null); 

                var s = new XMLSerializer(); 
                var str = s.serializeToString(resultDocument); 

                document.open(); 
                document.write(str); 
                document.close();
                $scope.resultado = str; 
            } 
    }



  });
