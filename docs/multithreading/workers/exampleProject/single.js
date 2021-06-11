function fibo(n) {
  if (n > 45) {
    throw "too much";
  }
  if (n < 2) {
    return 1;
  }
  return fibo(n - 2) + fibo(n - 1);
}

const interval = setInterval(() => {
  console.log('Event loop is blocked!');
});

console.time('fibo45');
fibo(45);
console.timeEnd('fibo45');

console.time('fibo30');
fibo(30);
console.timeEnd('fibo30');

clearInterval(interval);
