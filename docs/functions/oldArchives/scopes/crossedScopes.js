var hello = 'global';

function test() {
  var hello = 'test';
  console.log(hello);
  console.log(global.hello);
  console.log(this.hello);
}

test(); // test