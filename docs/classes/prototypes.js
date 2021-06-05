///[simple-example]
function Account(login, password){
    this.login = login;
    this.password = password;
}
/* and this is what JS magic adds for us
Account.prototype = {
    constructor: Account
};
*/
const github = new Account('NovikovEvgeny', 'hunter2');
console.log(github.valueOf()); //{Account { login: 'NovikovEvgeny', password: 'hunter2' }}
///[simple-example]
// ---
///[prototype-modification]
function Car(){
}

const car = new Car();

Car.prototype.color = 'black'; //if it's not specified, it's probably black

console.log(car.color);

//in case we lost the reference to original function, we can access the prototype from our child objects

console.log(car.__proto__ === Car.prototype); //true

console.log(car.__proto__.__proto__ === Object.prototype); //true

console.log(car.__proto__.__proto__.__proto__); //null

console.log(Car.prototype.constructor === Car); //true
///[prototype-modification]
// ---
///[empty-object]
const data = Object.create(null);

console.log(data.__proto__); //undefined - no prototype

console.log(data.valueOf); //undefined
///[empty-object]
// ---
///[inheritance]
function Animal(){
    this.wantsFood = true;
}

function Cat(){
    Animal.apply(this);
    this.cute = true;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

const kitty = new Cat();
console.log(kitty instanceof Animal); //true
console.log(kitty.wantsFood); //true
///[inheritance]
// ---
///[abstraction]
function Animal(){
    if(this.constructor === Animal) throw new Error('Trying to instantiate abstract class!');
}
Animal.prototype.speak = function(){
    throw new Error('This method is abstract!');
}

function Cat(){
    Animal.apply(this, arguments);
    this.cute = true;
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.speak = function(){
    console.log('meow!');
}

const lilly = new Cat();
lilly.speak();

function Dog(){
    Animal.apply(this, arguments);
    this.tough = true;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function(){
    console.log('WOOF!');
}

const max = new Dog();
max.speak();
///[abstraction]
// ---
///[polymorphism]
function Animal(){
}

function Cat(){
    Animal.apply(this);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.speak = function(){
    console.log('meow!');
}

function Dog(){
    Animal.apply(this, arguments);
    this.tough = true;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function(){
    console.log('WOOF!');
}

const rex = new Dog();
const leo = new Cat();

const myPets = [rex, leo];

console.log('Behold, my pets can talk on comand!');
for(const pet of myPets) {
    if(pet instanceof Animal) {
        pet.speak();
    }
}
///[polymorphism]
// ---
///[util-inherits]
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

///[util-inherits]
// ---
///[util-inherits-use]
const util = require('util');
function Person(){
    this.name = 'Sergey'
}

Person.prototype.sayHi = function(){
    console.log(`Hi, my name is ${this.name}`);
}

function Employee() {
    Person.apply(this);
    this.employeeNumber = '123';
}

util.inherits(Employee, Person);
const engineer = new Employee();
engineer.sayHi();
///[util-inherits-use]
// ---
