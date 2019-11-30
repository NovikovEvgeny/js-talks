// This binding examples

/// [emptyThisSloppy]
global.name = 'Bob';

function helloWorld() {
  console.log(`Hello, ${this.name}`);
}

helloWorld(); // Hello, Bob
/// [emptyThisSloppy]

// ---------

/// [emptyThisStrict]
try {
  // IIFE
  (function () {
    "use strict";
    global.name = 'Bob';

    function helloWorld() {
      console.log(`Hello, ${this.name}`);
    }

    helloWorld();
  })();
} catch (error) {
  if (error.message === 'Cannot read property \'name\' of undefined') {
    console.log('Oopsie, error: ' + error.message); // Oopsie, error: Cannot read property 'name' of undefined
  } else {
    throw error;
  }
}
/// [emptyThisStrict]

/// [bindingToObj]
const employee = {
  name: 'Alice',
};

employee.sayHello = helloWorld;
employee.sayHello(); // Hello, Alice
/// [bindingToObj]
// -----------------------
/// [bindingToObjProperty]
const employeeWithFunc = {
  name: 'Super Alice',
  sayHello: helloWorld,
};

employeeWithFunc.sayHello(); // Hello, Super Alice
/// [bindingToObjProperty]
// -----------------------
/// [bindingToDifferentObjects]
const employee1 = {
  name: 'Alice1',
  sayHello: helloWorld,
};

const employee2 = {
  name: 'Alice2',
  sayHello: helloWorld,
};

employee1.sayHello(); // Hello, Alice1
employee2.sayHello(); // Hello, Alice2
/// [bindingToDifferentObjects]
// -------------------------
/// [bindingViceVersa]
const employeeWithFuncDeclaration = {
  name: 'Super Alice In Object',
  sayHello: function () {
    console.log('...[declaration] Hello, ' + this.name);
  },
};

employeeWithFuncDeclaration.sayHello(); // ...[declaration] Hello, Super Alice In Object
const separateFunction = employeeWithFuncDeclaration.sayHello;
separateFunction(); // ...[declaration] Hello, Bob
/// [bindingViceVersa]
// ------------------------

/// [nestedBinding]
const department = {
  employee1: {
    name: 'Super Alice employee1',
    sayHello: function () { // we define function right in the object
      console.log('...[declaration] Hello, ' + this.name);
    },
    sayHelloGlobal: helloWorld, // global function
  },
  sayHello: function () {
    console.log('...[declaration] Hello, ' + this.name);
  },
  name: 'some big department',
};

department.sayHello(); // ...[declaration] Hello, some big department
department.employee1.sayHello(); // ...[declaration] Hello, Super Alice employee1
/// [nestedBinding]
// -----------
/// [looksLikeWeLooseContext]
function doSomeStuff(cbFunc) {
  // some actions here
  cbFunc(); // <-- it's just a reference to function, no this here (=default binding)
}

doSomeStuff(department.employee1.sayHello); // ...[declaration] Hello, Bob
doSomeStuff(department.employee1.sayHelloGlobal); // Hello, Bob
/// [looksLikeWeLooseContext]
// ------------
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
printThisColor.call( { color: 'green' }); // green
printThisColor.apply( { color: 'red' }); // red
printThisColor.bind( { color: 'black' })(); // black

// Once bound - bound forever!
printThisColor.bind( { color: 'black' }).call({ color: 'whatever' }); // black

/// [hardBinding]
// -------------
/// [whyBoundForever]
function bind(foo, contentObj, ...args) {
  return function (...args2) {
    foo.call(contentObj, ...args, ...args2);
  }
}

function printThisColorWithArgs(...args) {
  console.log('color is ' + this.color + ' and args are ' + args);
}
const boundFunction = bind(printThisColorWithArgs, { color: 'yellow'}, 'one');

boundFunction.call({color: 'whatever, it won\'t be used'}, 'two', 'three'); //color is yellow and args are one,two,three
boundFunction.call({color: 'asdf' }, 'one', 'two', 'three'); // color is yellow and args are one,one,two,three
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
