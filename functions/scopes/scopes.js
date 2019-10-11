
var gStr = 'Hello world from global!';

function print() {
    throw new Error('Whatever, it will not be thrown anyway');
}

function outerFunction() {
  var str = 'Hello world!';
  let str2 = 'Hello world from outer';

  function print() {
    var str = 'Hello world from print!';
    console.log(str);
    console.log(str2);
    console.log(gStr);
  }

  print();
}

outerFunction(); // 'Hello world from print!', 'Hello world from outer', 'Hello world from global!'