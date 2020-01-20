function foo() {
    let a = "outer";

    for (let x = 0; x < 3; ++x) {
        console.log(a);            // ReferenceError: a is not defined
        let a = 27;
    }

}
foo();
