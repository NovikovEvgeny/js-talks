console.log("First line of main.js");
process.nextTick(() => {
    console.log('next tick');
});
// import { foo } from './myModule.js';
// foo();

import { foo } from './cjs-main.cjs';
// wholeModule.foo();
foo();