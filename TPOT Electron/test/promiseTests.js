var expect = require('chai').expect;

function multiply(x, y, callback) {

    const func = this

    if (callback === undefined) {
        return new Promise((resolve, reject) =>
            func(x, y, (err, result) =>
                err ? reject(err) : resolve(result)))
    }

    //do something awesome

    //define error and result, example below:

    let error
    if (!x)
        error = new Error('x must be defined') //sample
    const result = error ? null : x * y;

    return callback(error, result)
}


function doublePositiveOnly(x, callback) {
    const func = this.doublePositiveOnly

    if (callback === undefined) {
        return new Promise((resolve, reject) => {
            func(x, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }

    let error
    if (!x)
        error = new Error('x must be defined')
    if (typeof x !== 'number')
        error = new Error('x must be a number')
    if (x < 0)
        error = new Error('x must be positive')

    const double = error ? null : x * 2
    // console.log('double(): ', double);
    return callback(error, double)
}

describe('double()', () => {
    it('should double a number', () => {
        var x = 3;
        console.log(doublePositiveOnly(x)
            .then(() => {
                console.log('done');
            }));
    });
});

// describe('mult()', () => {
//     it('should multilpy 2 numbers and execute callback', () => {

//         var x = 5;
//         var y = 6;
//         multiply(x, y, (resolve) => {
//             console.log('result', resolve);
//         });

//         multiply(x, y).then((resolve) => {
//             console.log('alt result', resolve);
//         });
//     });
// })