///[isObject]
function thisFunction() {}
const thatFunction =  function() {};

console.log(thisFunction instanceof Object);
console.log(thatFunction instanceof Object);
///[isObject]


///[functionDeclar]
function foo() {
    console.log('Hello');
}

foo();
///[functionDeclar]


///[functionExpress]
const foo = function() {
    console.log('Hello');
}

foo();
///[functionExpress]


///[functionDeclarationHoisting]
printHelloDeclaration();

function printHelloDeclaration() {
  console.log('Hello world');
}
///[functionDeclarationHoisting]


///[functionExpressionHoisting]
printHelloExpressionVar('world');

var printHelloExpressionVar = function() {
  console.log('Hello, ' + name);
};
///[functionExpressionHoisting]


///[functionArrow]
const arrowFunction = () => {
    console.log('Hello');
}

arrowFunction();
///[functionArrow]


///[functionArrowContext]
const object = {
    name: 'Alice',
    greet: function() {console.log(`Hi, ${this.name}`)}
}
const arrow = {
    name: 'Alice',
    greet: () => {console.log(`Hi, ${this.name}`)}
}
object.greet();
arrow.greet();
///[functionArrowContext]


///[functionMethod]
const module = {
    greet: () => {console.log('Hello')},
    bye: () => 42,
}

console.log(module.bye());
///[functionMethod]


///[functionProt]
const sum = new Function('a', 'b', 'return a + b');

console.log(sum(2, 6));
///[functionProt]


///[functionProtScope]
a = 20;
{
  const a = 10;
  const sumGlobal = new Function('b', 'return a + b');
  console.log(sumGlobal(6));
}
///[functionProtScope]


///[functionEval]
b = 15;
globalA = 20;
{
  let globalA = 10;
  console.log(eval('globalA'));
  console.log(eval('b'));
}

///[functionEval]
