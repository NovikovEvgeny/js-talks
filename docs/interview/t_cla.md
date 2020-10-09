# Tasks


```javascript
class MyClass {
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


function printSomething(myObject) {
    const { a, b, c } = myObject;
    console.log(a, b, c);
}

printSomething({ a: 5, b: 10, c: 15 });
printSomething({ a: 5, b: 10 });



function printRest(a, b, ...rest) {
    console.log(rest);
}

printRest(1, 2, 3, 4, 5);
```
