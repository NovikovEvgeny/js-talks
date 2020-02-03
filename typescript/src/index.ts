

class SomeObj {
    foo?: {
        bar: string
    }
}

function printDeep(someObj: SomeObj) {
    console.log(someObj.foo?.bar);
    // console.log(someObj.foo && someObj.foo.bar)
}

printDeep({});
