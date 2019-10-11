# Функции

Любая функция - это объект
```javascript
const a = function() {};
function someFunc() {}

console.log(a instanceof Object); // true
console.log(someFunc instanceof Object); //true
```

Следовательно, к функции применимо всё, что применимо к объектам. Их
можно передавать как аргумент, возвращать, присваивать переменным.

## Способы объявления

### Function declaration
Обычное, самое простое объявление функции
```javascript
function foo() {
  console.log('Hello world!');
}
```

### Function expression
Через присваивание (обычно анонимной) функции переменной
```javascript
const variableFunction = function() {
  console.log('Hello world!');
}

const varialbeFunctionNamed = function named() {
  consolelog('Hello world!');
}
```

Основная разница:
Из-за "поднятия" (хоистинг) вызов объявленной функции возможен, в то время как
вызов функции вида "function expression" возможен только после присваивания переменной

```javascript
console.log(printHelloExpression); // undefined
printHelloExpression('world'); // ReferenceError: printHelloExpression is not a function
var printHelloExpression = function() {
  console.log('Hello, ' + name);
};

// at the same time:
console.log(printHelloExpressionConst); // ReferenceError: printHelloExpressionConst is not defined
printHelloExpressionConst('world'); // ReferenceError: printHelloExpressionConst is not defined
someFuncName('world'); // ReferenceError: someFuncName is not defined
const printHelloExpressionConst = function someFuncName(name) {
  console.log('Hello, ' + name);
  console.trace();
};
printHelloExpressionConst('world');
// Trace
//     at someFuncName (~\functions\index.js:34:11)

```

### Methods
Метод - свойство объекта, которое является функцией
```javascript
const someObject = {
  printHello: function() {
    console.log('hello!');
  }
};

someObject.printHello();
```

### Наркомания

#### Function

```javascript
const sum = new Function('a', 'b', 'return a + b');

console.log(sum(2, 6)); // 8

// Function has global scope only
globalA = 15;
{
  let globalA = 10;
  const sumGlobal = new Function('a', 'b', 'return globalA + b'); // === this.globalA
  console.log(sumGlobal(2, 6)); // 21
}
```

#### eval()

```javascript
globalA = 20;
{
  let globalA = 10;
  console.log(eval('globalA')); // 10
  console.log(eval('notDefined')); // ReferenceError: notDefined is not defined
}
```

## Области видимости

Области видимости делятся на два типа - глобальная и локальная
Глобальная область видимости - высший слой, где хранятся переменные, доступные отовсюду

```javascript

// fileA.js
global.someGlobalVar = 42;

// fileB.js
require('./fileA');

// fileC.js
function printGlobalVar() {
    console.log(global.someGlobalVar);
}

module.exports = {
    printGlobalVar: printGlobalVar,
}

// main.js
require('./fileB');
require('./fileC').printGlobalVar(); // 42
```

Локальная область видимости - в пределах функции
Пример ниже конечно еще и отличный пример замыкания, но в данный момент необхоимо просто отметить,
что извне функции printHelloWorld нет доступа ни к str, ни к функции print, т.к. они объявлены внутри своего скоупа
```javascript

function printHelloWorld() {
  var str = 'Hello world!';

  function print() {
    console.log(str);
  }

  print();
}

printHelloWorld();
//   print(); // ReferenceError: print is not defined
//   console.log(str); ReferenceError: str is not defined
```

"Поиск" переменной по скоупам
Алгоритм прост - движок при выполнении "обращается" к текущей области видимости, спрашивает о наличии объявленной переменной,
если такой нет - идет на 1 уровень выше и повторяет действия, пока не дойдет до глобальной области видимости

Работает как для функций, так и для переменных
```javascript

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

outerFunction(); // 'Hello world from print!', 'Hello world from outer', 'Hello world from global!'
```

Проблема перекрывающихся скоупов - при объявлении переменной во "внутреннем скокупе", переменная из "внешнего скоупа" с таким же именем не будет доступна

```javascript
var hello = 'global';

function test() {
  var test = 'test';
  console.log(hello); // test
  console.log(global.hello); //undefined
  console.log(this.hello); //unedfined
}

test(); // test
```

Хоистинг (поднятие, всплытие и еще много разных странных существительных)

Функции, объявленные через function declaration, и переменные, объявленные через var, "объявляются" в начале выполнения скрипта
Это можно представить так, будто объявления функций и переменных (но не присваивание переменных!!!) "поднимаются" в топ области видимости

