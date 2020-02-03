

const obj = {
  foo: {
    bar: {
      baz: 42,
    },
  },
};

const baz = obj?.foo?.bar?.baz; // 42
console.log(baz);
const safe = obj?.qux?.baz; // undefined
console.log(safe);
