///[newfoo]
function Foo(arg1, arg2) {
    console.log('We\'re creating!', arg1, arg2);
}

let myBigFoo = new Foo('arg1','arg2');

let myLittleFoo = new Foo;

myBigFoo.bar = 'bar';

console.log(myBigFoo.bar, myLittleFoo.bar);

///[incapsulation-bad]
function Bus(stopsArray) {
    this.stops = stopsArray;
    this.currentStop = this.stops[0];
    this.drive = () => {
        let index = this.stops.indexOf(this.currentStop) + 1;
        if(index == this.stops.length) index = 0;
        this.currentStop = this.stops[index];
        return this.currentStop;
    };
}

const myBus = new Bus(['Пулковский парк','Площадь Победы','Метро Московская', 'Авиационная улица']);
console.log(myBus.currentStop);
myBus.drive();
console.log(myBus.currentStop);
myBus.currentStop = 'Балтийский вокзал';
console.log(myBus.currentStop);
myBus.drive();
console.log(myBus.currentStop);
///[incapsulation-attempt]
function Bus(stopsArray) {
    this.stops = stopsArray;
    this.currentStop = this.stops[0];
    this.drive = () => {
        let index = this.stops.indexOf(this.currentStop) + 1;
        if(index == this.stops.length) index = 0;
        this.currentStop = this.stops[index];
        return this.currentStop;
    };
    this.setCurrentStop = (stop) => {
        if(this.stops.includes(stop)) return this.currentStop = stop;
        throw new Error('Неверная остановка!');
    }
    this.getCurrentStop = () => this.currentStop;
}
const myBus = new Bus(['Пулковский парк','Площадь Победы','Метро Московская', 'Авиационная улица']);
console.log(myBus.getCurrentStop());
myBus.setCurrentStop('Авиационная улица');
console.log(myBus.getCurrentStop());
//no validation logic here!
myBus.currentStop = 'Балтийский вокзал';
console.log(myBus.getCurrentStop());
///[incapsulation-solution]
function Bus(stopsArray) {
    const stops = stopsArray;
    let currentStop = stops[0];
    
    const busObject = {
        drive: () => {
            let index = stops.indexOf(currentStop) + 1;
            if(index == stops.length) index = 0;
            currentStop = stops[index];
            return currentStop;
        },
        setCurrentStop: (stop) => {
            if(stops.includes(stop)) return currentStop = stop;
            throw new Error('Неверная остановка!');
        },
        getCurrentStop: () => currentStop
    }

    return busObject;
}
const myBus = new Bus(['Пулковский парк','Площадь Победы','Метро Московская', 'Авиационная улица']);
console.log(myBus);
console.log(myBus.getCurrentStop());
myBus.setCurrentStop('Авиационная улица');
console.log(myBus.getCurrentStop());
//this will not change our internal variable!
myBus.currentStop = 'Балтийский вокзал';
console.log(myBus.getCurrentStop());
