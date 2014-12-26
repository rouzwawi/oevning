/////////////////////////////////////////////////////////////////////
// sum with reduce

function r2(acc, value) {
    return acc + value;
}

a.reduce(r2, 0)
// 36


/////////////////////////////////////////////////////////////////////
// reduce to predefined keys

function r(accumulator, value) {
    var key = (value % 2 == 0) ? 'even' : 'odd';
    accumulator[key].push(value);
    return accumulator;
}

var initial = { 'even': [], 'odd': [] }

var a = [1,2,3,4,5,6,7,8]
a.reduce(r, initial)
// { even: [ 2, 4, 6, 8 ],
//    odd: [ 1, 3, 5, 7 ] }


/////////////////////////////////////////////////////////////////////
// reduce to keys

var stuff = [
    {
        'krkv': 143,
        'name': 'foo'
    },
    {
        'krkv': 175,
        'name': 'bar'
    },
    {
        'krkv': 231,
        'name': 'baz'
    },
    {
        'krkv': 120,
        'name': 'bax'
    },
]

function r(acc, item) {
    var key = item.krkv - (item.krkv % 100);
    var list = acc[key] = acc[key] || [];
    list.push(item);
    return acc;
}

stuff.reduce(r, {})
// { '100':
//    [ { krkv: 143, name: 'foo' },
//      { krkv: 175, name: 'bar' },
//      { krkv: 120, name: 'bax' } ],
//   '200': [ { krkv: 231, name: 'baz' } ] }



/////////////////////////////////////////////////////////////////////
// group by


function groupBy(arr, keyFunc) {
    function r(acc, item) {
        var key = keyFunc(item);
        var list = acc[key] = acc[key] || [];
        list.push(item);
        return acc;
    }

    return arr.reduce(r, {});
}

groupBy(stuff, function(d) { return d.name[0]; } );
// { f: [ { krkv: 143, name: 'foo' } ],
//   b:
//    [ { krkv: 175, name: 'bar' },
//      { krkv: 231, name: 'baz' },
//      { krkv: 120, name: 'bax' } ] }

groupBy(stuff, function(d) { return d.krkv - (d.krkv % 100); } );
// { '100':
//    [ { krkv: 143, name: 'foo' },
//      { krkv: 175, name: 'bar' },
//      { krkv: 120, name: 'bax' } ],
//   '200': [ { krkv: 231, name: 'baz' } ] }


// ask about prototypes
// stuff.groupBy(function(d) { return d.name[0]; } );
