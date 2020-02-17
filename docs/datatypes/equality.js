/// [soft]
console.log(null == undefined); // true
function someFunc(a) {
  if (a == null); // the same as if (a === null || a === unefined)
}

const arr = [{
  id: 4,
  otherProp: "bla",
  valueOf: function() {return this.id}
}
];
const iNeedId = 4;

console.log(arr.find(obj => obj == iNeedId)); // will find id
// from other side... it is almost like arr.find(obj => obj.id === iNeedId);
/// [soft]

///[softBad]

const a = "42"; // truthy
const b = true; // truthy
const c = false; // falsy

console.log(a == b); // false

// ok a == b is false, then a == c is true?
console.log(a == c); // false. wtf?
///[softBad]

///[booleanNumber]
console.log("1" == true);
console.log(1 == true);

console.log(0 == false);
console.log("0" == false);
///[booleanNumber]

///[valueOf]
const mySuperObjectOvd = {
  valueOf: function() {
    console.log('valueOf!');
    return this;
  },
  toString: function() {
    console.log('toString!');
    return "somestring"
  }
};

console.log(mySuperObjectOvd == "somestring");
///[valueOf]

///[equalObjects]
const someObj = {a: 5};
console.log(someObj == someObj); //true
const someObj2 = {a: 5};
console.log(someObj == someObj2); //false

const theSameObj = someObj;
console.log(someObj == theSameObj); // true
///[equalObjects]
