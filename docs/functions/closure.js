///[closure]
function iHaveASecret() {
    const secret = 'very secret phrase';

    return function tellSecret() {
      console.log(`hey, do not tell anyone, but the secret is : ${secret}`);
    }
  }

  const blah = iHaveASecret();
  blah();

  console.log(new iHaveASecret().secret);
  console.log(iHaveASecret.secret);
  console.log(iHaveASecret.prototype.secret);
  console.log(new iHaveASecret().prototype.secret);
///[closure]


///[calculator]
function calculator(a) {
  let res = 0;

  function sum(c) {
    res += c;
    console.log(res);
    return sum;
  }

  return sum(a);
}


let value = calculator(3);
value(6)(7);

console.log(value(8))
///[calculator]


///[ubercalculator]
function calculator(a) {
  let res = 0;

  function calc(c) {
    res += c;
    return {
      getResult: () => res,
      add: calc,
    };
  }

  return calc(a);
}


let value = calculator(3);
value.add(6).add(7);

console.log(value.add(8).getResult())
///[ubercalculator]