/// [yieldAndNext]
function*generateSync() {
    yield 1;
    yield 2;
    yield 3;
}

const syncGenerator = generateSync();
console.log(syncGenerator.next());
console.log(syncGenerator.next());
console.log(syncGenerator.next());
console.log(syncGenerator.next());
/// [yieldAndNext]

/// [generatorExample]
let x = 1;

function *foo() {
    x++;
    yield; // pause!
    console.log( "x:", x );
}

function bar() {
    x++;
}

// construct an iterator `it` to control the generator
const it = foo();

// start `foo()` here!
it.next();
console.log(x);
bar();
console.log(x);
it.next();
/// [generatorExample]