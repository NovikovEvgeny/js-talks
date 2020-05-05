console.log("First line of main.js");
process.nextTick(() => {
    console.log('next tick');
});
import { foo } from './myModule.js';
foo();

// import wholeModule from './cjs-main.cjs';
// wholeModule.foo();