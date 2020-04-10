/// [inputOnCreation]
function *foo(x,y) {
    return x * y;
}

const gen = foo(6, 7);

const res = gen.next();

console.log(res.value);
/// [inputOnCreation]

/// [outputGenerators]
function *fooGen() {
    const input = yield 'before the first yield';
    console.log(input);
}

const generator = fooGen();
const result = generator.next();
console.log(result.value);
generator.next("input from outside");
/// [outputGenerators]

/// [withoutGenerators]
function getOneStringAndReturnAnother(str) {
    console.log(str);
    return "input from outside";
}

function almostFooGenerator() {
    const input = getOneStringAndReturnAnother("before the first yield");
    console.log(input);
}
/// [withoutGenerators]

/// [throwGenerator]
function *fooWithTryCatch() {
    try {
        const input = yield 'before the first yield';
        console.log(input);
    } catch (error) {
        console.log(`Error!: ${error}`);
    }
}

const gen2 = fooWithTryCatch();
const resultOfGen2 = gen2.next();
console.log(resultOfGen2.value);
resultOfGen2.throw(new Error('hey, I am error from outside'));
/// [throwGenerator]

/// [returnGenerator]
function *fooWillBeReturn() {
    console.log('line 1');
    try {
        const input = yield 'before the first yield';
        console.log(input);
    } catch (error) {
        console.log(`Error!: ${error}`);
    }
}

const genWithReturn = fooWillBeReturn();
const resultReturn = genWithReturn.return('asdf');
console.log(resultReturn);
/// [returnGenerator]