// fileB.js
const a = require('./fileA');
console.log(a.hello);

module.exports = {
    hello: "hello from fileB",
};