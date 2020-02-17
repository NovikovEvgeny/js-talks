///[clearCoercion]
const someNum = 42;
console.log(typeof someNum);
// cast
const someStr = String(someNum);
// create instance of String "class" and coercion
const someStrObj = new String(someNum);

console.log(typeof someStr); // string
console.log(typeof someStrObj); // object

const someNumCasted = Number(someStr);
const someNumParsed = parseInt(someStr);
console.log(someNumCasted, typeof someNumCasted);
console.log(someNumParsed, typeof someNumParsed);
///[clearCoercion]

///[notSoClearCoercion]
const foo = 42;
const fooAsStr = foo + ""; // second arg is string -> fooAsStr 100% string
const fooAlsoAsStr = fooAsStr.toString(); // also kinda obvious

console.log(foo, typeof foo);
console.log(fooAsStr, typeof fooAsStr);
console.log(fooAlsoAsStr, typeof fooAlsoAsStr);

const barAsNum = +fooAsStr; // unary operator "+" means "cast to number"
console.log(barAsNum, typeof barAsNum);

console.log(foo + +fooAsStr); // наркомания же какая то, ну

console.log(!foo, typeof !foo); // false
///[notSoClearCoercion]

///[maybeUnclearCoercion]
const a = "hey there";
if (a) {
  console.log(a);
} // also for (; ; ); do .. while() and while() .. do; and ternary operator and any other boolean context

const b = "42";
const c = 42;
console.log(b == c); //true. note "==", not "==="
///[maybeUnclearCoercion]

///[defaultValue]
function logWithDefault(input) {
  console.log(input || "defaultValue");
}

// any of "falsy" values will be ignored. If we need empty string or 0, we have a problem
logWithDefault("hello world");
logWithDefault(5);
logWithDefault(0); // oopsie
logWithDefault(""); // oopsie
logWithDefault(false); // oopsie
logWithDefault(); // that's fine
///[defaultValue]

///[orOperator]
const aValue = 'some string';
const aOrDefault = aValue || 'default';
const falseOrDefault = false || 'default';
const alwaysDefault = aValue && 'default';
console.log(aValue, aOrDefault, falseOrDefault, alwaysDefault);
///[orOperator]

///[andOperator]
const bigObject = {
  nestedObj: {
    foo: function() { console.log("Hello world!") }
  }
};

bigObject && bigObject.nestedObj && bigObject.nestedObj.foo();
///[andOperator]
