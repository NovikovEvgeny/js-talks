
// console.log('start');
// setTimeout(() => console.log('timeout1'), 0);
//
// process.nextTick(() => console.log('nextTick'));
//
// setImmediate(() => console.log('immediate'));
//
// setTimeout(() => console.log('timeout2'), 0);
//
// setImmediate(() => console.log('immediate2'));
//
// process.nextTick(() => {
//   console.log('nextTick2');
//   process.nextTick(() => console.log('nextTick3'));
// });
//
// console.log('end');
// 2 timeouts
// 2 immediate
// 2 nextTick with 1 nested nextTick

// --------------

// Promise.resolve().then(() => {
//   console.log('promise');
//   process.nextTick(() => console.log('nextTick4'));
//   Promise.resolve().then(() => {
//     process.nextTick(() => console.log('nextTick5'));
//     Promise.resolve().then(() => console.log('promise3'));
//     console.log('promise2')
//   });
// });
//
// setTimeout(() => process.nextTick(() => console.log('0')), 0);


// function fakeAsync(callback) {
//   console.log('fakeAsync');
//   callback();
// }
//
// fakeAsync(() => process.nextTick(() => console.log('bla')));
// console.log('asdf');



function throwsErr() {
  // process.nextTick(() => process.exit(1));
  process.exit(1);
  throw new Error('error message');
}

try {
  throwsErr();
} catch(e) {
  console.log(e.message);
}




setTimeout( function() {

  process.nextTick(() => console.log('nextTick'));
  setTimeout(() => console.log('timeout'), 0);
  Promise.resolve().then(() => console.log('promise'));
  setImmediate(() => console.log('immediate'));
}, 0);