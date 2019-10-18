



const a = {
    a: 5,
    b: 10,
    [Symbol.iterator]: function*() {
        for (const i in this) {
            if (this.hasOwnProperty(i)) {
                yield this[i];
            }
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



let done = false;

while(!done) {
//    console.log(iter.next());

    let res = iter.next();
    console.log(res.value);
    done = res.done;
}
