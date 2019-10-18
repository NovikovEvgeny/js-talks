

'use strict'



function testFunc() {
    console.log(this);
    console.log(typeof this);
    console.log(this.prototype);
}

testFunc();




// testFunc.call(5, );
// console.log('---');
// console.log(new Number(11).prototype);
// console.log('---');
// const brr = new Number(10);
// brr.testFunc = testFunc;

// brr.testFunc();