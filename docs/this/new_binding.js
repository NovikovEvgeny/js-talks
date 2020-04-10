
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
