/**
 * @author Anton Bulyonov
 * @description Some kind of contract programming
 */

var Undertake = (function () {

    var Validator = {
        isNumber: function (value) {
            return typeof value === 'number' || value instanceof Number;
        },
        isString: function (value) {
            return typeof value === 'string' || value instanceof String;
        },
        isFunction: function (value) {
            return typeof value === 'function' || value instanceof Function;
        },
        isDate: function (value) {
            return value instanceof Date;
        },
        isInteger: function (value) {
            return Validator.isNumber(value) && value % 1 == 0;
        },
        isFloat: function (value) {
            return Validator.isNumber(value) && value % 1 != 0;
        },
        isArray: function (value) {
            return value instanceof Array;
        }
    };

    var types = {
        'number': Validator.isNumber,
        'string': Validator.isString,
        'function': Validator.isFunction,
        'integer': Validator.isInteger,
        'float': Validator.isFloat,
        'date': Validator.isDate,
        'array': Validator.isArray
    };

    Function.prototype.expects = function () {
        return expects(this, arguments);
    };

    Function.prototype.returns = function (resultCheck) {
        return returns(this, resultCheck);
    };


    function validateSingleParam(actual, characteristic) {
        var result = false;
        var type = typeof characteristic;
        switch (type) {
            case 'string':
                result = types[characteristic] && types[characteristic](actual);
                break;
            case 'function':
                result = characteristic(actual);
                break;
            case 'object':
                result = validateRecursively(actual, characteristic);
                break;
        }
        return result;
    }

    function validateRecursively(actual, characteristic) {
        var result = true;
        if (typeof actual === 'object') {
            for (var key in characteristic) {
                var cAttr = characteristic[key];
                var aAttr = actual[key];
                var cType = typeof cAttr;
                if (cType !== 'object') {
                    result = result && validateSingleParam(aAttr, cAttr);
                } else {
                    result = result && validateRecursively(aAttr, cAttr);
                }
            }
        } else {
            result = false;
        }
        return result;
    }

    function validateArray(actualArray, characteristicArray) {
        var result = true;
        for (var i = 0; i < actualArray.length; i++) {
            if (!validateSingleParam(actualArray[i], characteristicArray[i])) {
                // console.log('Param #' + i + ' is invalid');
                result = false;
            }
        }
        return result;
    }

    function expects(fn, expectedArguments) {
        return function () {
            var actualArguments = arguments;
            if (!validateArray(actualArguments, expectedArguments)) {
                throw Error('Parameters are invalid');
            }
            return fn.apply(this, arguments);
        };
    }

    function returns(fn, resultCheck) {
        return function () {
            var result = fn.apply(this, arguments);
            if (!validateSingleParam(result, resultCheck)) {
                throw Error('Result is invalid');
            }
            return result;
        };
    }


    return {
        Validator: Validator,
        expects: expects,
        returns: returns
    };

})();