***Note:*** Для всех примеров хоистинга переменных будем использовать `var`, о `let` и `const` поговрим позже
```javascript

function topLevel() {

  console.log('hello world');

  sayHello(); // Hello from sayHello

  function sayHello() {
    console.log('Hello from sayHello');
  }

  console.log(sayHelloVar); // undefined

  var sayHelloVar = function() {
    console.log('Hello from variable sayHello');
  }

  sayHelloVar();

  console.log(b);

  var b = 5;

  console.log()
}

topLevel();
```

Может интерпретироваться как:

```javascript
function topLevel() {
  function sayHello() {
    console.log('Hello from sayHello');
  }
  var sayHelloVar = undefined;
  var b = undefined;

  console.log('hello world');

  sayHello(); // Hello from sayHello

  console.log(sayHelloVar); // undefined

  sayHelloVar = function() {
    console.log('Hello from variable sayHello');
  }

  console.log(sayHelloVar); // [Function: sayHelloVar]

  console.log(b); // undefined

  b = 5;

  console.log(b); // 5
}
  
topLevel();
```

Еще одна причина не использовать var 


Проблемы всплытия и областей видимости

```javascript
// habr example

var foo = 5;

function test() {
  if (foo) {
    console.log('foo exists and equals to ' + foo);
  } else {
    var foo = 666;
    console.log('foo did not exist but now it equals to ' + foo);
  }
}

test(); // что выведет?
```

Вывод - let и const наши друзья, var наш враг\

ES6. Let и const - основные отличия

# TODO: add an example with for loops

* блочная область видимости
```javascript

console.log(a); // ReferenceError: a is not defined
if (true) {
  let a = 5
} else {
  let a = 10;
}
console.log(a); // ReferenceError: a is not defined

let i = 8957;
for (let i = 0; i < 2; i++) {
  console.log(i);
  // 0
  // 1
}
console.log(i);// 8957

```

* Не "всплывают"
```javascript
function test() {
    console.log(b); // ReferenceError: b is not defined
    let b = 10;
}
test();
```

* const - неизменяемая
```javascript
const b = 10;
b = 5; //TypeError: Assignment to constant variable.
```

## Замыкания

Еще одна вещь, которая относится к области видимости и функциям

Способность функции сохранять доступ к той области видимости, где функция была *объявлена*, даже если она *вызвана* из другой области видимости

```javascript

function iHaveASecret() {
    const secret = 'very secret phrase';
  
    return function tellSecret() {
      console.log(`hey, do not tell anyone, but the secret is : ${secret}`);
    }
  }
  
  const blah = iHaveASecret();
  blah();

  console.log(new iHaveASecret().secret); // unefined
  console.log(iHaveASecret.secret); //
  console.log(iHaveASecret.prototype.secret);
  console.log(new iHaveASecret().prototype.secret);
```

```javascript
function calculator(a) {
  let res = 0;

  function sum(c) {
    res += c;
    console.log(res);
    return sum;
  }

  return sum(a);
}


let value = calculator(3);
value(6)(7);

console.log(value(8))

```

Как вытащить значение из такого? Никак, оно же замкнуто
Поэтому надо пробросить обратно
```javascript
function calculator(a) {
  let res = 0;

  function calc(c) {
    res += c;
    return {
      getResult: () => res,
      add: calc,
    };
  }

  return calc(a);
}


let value = calculator(3);
value.add(6).add(7);

console.log(value.add(8).getResult())
```

## Способы вызова

```javascript

function hello(name) {
  console.log(`hello ${name || 'world'}!`);
}

hello('space');
hello.apply(null, ['space']); // Apply -> Array
hello.call(null, 'space'); 
```

IIFE
```javascript
(function(input) {
  console.log('Your input is ' + input);
})(5);
```

Зачем?

* изоляция переменных

```javascript
(function() {
  var somePopularVariablename = 10;
  console.log(somePopularVariablename);
})();
```

* async - вызовы (не для прода!)

```javascript
async function sleep(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}

(async function() {
  await sleep(2000);
  console.log('woke up!');
})();
```

## Callbacks

Коллбек - функция, которая "выполнится потом"
Основа всех асинхронных (неблокирующих) операций

Тут и так все понятно
```javascript
const fs = require('fs');

fs.readdir('./', (err, files) => {
  if (err) {
    throw err;
  }
  console.log(files);
});

console.log('I declared callback before this line, but it will be executed after!');
```

## This and objects

## ES6 Arrow functions

