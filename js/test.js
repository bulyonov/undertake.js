var enc = function (a,b) {
    return a + b;
}.expects(CP_INTEGER, CP_FLOAT);

var encDate = function (d) {
    var day = d.getDate();
    d.setDate(day + 1);
    return d;
}.expects(CP_DATE);

enc(1,1.1);
enc(1.1,1);

encDate(new Date());
encDate(1);

