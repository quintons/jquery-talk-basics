/**
 * Created by quintonsheppard on 21/02/2014.
 */
//--------------------

var ParentClass = function(){
    this.foo = 'parent class foo';
    this.bar = 'parent class bar';
};

var ChildClass = function(){
    this.foo = function(){
        return 'child class foo'
    }
}

ChildClass.prototype = new ParentClass;

ChildClass.prototype.constructor = ChildClass;

var myChildClass = new ChildClass;

var cFoo = myChildClass.foo(); // returns 'child class foo'
var pBar = myChildClass.bar(); // returtns 'parent class bar'

//--------------------