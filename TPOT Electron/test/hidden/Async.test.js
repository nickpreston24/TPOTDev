function work() {
    setTimeout(() => {
        console.log('Sync: done (inner)');
    }, 2000);
}

async function workAsync() {
    await setTimeout(() => {
        console.log('Async: done (inner async)');
    }, 2000);
}

async function workPromise() {
    await doWork();
}

function doWork() {
    return new Promise(() => {
        setTimeout(() => {
            console.log('Async-Promise: done (inner promise)');
        }, 2000);
    })
}

var wait = ms => new Promise((r, j) => {
    setTimeout(r, ms)
})

// async function wait(ms) {
// return new Promise((r, j) => setTimeout(r, ms));    
// }


describe('do sync task', () => {
    work();
    console.log('Sync: done (Outer)');
});

describe('do async sync task', async () => {
    await workAsync();
    console.log('Async: done (Outer after async)', );
});

describe('do promise task', () => {
    workPromise();
    console.log('Async-Promise: DONE (Outer)');
})

describe('wait function', async () => {
    var x = 1;
    var y = 2;
    await wait(2000); //wait until this finishes completely
    console.warn('x=', x); //run this.
})


async function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
            console.log('resolved', );
        }, 2000);
    });
}

async function f1() {
    var x = await resolveAfter2Seconds(10);
    console.log(x); // 10
}

f1();