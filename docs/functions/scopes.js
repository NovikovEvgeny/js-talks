///[scope]
function foo(a) {
 console.log( a + b );
}
var b = 2;
foo(2);
///[scope]


///[nested]
var gStr = 'Hello world from global!';

function print() {
    throw new Error('Whatever, it will not be thrown anyway');
}

function outerFunction() {
  var str = 'Hello world!';
  var str2 = 'Hello world from outer';

  function print() {
    var str = 'Hello world from print!';
    console.log(str);
    console.log(str2);
    console.log(gStr);
  }

  print();
}

outerFunction(); 
///[nested]

///[cross]
// wrapped to IIFE because of RunKit "special" tricks with "this"
(() => {
  var hello = 'global';

  function test() {
    var hello = 'test';
    console.log(hello);
    console.log(global.hello);
    console.log(this.hello);
  }
  
  test();
})();
///[cross]


///[crossThis]
this.hello = 'global';

function test() {
  var hello = 'test';
  console.log(hello);
  console.log(this.hello);
}

test.call(this, null);
///[crossThis]


///[crossArrow]
this.hello = 'global';

const test = () => {
  var hello = 'test';
  console.log(hello);
  console.log(this.hello);
}

test()
///[crossArrow]


///[referenceError]
function foo() {
    console.log(notDefined);
}

foo();
///[referenceError]


///[typeError]
function foo() {
    const obj = {name: "Bob"};
    console.log(obj.spouse.name);
}

foo();
///[typeError]


///[cheating]
function foo(str, a) {
  eval(str);
  console.log(a + b);
}
var b = 2;
foo( "var b = 3;", 1 );
///[cheating]


///[letIf]
console.log(a);
if (true) {
  let a = 5
} else {
  let a = 10;
}
console.log(a);
///[letIf]


///[letLoop]
let i = 8957;
for (let i = 0, b = 10; i < 2; i++) {
  console.log(i);
}
console.log(i);
console.log(b);
///[letLoop]

///[constLoop]
let i = 8957;
for (const i = 0; i < 2; i++) {
  console.log(i);
}
console.log(i);
///[constLoop]

///[tdz]
let ho = 10;
function test() {
    ho = 5;
    console.log(ho);
    let ho = 10;
}
test();
///[tdz]


///[const]
const b = 10;
b = 5;
///[const]


///[example]
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
      console.log("callback #", i, "is fired");
  }, i * 100);
}
///[example]


///[exampleF]
for (var i = 0; i < 10; i++) {
  const f = function(j) {
      setTimeout(function() {
        console.log("callback #", j, "is fired");
    }, i * 100);
  }
  f(i);
}
///[exampleF]

///[exampleIife]
for (var i = 0; i < 10; i++) {
  (function(j) {
      setTimeout(function() {
        console.log("callback #", j, "is fired");
    }, i * 100);
  })(i);
}
///[exampleIife]


///[easylife]
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
      console.log("callback #", i, "is fired");
  }, i * 100);
}
///[easylife]



