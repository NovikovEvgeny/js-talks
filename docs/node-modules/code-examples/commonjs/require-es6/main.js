// main.js
const someFile = require('./myModule');
someFile.foo();
someFile.bar();

const fooCustom = require('./myModule').foo; // pls no. Only if you need to "rename" function
fooCustom();


const { foo, bar } = require('./myModule');
foo();
bar();