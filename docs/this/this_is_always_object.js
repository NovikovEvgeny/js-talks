
/// [sloppyMode]
(() => {
  console.log("Sloppy mode:");
  function printThis() {
    console.log('this here has type ' + typeof this + ' and value ' + this);
    console.log('---');
  }

  printThis(); // this here has type object and value [object global]
  printThis.call('a'); // this here has type object and value a
  printThis.call(5); // this here has type object and value 5
  printThis.call(Number('a')); // this here has type object and value NaN
  printThis.call(Number(5)); // this here has type object and value 5
  printThis.call(new Number(5)); // this here has type object and value 5

  // gotcha - in sloppy mode we can't set "this" vaue to null or undefined
  // it will be ignored and "global" will be used
  printThis.call(null); // this here has type object and value [object global]
  printThis.call(undefined); // this here has type object and value [object global]

  // but we can use "empty object" - it doesn't even have it's own "toString()" method - so error is thrown
  // printThis.call(Object.create(null)); // TypeError: Cannot convert object to primitive value
})();
/// [sloppyMode]

/// [strictMode]
console.log("Strict mode:");
(function() {
  "use strict";
  // "use strict";

  function printThis() {
    console.log('this here has type ' + typeof this + ' and value ' + this);
    console.log('---');
  }

  // in strict mode default binding is different - this is undefined
  printThis(); // this here has type undefined and value undefined
  // and it doesn't box values to objects! (don't worry, it is still autoboxing if we want use e.g. this.toString())
  printThis.call('a'); // this here has type string and value a
  printThis.call(5); // this here has type number and value 5
  printThis.call(Number('a')); // this here has type number and value NaN
  printThis.call(Number(5)); // this here has type number and value 5
  printThis.call(new Number(5)); // this here has type object and value 5

  // and since default binding in strict mode is "undefined" - we can set it to null as well
  printThis.call(null); // this here has type object and value null
  printThis.call(undefined); // this here has type undefined and value undefined

  // and this is the same ofc
  // printThis.call(Object.create(null)); // TypeError: Cannot convert object to primitive value
})();
/// [strictMode]
