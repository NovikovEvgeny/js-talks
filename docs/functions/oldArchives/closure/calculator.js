function calculator(a) {
  let res = 0;

  function calc(c) {
    res += c;
    // console.log(res);
    return {
      getResult: () => res,
      add: calc,
    };
  }

  return calc(a);
}


let value = calculator(3);
value.add(6)
  .add(7);

console.log(value.add(8).getResult())