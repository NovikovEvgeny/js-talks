// fileB.js

// currently module.exports === {};
const a = require('./fileA');

console.log(a.hello);

setTimeout(() => {
    console.log(a.hello);
}, 10);

// some code

module.exports.hello = "hello from fileB";