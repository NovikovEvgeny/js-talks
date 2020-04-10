// console.log(a); // ReferenceError: a is not defined
if (true) {
  let a = 5
} else {
  let a = 10;
}
// console.log(a); // ReferenceError: a is not defined

console.log('---');
let i = 8957;
for (let i = 0; i < 2; i++) {
  console.log(i);
  // 0
  // 1
}
console.log(i);// 8957


console.log('---');

let ho = 10;
function test() {
  console.log(ho); // ReferenceError: Cannot access 'ho' before initialization
  let ho = 10;
}
test();

console.log('---');

const b = 5;
b = 10;
