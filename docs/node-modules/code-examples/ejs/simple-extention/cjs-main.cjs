console.log('FIRST LINE OF CJS MODULE');

const a = require('./myModule');

function foo() {
    console.log('foo CJS');
}

function bar() {
    console.log('bar');
}

module.exports.foo = foo;
module.exports.bar = bar;
