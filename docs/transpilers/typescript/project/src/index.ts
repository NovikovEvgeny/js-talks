import {Countries, Employee} from "./types/typings";

const myEmpl: Employee = {
    location: Countries.RUS,
    name: "",
    phone: "",
    position: 'Developer'
};

console.log(myEmpl.salary);

const myEmpl2 = new ClassEmployee('prop');


console.log(myEmpl2);

function foo(inputArg) {

}

foo(5);

interface SomeObj {
    foo?: {
        bar: string
    }
}

function printDeep(someObj: SomeObj) {
    console.log(someObj.foo?.bar);
    // console.log(someObj.foo && someObj.foo.bar)
}

printDeep({});
