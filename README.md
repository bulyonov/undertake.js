**Undertake.js** is a simple contract programming library. It adds functionality to check params and results of functions.

<pre>var sum = function (a,b) {
     return a + b;
 }
 .expects('integer', 'float')
 .returns('float');</pre>
 
**Undertake.js** is able to provide parameters with verification functions. It validates several types "from a box". They are
- strings;
- numbers;
- float numbers;
- integer numbers;
- arrays;
- objects;
- dates.

It can be easily extended by other types.

 *To be continued*