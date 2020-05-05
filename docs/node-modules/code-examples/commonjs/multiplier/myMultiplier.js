// myMultiplier.js

const MY_CONST = 5;

function multiply(value) {
    return value * MY_CONST;
}

module.exports.multiply = multiply;
// the same as
// exports.multiply = multiply;
// or
// module.exports = {
//   multiply: multiply, // or just "multiply,"
// }