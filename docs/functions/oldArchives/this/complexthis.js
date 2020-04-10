

function getFoo() {
  return this.foo;
}

const someObj = {
    foo: 5,
    foonc: getFoo,
}

console.log(someObj.foonc());

// ---

const otherObj = {
    foo: 10,
    foonc: someObj.foonc,
    fooncplain: getFoo,
}
console.log(otherObj.foonc());
console.log(otherObj.fooncplain());

// ----

const thridObj = {
    foo: 15,
}

thridObj.foonc = someObj.foonc;

console.log(thridObj.foonc());

// ----

const fourthObj = Object.assign({}, someObj, {foo: 20});
console.log(fourthObj.foonc());

// ---

const fifthObj = Object.create(someObj);
fifthObj.foo = 25;
console.log(fifthObj.foonc());

// ----

const sixthObj = Object.create(someObj);
sixthObj.foo = 25;
global.foo = 1488;

function executeFoo(fn) { // reference to function
  return fn();
}

console.log(executeFoo(sixthObj.foonc));


// ---

function logFoo() {
    console.log(this.foo);
}

const seven = {
    foo: 30,
    foonc: logFoo,
}

setTimeout(seven.foonc, 1000); 

setTimeout(function() {
    seven.foonc()
}, 1000); 
