# Типы данных

Всего - 7 типов данных

( ---примитивы--- )
* number
* string
* boolean
* null
* undefined
( --- "составной" ---)
* object
* Symbol (ES6)

Стоит упомянуть `BigInt`  - до сих пор не в спецификации ECMAScript, но уже в Stage 3 (предпоследняя) и поддерживается в Chrome, Mozilla, Opera, Node.js > 10.4.0

Тип переменной можно определить с помощью оператора typeof

```javascript
typeof undefined === "undefined"
typeof 148 ==== "number"
typeof "148" ==== "string"
typeof { hello: "world" } === "object"

// BUT
typeof null === "object"  // lol, because it's JS

// Build-in "Natives"
typeof [1, 2, 3] === "object"
typeof new Number() === "object"
typeof new Date() === "object" 
typeof /.*/ === "object"

// BUT
typeof function() {console.log('hi!')} === "function" // lol, why not
```

`typeof` можно применять к **необъявленным** переменным:
```javascript

console.log(typeof undefinedVal); // undefined
console.log(undefinedVal); // ReferenceErrir: undefinedVal is not defined
```


## Object

> An Object is logically a collection of properties.

Включая функции, и все нейтивы String, Number, Boolean, Date, RegExp, Error

### Boxing

```javascript
typeof 'str' // "string" primitive string! not an object!
'str'.toUpperCase(); // "STR". // Automatically boxed to String and `toUpperCase()` method called
new String('str').toUpperCase() // "STR"

new Boolean(false);

new Number(55);
new Number("55");

// no need to use explicit boxing usually, it can even hurt you
const someBool = new Boolean(false);
if (someBool) {
    console.log("someBool is true"); // gotcha. someBool is an object and object is always truthy
} else {
    console.log("someBool is false");
}

// prints: "someBool is true"
```
Вывод: почти никогда нет смысла явно врапать в объект, ЖС сам скастит, если надо, например, вызвать метод прототипа

В то же время есть смысл использовать конструкторы Нейтивов для `Error` и `Date`, т.к. по-другому вы не создадите такой объект: 
```javascript
// Makes sense to use Native cuonstructors for Error and Date:
const err = new Error('error message');
const date = (new Date()).getTime();
```


# Coercion <3

Конвертирование данных из одного типа в другой
Явное и неявное

"Явность" на самом деле зависит от понимания

Очевидно явный каст:
```javascript
const someNum = 42;
// cast
const someStr = String(someNum);
// create instance of String "class" and coercion
const someStrObj = new String(someNum);

typeof someStr; // string
typeof someStrObj; // object

const someNumCaster = Number(someStr);
const someNumParsed = parseInt(someStr);
```

Чуть менее явный:
```javascript
const foo = 42;
const fooAsStr = foo + ""; // second arg is string -> fooAsStr 100% string
const fooAlsoAsStr = fooAsStr.toString(); // also kinda obvious

const barAsNum = +fooAsStr; // unary operator "+" means "cast to number"

console.log(foo + +fooAsStr); // наркомания же какая то, ну

!foo; // false
```

Неявный, т.к. нет никаких операций (хотя тоже достаточно очевидно, что кастится)
```javascript
const a = "hey there";
if (a) console.log(a); // also for (; ; ); do .. while() and while() .. do; and ternary operator

const b = "42";
const c = 42;
b == c; //true. note "==", not "==="


console.log(!a); // false

```



# "==" vs "==="
На целый урок отдельный наберется.

Основная идея:
"==" приводит типы, в то время как "===" нет

Это сначала меняет тип одного или обоих операндов, а затем сравнивает как "===" 

Под копотом оба алгоритма добиваются сравнения **примитивов** (или возвращают false раньше)

Когда это может быть полезно
```javascript

null == undefined; // true
function (a) {
    if (a == null); // the same as if (a === null || a === unefined)
}


const arr = [{
     id: 4,
     otherProp: "bla", 
     valueOf: function() {return this.id}
     }
];
const iNeedId = 4;

arr.find(obj => obj == iNeedId); // will find id
// from other side... it is almost like arr.find(obj => obj.id === iNeedId);

```
ну... и всё...

Когда это может вас поймать:
```javascript

let a = "42"; // truthy
let b = true; // truthy
let c = false; // falsy

a == b; // false

// ok a == b is false, then a == c is true?
a == c; // false. wtf?


new String('f') == new String('f'); // F

```

"==" оператор **кастит булеан в намбер**, а не наоборот
```javascript
"1" == true;
1 == true;

0 == false;
"0" == false;
```

При сравнении стринги и намбера, "==" оператор **кастит стринг в намбер**

Если один из операндов - объект, к нему применяется `valueOf`, а если `valueOf()` возвращает **не-примитив**, то применяется `toString()`
```javascript
const mySuperObjectOvd = {
    valueOf: function() {
        console.log('valueOf!');
        return this;
    },
    toString: function() {
        console.log('toString!');
        return "somestring"
    }
}

mySuperObjectOvd == "somestring";
//valueOf!
//toString!
//true
```


Два объекта всегда будут не равны друг другу, если это не один и тот же объект (Референс на один и тот же объект) (для `===` действует то же правило)
```javascript
const someObj = {a: 5}; // undefined
someObj == someObj; //true
const someObj2 = {a: 5}; //undefined
someObj == someObj2; //false

const theSameObj = someObj;
someObj == theSameObj; // true
```

## Truthy and falsy

Неявный каст происходит к булеану внутри булевых контекстах

* if (arg)
* do {} while()
* while() {}
* a ? a : b
* for (let i = 0; i < 10; i++)
* !a

Truthy - значения очевдино конвертятся в таких контекстах в true, 
Falsy - в false

Truthy - всё, что не falsy

Falsy:

* undefined
* null
* NaN
* ""
* 0
* false
* `||` и `&&` операнды

Почему важно знать
любой if() или `||` операция конвертит в булеан

```javascript
function foo(input) {
    console.log(input || "defaultValue");
}

// any of "falsy" values will be ignored. If we need empty stirng or 0, we have a problem
foo("hello world");
foo(5);
foo(0); // oopsie
foo(""); // oopsie
foo(false);
```

То же самое с if и чем угодно


## Передача значения по ссылке и по значению

Примитивы передаются по значению, объекты - по ссылке

```javascript

function bar(inputarg) {
  inputarg.morebar = 15;
}

const a = {bar: 10}
bar(a);
console.log(a); // {bar: 10, morebar: 15}
```

`const` при объявлении объекта не иммутит **весь** объект, а лишь ссылку на этот объект (в переменную `a` нельзя будет записать ссылку на другой объект)

Проперти объекта менять по-прежнему можно.
Чтобы совсем заморозить объект, можно использовать
```javascript

function barf(inputarg) {
  inputarg.morebar = 15;
}

const aff = {bar: 10}

Object.freeze(aff);

bar(aff);
console.log(aff); // {bar: 10, morebar: 15}

```