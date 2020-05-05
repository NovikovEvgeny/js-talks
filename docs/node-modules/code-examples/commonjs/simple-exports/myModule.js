// myModule.js
console.log('I am a module with no export!');

setTimeout(() => {
    module.exports.bla = function () {
        console.log('lol');
    }
});