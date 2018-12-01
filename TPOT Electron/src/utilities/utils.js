//Check js type
//https://stackoverflow.com/questions/7893776/the-most-accurate-way-to-check-js-objects-type
//Usage: if(types.get(prop) == types.number) { ... }
var types = {
    'get': function (prop) {
        return Object.prototype.toString.call(prop);
    },
    'null': '[object Null]',
    'object': '[object Object]',
    'array': '[object Array]',
    'string': '[object String]',
    'boolean': '[object Boolean]',
    'number': '[object Number]',
    'date': '[object Date]',
}