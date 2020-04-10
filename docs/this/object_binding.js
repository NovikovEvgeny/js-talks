/// [bindingToObj]
function helloWorld() {
    console.log(`Hello, ${this.name}`);
}

const employee = {
    name: 'Alice',
};

employee.sayHello = helloWorld;
employee.sayHello();
/// [bindingToObj]

/// [bindingToObjProperty]
function helloWorld() {
    console.log(`Hello, ${this.name}`);
}
const employeeWithFunc = {
    name: 'Super Alice',
    sayHello: helloWorld,
};

employeeWithFunc.sayHello();
/// [bindingToObjProperty]

/// [bindingToDifferentObjects]
global.name = 'Bob';
function helloWorld() {
    console.log(`Hello, ${this.name}`);
}
const employee1 = {
    name: 'Alice1',
    sayHello: helloWorld,
};

const employee2 = {
    name: 'Alice2',
    helloWorld: helloWorld,
};

employee1.sayHello();
employee2.helloWorld();
/// [bindingToDifferentObjects]

/// [bindingViceVersa]
const employeeWithFuncDeclaration = {
    name: 'Super Alice In Object',
    sayHello: function () {
        console.log('(I am from function declaration) Hello, ' + this.name);
    },
};

employeeWithFuncDeclaration.sayHello();
const separateFunction = employeeWithFuncDeclaration.sayHello;
separateFunction();
/// [bindingViceVersa]


/// [nestedBinding]
function helloWorld() {
    console.log(`Hello, ${this.name}`);
}

const department = {
    employee1: {
        name: 'Super Alice employee1',
        sayHello: function () { // we define function right in the object
            console.log('...[function inside employee] Hello, ' + this.name);
        },
        sayHelloGlobal: helloWorld, // global function
    },

    sayHello: function () {
        console.log('...[function inside department] Hello, ' + this.name);
    },

    name: 'some big department',
};

department.sayHello();
department.employee1.sayHello();
department.employee1.sayHelloGlobal();
/// [nestedBinding]

/// [looksLikeWeLooseContext]
global.name = 'Bob';
function helloWorld() {
    console.log(`Hello, ${this.name}`);
}

const someObject = {
    name: 'some object',
    sayHello: function () {
        console.log('...[in someObject function declaration] Hello, ' + this.name);
    },
    sayHelloGlobal: helloWorld,
};

function doSomeStuff(cbFunc) {
    // some actions here

    // we call callback function - common action is JS
    cbFunc(); // <-- it's just a reference to function, no this here (=default binding)
}

doSomeStuff(someObject.sayHello);
doSomeStuff(someObject.sayHelloGlobal);
/// [looksLikeWeLooseContext]

/// [thisInCallbacks]
const fs = require('fs');

const fsReaderEventsHandler = {
    dir: __dirname,
    done: function () {
        console.log(`Reading of directory ${this.dir} is finished`);
        console.log(this);
    }
};

// fs.readdir(fsReaderEventsHandler.dir, fsReaderEventsHandler.done); // Reading of directory undefined is finished Object [global]

// hey, some functions could even set its own this!
// setTimeout(fsReaderEventsHandler.done, 1); // Reading of directory undefined is finished Timeout {...}
/// [thisInCallbacks]