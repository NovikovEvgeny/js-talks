
// myClass
class MyClass {
    constructor(name) {
        console.log('constructor');
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}`)
    }

}

module.exports = MyClass;