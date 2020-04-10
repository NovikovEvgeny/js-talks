/// [catch]
async function foo() {
    try {
        await Promise.reject('i am rejected promise');
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

foo();
/// [catch]

/// [catchAnyPromise]
async function foo() {
    try {
        const res = await Promise.resolve('good');
        console.log(res);
        const res2 = await Promise.reject('bad');
        console.log(res2);
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

foo();
/// [catchAnyPromise]

/// [catchAnyError]
async function foo() {
    try {
        const res = await Promise.resolve('good');
        console.log(res);
        JSON.parse("njasdfn")
        const res2 = await Promise.reject('bad');
        console.log(res2);
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

foo();
/// [catchAnyError]