

function someAsyncFunction(callback) {
  // setTimeout(callback, 1000);
  callback();
}


console.log('a');

someAsyncFunction(() => {
  for (let i = 0; i < 1e15; i ++) {}
  console.log('c');
});

console.log('b');

