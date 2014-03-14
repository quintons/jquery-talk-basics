/**
 * Created by quintonsheppard on 21/02/2014.
 */

$(function(){;

(function(document){

    var moduleName = function(){

        var _privateVariable = null;

        var _privateFunctionTwo = function(){};

        function _privateFunction(arr, i){
            return arr[i];
        };

        return (function(){

            return {
                foo: function(){
                    var myArray = ['ben', 'bob', 'robert'],
                        res = _privateFunction(myArray, 1);

                    return res;
                },
                bar: function(){
                    return _privateVariable;
                }

            }

        });

    };

    var myModule = moduleName();

    var barVal = myModule.bar();
    var fooVal = myModule.foo();


})(document);
