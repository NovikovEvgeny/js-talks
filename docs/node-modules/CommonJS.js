/// [wrapForModule]
function f(exports, require, module, __filename, __dirname) {
    // module code here
}
/// [wrapForModule]

/// [emptyModuleExports]
console.log(module.exports);
console.log(module.exports === exports);
/// [emptyModuleExports]