/// [declaration]
async function iAmAsyncFunction() {
    return 5;
}
/// [declaration]

/// [declarationAndCall]
async function iAmAsyncFunction() {
    return 5;
}

const asyncFunctionResult = iAmAsyncFunction();
console.log(asyncFunctionResult.toString());
/// [declarationAndCall]

/// [promiseInsteadOfAsyncFunc]
function iAmAsyncFunction() {
    return new Promise((resolve) => {
        resolve(5);
    });
}

const promise = iAmAsyncFunction();
console.log(promise.toString());
/// [promiseInsteadOfAsyncFunc]

/// [waitForAsyncFunc]
async function iAmAsyncFunction() {
    return 5;
}

const asyncFunctionResult = iAmAsyncFunction();
asyncFunctionResult
    .then(result => {
        console.log(result);
    });
/// [waitForAsyncFunc]

/// [returnPromiseFromAsync]
async function iAmAsyncFunction() {
    return new Promise((resolve, reject) => {
        resolve(5);
    });
}

const asyncFunctionResult = iAmAsyncFunction();
asyncFunctionResult
    .then(result => {
        console.log(result);
    });
/// [returnPromiseFromAsync]

/// [await]
async function f() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('done!'), 1000)
    });

    let result = await promise;

    console.log(result); // this will be printed after 1 sec
}

f();
/// [await]

/// [awaitThenable]
const thenable = {
    then: (resolve, reject) => {
        setTimeout(() => {
            resolve('done!');
        }, 1000);
    }
};

async function foo() {
    const result = await thenable;
    console.log(result);
}
foo();
/// [awaitThenable]

/// [awaitNonPromise]
async function foo() {
    console.log('x');
    const result = await 5;
    console.log(result);
}

foo();
console.log('hello');
/// [awaitNonPromise]