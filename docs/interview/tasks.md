# Tasks

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

```javascript
var foo = { a: 1 };
var bar = foo;
bar.a++;

console.log(foo.a);
```

```javascript
var b = 2;

(function doThings() {
    var a = b = 1;
})();

console.log(b);
```


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
   });
}
```