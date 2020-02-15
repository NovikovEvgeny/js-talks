// numbers

/// [howToDefine]
const number1 = 1500000;
const number2 = 1e6; // one million
const number3sameAsNumber1 = 1.5e6; // one and a half million
console.log(number1, number2, number3sameAsNumber1, number1 === number3sameAsNumber1);
const number4 = 0.001;
const number5sameAsNumber4 = 1e-3;
console.log(number4, number5sameAsNumber4, number4 === number5sameAsNumber4);
/// [howToDefine]
// ----
/// [floating]
console.log(0.1 + 0.2 === 0.3);
console.log(0.1 + 0.2);
/// [floating]
// ----
/// [floatingRound]
console.log((0.1 + 0.2).toFixed(3) === (0.3).toFixed(3));
console.log((0.1 + 0.2).toFixed(3));
/// [floatingRound]
// ---
/// [NaN]
const notANumberThing = parseInt('sdf');
console.log(notANumberThing); // NaN
console.log(typeof notANumberThing); // number
/// [NaN]
// ----
/// [NaNCompare]
console.log(NaN < 100);
console.log(NaN > 100);
console.log(NaN == 100);
console.log(NaN === 100);
// even not equal to itself
console.log(NaN == NaN);
console.log(NaN === NaN);
/// [NaNCompare]
// ----
/// [Infinity]
let infinityValue = Number.MAX_VALUE;
infinityValue += infinityValue;
console.log(infinityValue); // Infinity
console.log(5 / Infinity); // 0

const minusInf = infinityValue * -1;
console.log(minusInf); // -Infinity
console.log(5 / minusInf); // -0
/// [Infinity]
// --
/// [FindMax]
const arr = [5, 15, 23, 0, -1];

let max = -Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > max) {
    max = arr[i];
  }
}
console.log(max);
/// [FindMax]
// ---
/// [DivideByZero]
console.log(5 / 0); // Infinity
console.log(-5 / 0); // -Infinity
/// [DivideByZero]
