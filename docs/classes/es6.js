///[abstraction] 
class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }
}

class Derived extends Abstract {
  constructor() {
    super();
  }
}

//const a = new Abstract();
const b = new Derived();
///[inheritance]
class ClassA {
    constructor() {
        this.propA = 'A';
    }

    methodA() {
        return this.propA;
    }
}

class ClassB extends ClassA {
    constructor() {
        super();
        this.propB = 'B';
    }

    methodA() {
        return 'NEW B';
    }

    methodB() {
        return this.propB + this.methodA();
    }
}

class ClassC extends ClassB {
    constructor() {
        super();
        this.propC = 'C';
    }

    methodC() {
        return this.propC + super.methodB();
    }
}
const c = new ClassC();
console.log(c.methodC());
///[polymorphism]
class Shape {
    area() {
        return 0;
    }
    toString() {
        return Object.getPrototypeOf(this).constructor.name;
    }
}

class Circle extends Shape {
    constructor(r) {
        super();
        this.radius = r;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(w, h) {
        super();
        this.width = w;
        this.height = h;
    }

    area() {
        return this.width * this.height;
    }
}

class Triangle extends Shape {
    constructor(b, h) {
        super();
        this.base = b; 
        this.height = h;
    }

    area() {
        return this.base * this.height / 2;
    }
}

function cumulateShapes(shapes) {
    return shapes.reduce((sum, shape) => {
        if (shape instanceof Shape) {
            console.log(`Shape: ${shape.toString()} - area: ${shape.area()}`);
            return sum + shape.area()
        }
        throw Error('Bad argument shape.');
    }, 0);
}

const shapes = [new Circle(3), new Rectangle(2, 3), new Triangle(3, 4), new Circle(2)];

console.log(cumulateShapes(shapes));
///[encapsulation]
class Car {
    constructor(speedLimit = 100) {
        this.speed = 0;
        this.speedlimit = speedLimit;
    }
    drive(speed) {
        if(speed > this.speedlimit) this.speed = this.speedlimit;
        else this.speed = speed;
    }
    toString() {
        return `Car running at ${this.speed}`;
    }
}
const tesla = new Car();

tesla.drive(120);
console.log(tesla.toString());
