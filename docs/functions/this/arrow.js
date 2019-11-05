




class AClass {
    constructor(init) {
        this.a = init;
    }

    printWithSleepArrow() {
        console.log(this);
        setTimeout(() => {
            console.log(this.a);
        }, 100);
    }

    printWithSleepFunc() {
        console.log(this);
        setTimeout(function() {
            console.log(this.a);
        }, 500);
    }
}

const instance = new AClass(10);
instance.printWithSleepFunc({a: 15});
instance.printWithSleepFunc.call({a: 15});
instance.printWithSleepArrow.call({a: 15});
// instance.printWithSleepArrow();

// ----

// console.log(this);
// testThisArr = () => console.log(this);
// testThisArr();
// // haha, .call whatever you want, this won't change
// testThisArr.call({a: 10});


// function testThis() {
//     console.log(String(this));
// }

// testThis();
// testThis.call({a: 10});