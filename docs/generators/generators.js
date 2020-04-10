///[runToCompletion]
let x = 1;

function foo() {
    x++;
    bar();
    console.log(`value of "x" is ${x}`);
}

function bar() {
    x++;
}

foo();
/// [runToCompletion]