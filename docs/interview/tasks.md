# Tasks

## datatypes

```javascript
function sum(a, b) {
  return a + b;
}

console.log(sum(1, '2'));
```


```javascript
console.log(typeof (1 / []));
```

```javascript
function getAHalf(arg) {
	if (!arg) {
        return null;
    }
    
    return arg / 2;
}

console.log(getAHalf(0));
```

## Reference and value

```javascript
var foo = { a: 1 };
var bar = foo;
bar.a++;

console.log(foo.a);
```

## Scope

```javascript
var b = 2;

(function doThings() {
    var b = 1;
})();

console.log(b);
```

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
      console.log(`callback # ${i} is fired`);
  }, i * 100);
}
void 0;
```

## Hoisting

```javascript
function callTaxi() {
  var taxi = getAvailableTaxi();
  taxi.callPhone();
 
  return;
 
  var getAvailableTaxi = function() {
    return 'taxi 5'
  };
}

callTaxi();
```

```javascript
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
```

## Closure

```javascript
function outer() {
  let x = 'Web Designer';
  function shout() {
    console.log(`I love ${x}!`);
  }
  return shout; 
}


outer()();
```

```javascript
function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}
let counter1 = makeCounter();
let counter2 = makeCounter();
alert( counter1() ); // 0
alert( counter1() ); // 1
alert( counter2() ); // 0 (независимо)
```

## Classes

```javascript
class SuperClass {}

class MyClass extends SuperClass {
 constructor(data) {
  this._data = data;
 }
 
 get data() {
 	this._data;
 }
}

console.log((new MyClass('hello!')).data);
```

## this
```javascript

class MyClass {
    name = 'default';

    constructor(name) {
        this.name = name;
    }

    doSomething() {
        setTimeout(function () {
            console.log(this.name);
        }, 100)
    }
}

new MyClass('Bob').doSomething();
```

```javascript
const someObject = {
    name: 'Bob',
    sayHello: function() {
        console.log(`Hello ${this.name}`);
    }
}

class SomeClass {
    constructor() {
        this.name = 'Bob';
    }

    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}


someObject.sayHello();
const someFunc = someObject.sayHello;
someFunc();

const someClass = new SomeClass();
someClass.sayHello();
const someClassFunc = someClass.sayHello;
someClassFunc();
```

## Async

```javascript
process.nextTick(() => {
    console.log('tick');
});

setImmediate(() => {
    console.log('immediate');

    setTimeout(() => {
        console.log('inner timeout');
    }, 0);

    setImmediate(() => {
        console.log('inner immediate');
    });
});

setTimeout(() => {
    console.log('timeout');
}, 0);

const ignoreThisLine = '';
```



```javascript
try {
    setTimeout(() => JSON.parse('asdf'), 0);
} catch (e) {

}
```

```javascript
let counter = 0;
while (true) {
   counter = 0;
   setTimeout(() => {
      counter++
      console.log(counter);
   }, 0);
}
```

```javascript
setTimeout(function() {
  console.log('delayed by 1500')
}, 1500);

for(var i = 0; i < 1e5; i++) {
  // this for LOOP is executing 3000ms
}
```

