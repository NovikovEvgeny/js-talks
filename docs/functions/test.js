



class MyClass {
    constructor() {
        this.a = 5;
    }

    someFunc () {
        console.log(this.a);
    }

    someArrowFunc = () => {
        console.log(this.a);
    }
}

const c = new MyClass();
c.someFunc.call({a: 10});
c.someArrowFunc.call({a: 10});

process.exit(0);

function MyObjF() {
    this.a = 5;

    this.someFunc = function() {
        console.log(this.a);
    }

    this.someArrowFunc = () => {
        console.log(this.a);
    }
}

const mof = new MyObjF();
mof.someFunc.call({a: 10});
mof.someArrowFunc.call({a: 10});

process.exit(0);

const myObj = {
    a: 5,
    someFunc: function() {
        console.log(this.a);
    },
    someArrowFunc: () => {
        console.log(this.a);
    }
}

myObj.someFunc();
myObj.someArrowFunc();

process.exit(0);


const a = {
    a: 5,
    b: 10,
    // [Symbol.iterator]: function*() {
    //     for (const i in this) {
    //         if (this.hasOwnProperty(i)) {
    //             yield this[i];
    //         }
    //     }
    // }
    [Symbol.iterator]: function() {
        let currentIteratorValue = 0;
        const values = Object.values(this);
        return {
            next: () => ({
                done: currentIteratorValue >= values.length,
                value: values[currentIteratorValue++],
            })
        }
    }
}


for (const i of a) {
    console.log(i);
}



const iter = a[Symbol.iterator]();

// console.log(iter);
// console.log(Object.keys(iter));

// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());



let res = iter.next();

while(!res.done) {
    console.log(res.value);
    res = iter.next();
}



function* myGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = myGenerator();

console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())