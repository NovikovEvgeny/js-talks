/// [typeofPrimitives]
// typeof <primitive>
console.log(typeof 148 === "number");
console.log(typeof "148" === "string");
console.log(typeof true === "boolean");
console.log(typeof undefined === "undefined");
console.log(typeof BigInt(22) === 'bigint');
/// [typeofPrimitives]
// -----
/// [typeofNull]
// BUT
// yeah, don't use "typeof" for null values
console.log(typeof null === "object");  // lol, because it's JS
/// [typeofNull]
// ------
/// [typeofObject]
// Build-in "Natives"
console.log(typeof { hello: "world" } === "object");
console.log(typeof [1, 2, 3] === "object");
console.log(typeof new Array(1, 2, 3) === "object");
console.log(typeof new Number() === "object");
console.log(typeof new Date() === "object");
console.log(typeof /.*/ === "object");
/// [typeofObject]
// ---
/// [typeofFunction]
// BUT
console.log(typeof function() {console.log('hi!')} === "function");  // lol, why not
/// [typeofFunction]
//---
/// [typeofUndefined]
console.log(typeof undefinedVal); // undefined
console.log(undefinedVal); // ReferenceError: undefinedVal is not defined
/// [typeofUndefined]
