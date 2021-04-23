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

/// [throwError]
async function asyncFunctionThrows() {
    throw new Error('some error happened');
}

async function foo() {
    try {
        const res = asyncFunctionThrows();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

foo();
/// [throwError]

/// [throwErrorReturn]
async function asyncFunctionThrows() {
    throw new Error('some error happened');
    console.log("this will never happen");
}

async function foo() {
    try {
        const res = asyncFunctionThrows();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

foo();
/// [throwErrorReturn]

/// [throwErrorPromise]
async function asyncFunctionThrows() {
    return Promise.reject("some error happened");
    console.log("this will never happen");
}

async function foo() {
    try {
        const res = asyncFunctionThrows();
    } catch (e) {
        console.log('Error!');
        console.log(e);
    }
}

foo();
/// [throwErrorPromise]