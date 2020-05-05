// fileA.js
const b = require('./fileB');
console.log(b.hello);
module.exports = {
    hello: "hello from fileA",
}