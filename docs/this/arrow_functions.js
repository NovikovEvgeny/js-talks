
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
