// main.js
console.log('before require');
const m = require('./myModule.js');
console.log('after require');
console.log(m);


setTimeout(() => {
    m.bla();
    console.log(m);
}, 1000);
