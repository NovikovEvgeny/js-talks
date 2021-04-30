console.log('FIRST LINE OF THE CJS MODULE');

// const a = require('./myModule.mjs');

function foo() {
    console.log('foo CJS');
}

function bar() {
    console.log('bar');
}

module.exports.foo = foo;
module.exports.bar = bar;
