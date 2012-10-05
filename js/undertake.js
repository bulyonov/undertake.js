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

    var typeList = {
        'number': Validator.isNumber,
        'string': Validator.isString,
        'function': Validator.isFunction,
        'integer': Validator.isInteger,
        'float': Validator.isFloat,
        'date': Validator.isDate,
        'array': Validator.isArray
    };

    var Types = {
        set: function (typeName, checkFunction) {
            typeList[typeName] = checkFunction;
        },
        get: function (typeName) {
            return typeList[typeName];
        }
    };

    Function.prototype.expects = function () {
        return expects(this, arguments);
    };

    Function.prototype.returns = function (returnedResult) {
        return returns(this, returnedResult);
    };

    function validateSingleParam(actual, characteristic) {
        var result = false;
        var type = typeof characteristic;
        switch (type) {
            case 'string':
                result = typeList[characteristic] && typeList[characteristic](actual);
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

    function getContext(fn) {
        var originalFunction = fn.original || fn;
        if (!originalFunction.context) {
            originalFunction.context = {};
        }
        return originalFunction.context;
    }

    function getContextCall(fn) {
        var originalFunction = fn.original || fn;
        var contextCall = function() {
            if (originalFunction.context && originalFunction.context.expected) {
                var actualArguments = arguments;
                var expectedArguments = originalFunction.context.expected;
                if (!validateArray(actualArguments, expectedArguments)) {
                    throw Error('Parameters are invalid');
                }
            }
            var result = originalFunction.apply(this, arguments);
            if (originalFunction.context && originalFunction.context.returned) {
                var returnedResult = originalFunction.context.returned;
                if (!validateSingleParam(result, returnedResult)) {
                    throw Error('Result is invalid');
                }
            }
        }
        contextCall.original = originalFunction;
        return contextCall;
    }

    function expects(fn, expectedArguments) {
        var context = getContext(fn);
        context.expected = expectedArguments;
        return getContextCall(fn);
    }

    function returns(fn, returnedArguments) {
        var context = getContext(fn);
        context.returned = returnedArguments;
        return getContextCall(fn);
    }


    return {
        Validator: Validator,
        Types: Types,
        expects: expects,
        returns: returns
    };

})();