// fileA.js

// module.exports = {}

const b = require('./fileB');

// b === { hello : "hello from fileB" }

console.log(b.hello);

module.exports.hello = "hello from fileA";