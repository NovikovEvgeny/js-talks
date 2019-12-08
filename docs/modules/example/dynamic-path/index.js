/// [dynam]
const a = 'A';
let myModule = '';

if (a === 'a') {
	myModule = require('./module');
} else {
	myModule = require('./moduleB');
}

myModule.sayHi();

const name = 'A';
const dynamicModule = require(`./module${name}`);

dynamicModule.sayHi();
/// [dynam]