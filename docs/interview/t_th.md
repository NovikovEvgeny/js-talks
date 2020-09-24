# Tasks

```javascript

class MyClass {
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
