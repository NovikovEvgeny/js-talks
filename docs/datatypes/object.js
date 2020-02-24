// Object usages

/// [objectKeys]

let obj = {
  a: 5,
};

// absolutely the same:
console.log(obj.a);
console.log(obj["a"]);

let variable = "a";
console.log(obj[variable]);

obj.b = function() { console.log ("Hello") };
obj["b"] = function() { console.log ("Hello") };

variable = "b";
obj[variable] = function() { console.log ("Hello") };
obj[variable]();
/// [objectKeys]

/// [objectKeysExpression]
let obj = {};
obj["content-length"] = 5;

let variable = "content-length";
console.log(obj[variable]);
/// [objectKeysExpression]

/// [objectBoxing]
console.log(typeof 'str') // "string" primitive string! not an object!
console.log(typeof new String('str')); // "object" !
console.log('str'.toUpperCase()); // "STR". // Automatically boxed to String and `toUpperCase()` method called
console.log(new String('str').toUpperCase()); // "STR"

console.log(new Boolean(false));

console.log(new Number(55));
console.log(new Number("55"));

// no need to use explicit boxing usually, it can even hurt you
var someBool = new Boolean(false);
if (someBool) {
  console.log("someBool is true"); // gotcha. someBool is an object and object is always truthy
} else {
  console.log("someBool is false");
}
/// [objectBoxing]

///[objectConstructor]
// Makes sense to use Native cuonstructors for Error and Date:
const err = new Error('error message');
console.log(err);
const date = (new Date()).getTime();
console.log(date);
///[objectConstructor]

///[newVsCoercion]
const iAmString = '1';
console.log(iAmString, typeof iAmString);
const iAmObjectString = new String(iAmString);
console.log(iAmObjectString, typeof iAmObjectString);

const iAmNumber = Number(iAmString);
console.log(iAmNumber, typeof iAmNumber);

const iAmObjectNumber = new Number(iAmString);
console.log(iAmObjectNumber, typeof iAmObjectNumber);
///[newVsCoercion]

///[referenceVsValue]
function bar(inputarg) {
  // this will change
  inputarg.morebar = 15;
  // but this will not
  inputarg = { somethingElse: 'else' };
}

const obj = {bar: 10};
bar(obj);
console.log(obj, JSON.stringify(obj)); // {bar: 10, morebar: 15}

const str = 'string';
bar(str);
console.log(str, str.morebar);
///[referenceVsValue]

///[objectFreeze]
function barFreeze(inputarg) {
    inputarg.morebar = 15;
    inputarg.bar = 15;
}

const objectFreeze = {bar: 10};

Object.freeze(objectFreeze);

barFreeze(objectFreeze);
console.log(objectFreeze, JSON.stringify(objectFreeze)); // {bar: 10}
///[objectFreeze]

///[objectFreezeDeep]
function barFreezeDeep(inputarg) {
    inputarg.morebar = 15;
    inputarg.bar = 15;
    inputarg.foo.baz = 15;
}

const objFreezeDeep = {bar: 10, foo: { baz: 10 }};

Object.freeze(objFreezeDeep);

barFreezeDeep(objFreezeDeep);
console.log(objFreezeDeep, JSON.stringify(objFreezeDeep)); // {bar: 10}
///[objectFreezeDeep]

///[objectDelete]
const objDelete = {
  iAmProperty: 'property',
  iAmObject: { foo: 'bar' },
};

console.log(JSON.stringify(objDelete));
delete objDelete.iAmProperty;
console.log(JSON.stringify(objDelete));
delete objDelete.iAmObject;
console.log(JSON.stringify(objDelete));
///[objectDelete]
