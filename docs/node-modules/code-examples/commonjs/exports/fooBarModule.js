// fooBarModule.js
function foo() {
    console.log('foo');
}

function bar() {
    console.log('bar');
}

// exports.foo = foo;
// exports.bar = bar;

// or
module.exports.foo = foo;
module.exports.bar = bar;
// // or
// module.exports = {
//     foo,
//     bar,
// };
//
// // !!!DONT DO LIKE THIS!!! you override a reference here!
// exports = {
//     foo: foo,
//     bar: bar,
// };
//
// console.log(exports === module.exports);