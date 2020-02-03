class SomeObj {
}
function printDeep(someObj) {
    var _a;
    console.log((_a = someObj.foo) === null || _a === void 0 ? void 0 : _a.bar);
    // console.log(someObj.foo && someObj.foo.bar)
}
printDeep({});
//# sourceMappingURL=index.js.map