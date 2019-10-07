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

function test() {
  // console.log(b); // ReferenceError: b is not defined
  let b = 10;
}
test();

console.log('---');

const b = 5;
b = 10;