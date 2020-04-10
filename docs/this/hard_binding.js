/// [hardBinding]
function printThisColor() {
    console.log(this.color)
}

printThisColor();
printThisColor.call({ color: 'green' });
printThisColor.apply({ color: 'red' });
printThisColor.bind({ color: 'black' })();

// Once bound - bound forever!
printThisColor.bind( { color: 'black' }).call({ color: 'whatever' }); // black

/// [hardBinding]

/// [whyBoundForever]
function bind(foo, contentObj, ...args) {
    // just to understand what is "...args"
    console.log(Array.isArray(args));

    // we return new function here. This function is NOT called right here
    // this is just a new instance of the function - when this "new function" is called,
    // then "foo.call" happens, with hard binding to "contentObj" and
    // first part of arguments args, second - args2
    return function (...args2) {
        foo.call(contentObj, ...args, ...args2);
    }
}

function printThisColorWithArgs(...args) {
    console.log('color is ' + this.color + ' and args are ' + args);
}
const boundFunction = bind(printThisColorWithArgs, { color: 'yellow'}, 'one', 'two');

boundFunction.call({color: 'whatever, it won\'t be used'}, 'three', 'four');
boundFunction.call({color: 'asdf' }, 'one', 'two', 'three');
/// [whyBoundForever]
