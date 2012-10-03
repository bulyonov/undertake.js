/**
 * @author Anton Bulyonov
 * @description Some kind of contract programming
 */
(function() {

    CP_NUMBER = 'number';
    CP_STRING = 'string';
    CP_FUNCTION = 'function';
    CP_DATE = function(value) {
        return (value instanceof Date);
    };
    CP_INTEGER = function(value) {
        return (typeof value === 'number' && value % 1 == 0);
    };
    CP_FLOAT = function(value) {
        return (typeof value === 'number' && value % 1 != 0);
    };


    function validateSingleParam(actual, characteristic) {
        var result = false;
        var type = typeof characteristic;
        switch (type) {
            case 'string':
                result = typeof actual === characteristic;
                break;
            case 'function':
                result = characteristic(actual);
                break;
            case 'object':
                break;
        }
        return result;
    }

    function validateArray(actualArray, characteristicArray) {
        var result = true;
        for (var i = 0; i < actualArray.length; i ++ ) {
            if (!validateSingleParam(actualArray[i], characteristicArray[i])) {
                console.log('Param #' + i + ' is invalid');
                result = false;
            }
        }
        return result;
    }

    Function.prototype.expects = function () {
        var expectedArguments = arguments;
        var self = this;
        return function() {
            var actualArguments = arguments;
            if (!validateArray(actualArguments,expectedArguments)) {
                throw Error('Parameters are invalid');
            }
            return self.apply(this,arguments);
        };
    };



})();