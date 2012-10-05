# Introduction

**Undertake.js** is a simple contract programming library. It adds functionality to check params and results of functions.

<pre>var sum = function (a,b) {
    return a + b;
}
.expects('integer', 'float')
.returns('float');</pre>

**Undertake.js** is able to provide parameters with verification functions. It validates several types "from a box". They are:
- strings;
- functions;
- numbers;
- float numbers;
- integer numbers;
- arrays;
- objects;
- dates.

It can be easily extended by other types.

# Undertake API

## Usage

### Validate function parameters

You can validate function parameters by calling `expects` method from function prototype or by using `Undertake.expects`. Both calls are equal.

<pre>var sum = function (a,b) {
    return a + b;
}
.expects('float', 'float');
sum(1.1, 2.2);</pre>

<pre>function sum (a,b) {
    return a + b;
}
var newSum = Undertake.expects(sum, ['float','float']);
newSum(1.1, 2.2);</pre>

### Validate function results

For result validation you can use `Function.prototype.returns` or `Undertake.returns`. Both calls are also equal.

<pre>var sum = function (a,b) {
    return a + b;
}
.returns('float');
sum(1.1, 2.2);</pre>

<pre>function sum (a,b) {
    return a + b;
}
var newSum = Undertake.returns(sum, 'float');
newSum(1.1, 2.2);</pre>

### Parameter types and validation

**Undertake** supports these parameter types:
- strings `'string'`;
- functions `'function'`;
- numeric values `'number'`;
- float numbers `'float'`;
- integer numbers `'integer'`;
- arrays `'array'`;
- dates (instances of Date class) `'date'`.

It also makes object schema validation if a parameter is an object:

<pre>var sumObj = function (o1, o2) {
    return o1.a + o1.b.c + o1.b.d + o2.a + o2.b.c + o2.b.d;
}
.expects({
        a: 'float',
        b:{
            c:'float',
            d:'float'
        }
    }, {
        a:'integer',
        b: {
            c: 'integer',
            d: 'integer'
        }
    })
.returns('float');</pre>

You are able to set validation function for each parameter instead of string value:

<pre>var enc = function (a) {
    return a + 1;
}
.expects(function(parameter) {
    return value > 0
});
var b = enc(2);</pre>

### Extending Undertake

If you need to extend existing list of parameters or change validation rules, you can call `Undertake.Types.set`:

<pre>Undertake.Types.add(
    'positiveNumber',
    function(value) {return value > 0;}
);
var enc = function (a) {
    return a + 1;
}
.expects('positiveNumber');
var b = enc(2);</pre>

## Undertake API list

- `Undertake` A main object.
 - `expects`
 - `returns`
 - `Validator` provides with validation functions:
    - `isNumber(value)`
    - `isString(value)`
    - `isFunction(value)`
    - `isInteger(value)`
    - `isFloat(value)`
    - `isArray(value)`
    - `isDate(value)`
 - `Types` helps to make type manipulations:
  - `set(typeName, callbackFunction)`
  - `get(typeName)` returns function
