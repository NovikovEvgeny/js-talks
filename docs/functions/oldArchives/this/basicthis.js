// "use strict";


function someFunction(a) {
  return this.a + a;
}


console.log(someFunction(5)); // NaN
console.log(someFunction.call({a: 5}, 6)); // 11
console.log(someFunction.apply({a: 6}, [7])); // 13
console.log(someFunction.bind({a: 7}, 8)()); // 15

const someObj = {
  a: 8,
  funcInTheObject: someFunction,
}

console.log(someObj.funcInTheObject(9)) // 17

console.log(someFunctionWithGlobal()); // undefined since someGlobalVar is not defined
function someFunctionWithGlobal() {
  return this.someGlobalVar;
}

global.someGlobalVar = 10;

console.log(someFunctionWithGlobal()); // 10



