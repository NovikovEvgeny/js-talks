function f(exports, require, module, __filename, __dirname) {
    // myCoolModule.js

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
}
f();
// multiplier = module.exports // it doesn't happen exactly this way, but the idea is clear
