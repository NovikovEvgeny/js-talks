# Tasks

```javascript
const foo = { a: 1 };
const bar = foo;
bar.a++;

console.log(foo.a);
```

```javascript
function doSomething(foo) {
  foo.a = 5;
}

const bar = { a: 1 };
const baz = 'abc';

doSomething(bar);
doSomething(baz);

console.log(bar);
console.log(baz);
```
