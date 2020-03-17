// "use strict";


function someFunc() {
  console.log(this);
  console.log(this.a);
}

someFunc.call(null); // [Object global]  // undefined
someFunc.call(undefined); // [Object global]  // undefined
