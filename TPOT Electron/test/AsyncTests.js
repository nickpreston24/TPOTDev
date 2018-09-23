function work() {
    setTimeout(() => {
        console.log('done (inner)');
    }, 2000);
}

async function workAsync() {
    await setTimeout(() => {
        console.log('done (inner async)');
    }, 2000);
}

async function workPromise() {
    await doWork();
}

function doWork() {
    return new Promise(() => {
        setTimeout(() => {
            console.log('done (inner promise)');
        }, 2000);
    })
}


var wait = ms => new Promise((r, j) => setTimeout(r, ms))

// async function wait(ms) {
// return new Promise((r, j) => setTimeout(r, ms));    
// }

describe('do sync task', () => {
    work();
    console.log('done (Outer)');
});

describe('do async sync task', async () => {
    await workAsync();
    console.log('done (Outer after async)', );
});

describe('do promise task', () => {
    workPromise();
    console.log('DONE (Outer)');
})

describe('wait function', async () => {
    var x = 1;
    var y = 2;
    await wait(2000);
    console.warn(x);
})