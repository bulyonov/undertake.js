var sum = function (a,b) {
    return a + b;
}
.expects('integer', 'float')
.returns('float');

sum(1,1.1); // correct
sum(1,'1'); // incorrect


var addDay = function (d) {
    var day = d.getDate();
    d.setDate(day + 1);
    return d;
}
.expects('date')
.returns('date');

addDay(new Date()); //correct
addDay((new Date()).getTime()); // incorrect


var sumObj = function (o1, o2) {
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
.returns('float');

sumObj({
    a: 1.1,
    b:{
        c: 2.1,
        d: 3.1
    }
}, {a: 1,
    b:{
        c: 2,
        d:'3'
    }
});