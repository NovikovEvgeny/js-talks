// main.js
const someModule = require('./myModule');
someModule.foo();
someModule.bar();

const someModule2 = require('./myModule');
const { foo, bar } = someModule2;
foo();
bar();

// ---
const { foo, bar } = require('./myModule');
foo();
bar();

const fooCustom = require('./myModule').foo; // pls no. Only if you need to "rename" function
fooCustom();
