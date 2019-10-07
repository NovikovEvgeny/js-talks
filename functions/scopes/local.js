
function printHelloWorld() {
    var str = 'Hello world!';
  
    function print() {
      console.log(str);
    }

    print();
  }
  
  printHelloWorld();
//   print(); // ReferenceError: print is not defined
//   console.log(str); ReferenceError: str is not defined