///[hoisting]
function topLevel() {

  console.log('hello world');

  sayHello();

  function sayHello() {
    console.log('Hello from sayHello');
  }

  console.log(sayHelloVar);

  var sayHelloVar = function() {
    console.log('Hello from variable sayHelloVar');
  }

  sayHelloVar();

  console.log(b);

  var b = 5;

  console.log(b);
}

topLevel();
///[hoisting]


///[hoistingInt]
function topLevel() {
  function sayHello() {
    console.log('Hello from sayHello');
  }
  var sayHelloVar = undefined;
  var b = undefined;

  console.log('hello world');

  sayHello();

  console.log(sayHelloVar);

  sayHelloVar = function() {
    console.log('Hello from variable sayHello');
  }

  console.log(sayHelloVar);

  console.log(b);

  b = 5;

  console.log(b);
}

topLevel();
///[hoistingInt]


///[varProblem]
var foo = 5;

function test() {
  if (foo) {
    console.log('foo exists and equals to ' + foo);
  } else {
    var foo = 666;
    console.log('foo did not exist but now it equals to ' + foo);
  }
}

test();
///[varProblem]

///[loops]
var i = 42;
for (var i = 0; i < 10; i++) {
  console.log(i);
}

console.log(i);


var j = 42;
do {
  var j = 10;
  console.log(j);

} while (false);
console.log(j);
///[loops]


