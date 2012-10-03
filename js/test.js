var sum = function (a,b) {
    return a + b;
}
    .expects('integer', 'float')
    .returns('float');

var addDay = function (d) {
    var day = d.getDate();
    d.setDate(day + 1);
    return d;
}
    .expects('date')
    .returns('date');

sum(1,1.1); // correct
sum(1,'1'); // incorrect

addDay(new Date()); //correct
addDay((new Date()).getTime()); // incorrect

