
function topLevel() {
  console.log('hello world');

  sayHello(); // Hello from sayHello

  function sayHello() {
    console.log('Hello from sayHello');
  }

  console.log(sayHelloVar); // undefined
  // sayHelloVar(); // TypeError: sayHelloVar is not a function

  var sayHelloVar = function() {
    console.log('Hello from variable sayHello');
  }

  console.log(sayHelloVar); // [Function: sayHelloVar]

  console.log(b); // undefined

  var b = 5;

  console.log(b); // 5
}
  
topLevel();


// ----- 
console.log('-----');

// some arg in global scope
// var foo = 5;

function test() {
  let foo = 5;
  if (true) {
    let foo = 123;
    console.log('foo exists and equals to ' + foo);
  } else {
    let foo = 666;
    console.log('foo did not exist but now it equals to ' + foo);
  }

  console.log(foo)
}

test(); // что выведет?



/// --

function test2() {
  console.log('hi');
}

test2();





