// string
/// [defineString]
const str1 = 'myString';
const str2 = "myString";
const str3 = `myString`;
console.log(str1, str2, str3);
/// [defineString]
// -----
/// [useVariableInStr]
const someVariable = 555;
const concatenatedStr = `Hello, 550 + 5 = ${someVariable}, that's quite obvious`;
// is equal to
const concatOlderrStr = 'Hello, 550 + 5 = ' + someVariable + ", that's quite obvious";
console.log(concatenatedStr);
console.log(concatOlderrStr);
console.log(concatenatedStr === concatOlderrStr);
/// [useVariableInStr]
// -----
/// [moreThanOneString]
const myDiv = `
<div>
Hello world
</div>
`;
console.log(myDiv);
/// [moreThanOneString]
// -----
/// [charAccess]
let str = `Hello`;

console.log(str[0]);
console.log(str.charAt(0));

// BUT
console.log(str[1000] === undefined);
console.log(str.charAt(1000) === '');
/// [charAccess]
// ----
/// [immutableString]
const myString = 'Hello';
console.log(myString[0]);
myString[0] = 'F';
console.log(myString[0]);
console.log(myString);

const upperCase = myString.toUpperCase();
console.log(upperCase);
console.log(myString);
/// [immutableString]
