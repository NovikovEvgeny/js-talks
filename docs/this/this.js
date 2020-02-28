// This binding examples

/// [emptyThisSloppy]
global.name = 'Bob';

function helloWorldGlobal() {
  console.log(`Hello, ${this.name}`);
}

helloWorldGlobal();
/// [emptyThisSloppy]

/// [emptyThisStrict]
try {
  global.name = 'Bob';

  function helloWorldInStrict() {
    "use strict";
    console.log(`Hello, ${this.name}`);
  }

  helloWorldInStrict();
} catch (error) {
  if (error.message === 'Cannot read property \'name\' of undefined') {
    console.log('Oopsie, error: ' + error.message);
  } else {
    throw error;
  }
}
/// [emptyThisStrict]

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

// ----------- Hard binding -----------

/// [hardBinding]
function printThisColor() {
  console.log(this.color)
}

printThisColor();
printThisColor.call({ color: 'green' });
printThisColor.apply({ color: 'red' });
printThisColor.bind({ color: 'black' })();

// Once bound - bound forever!
printThisColor.bind( { color: 'black' }).call({ color: 'whatever' }); // black

/// [hardBinding]
// -------------
/// [whyBoundForever]
function bind(foo, contentObj, ...args) {
  // just to understand what is "...args"
  console.log(Array.isArray(args));

  // we return new function here. This function is NOT called right here
  // this is just a new instance of the function - when this "new function" is called,
  // then "foo.call" happens, with hard binding to "contentObj" and
  // first part of arguments args, second - args2
  return function (...args2) {
    foo.call(contentObj, ...args, ...args2);
  }
}

function printThisColorWithArgs(...args) {
  console.log('color is ' + this.color + ' and args are ' + args);
}
const boundFunction = bind(printThisColorWithArgs, { color: 'yellow'}, 'one', 'two');

boundFunction.call({color: 'whatever, it won\'t be used'}, 'three', 'four');
boundFunction.call({color: 'asdf' }, 'one', 'two', 'three');
/// [whyBoundForever]

// ------------------- new binding -------------------

/// [newBinding]
/*
When "new" called before function:
1. new object created
2. set context to this object for a function
3. call function (remember: it is bound to the object because of step 2)
4. return created object
 */

function KindaClass (name) {
  this.name = name;
  console.log('Kinda class initialized');

  this.sayName2 = function() {
    console.log('from KndaClass ' + this.name);
  }
}

KindaClass.prototype.sayName = function () {
  console.log('from KindaClass ' + this.name);
};

const classInstance = new KindaClass('mycoolName'); // Kinda class initialized
console.log(classInstance.name); // mycoolName
classInstance.sayName(); // from KindaClass mycoolName
classInstance.sayName2(); // from KindaClass mycoolName

// Hey, but since after "new" calling 'classInsatnce' is just an object, you still have to be careful with it's methods
const separateKindaFunction = classInstance.sayName;
separateKindaFunction(); // from KindaClass Bob

const separateKindaFunction2 = classInstance.sayName2;
separateKindaFunction2(); // from KindaClass Bob
/// [newBinding]

// ---------- es arrow function ----------

/// [arrowFunctions]
// it is still not "real" class, so let's use "Lol" suffix
class RealClassLol {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    // the following operation will print "true" if mode is strict and false otherwise (thanks stackoverflow)
    // console.log((function() { return !this; })());

    console.log(this.name);

    fs.readdir(__dirname, () => {
      console.log('arrow function cb');
      console.log(this.name);
    });

    // before ES6 we used closure mechanism to change "this" to separate variable
    const self = this;
    fs.readdir(__dirname, function () {
      console.log('function cb');
      console.log(self.name);
    });
  }

  sayHelloWithWrongCb() {
    fs.readdir(__dirname, function () {
      console.log('function cb');
      console.log(this.name);
    });
  }

}

const realClass = new RealClassLol('realName');
realClass.sayName(); // realName -> arrow function cb -> realName -> function cb -> readlName
// realClass.sayName.call({ name: 'bouldName' }); //bouldName -> arrow function cb -> bouldName

// all new ES6 syntax uses "use strict" by default, and "this" is undefined in "global" functions without explicit binding
// realClass.sayHelloWithWrongCb(); // function cb -> Type Error: Cannot read property 'name' of undefined
/// [arrowFunctions]
// ------------
/// [arrowFunctionInObjects]
const myObject = {
  name: 'MyObject name',

  readdirBad: function() {
    fs.readdir(__dirname, function() {
      console.log('directory is read and name is ' + this.name);
    })
  },

  readDirGood: function() {
    fs.readdir(__dirname, () => {
      // this is just an object,
      // and there is no "use strict" on top of the file/function
      // so "this" here will be equal to global object
      console.log('directory is read and name is ' + this.name);
    })
  },
};

myObject.readDirGood(); // directory is read and name is MyObject name
myObject.readdirBad(); // directory is read and name is Bob
/// [arrowFunctionInObjects]
