///[direct]
function greet(name) {
  console.log(`hello ${name || 'world'}!`);
}

greet('space');
///[direct]


///[apply]
function greet(name) {
  console.log(`hello ${name || 'world'}!`);
}

greet.apply(null, ['space', 'mim']); 
///[apply]


///[call]
function greet(name) {
  console.log(`hello ${name || 'world'}!`);
}

greet.call(null, 'space'); 
///[call]


///[bind]
function greet(name) {
  console.log(`hello ${name || 'world'}!`);
}

greet.bind(null, 'space')();
///[bind]


///[bindcall]
function greet(name) {
  console.log(`hello ${name} || 'world'}!`);
}

greet.bind(null, 'space').call(null, 'nothing');
///[bindcall]


///[iife]
(function(input) {
  console.log('Your input is ' + input);
})(5);
///[iife]


///[iifeIsolate]
var input = 'Bob';
(function() {
  var input = 'Ameli';
  console.log('Your input is ' + input);
})();
input = 'Rob';
///[iifeIsolate]


///[iifeAsync]
async function sleep(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}

(async function() {
  await sleep(2000);
  console.log('wake up!');
})();
///[iifeAsync]


///[callback]
const fs = require('fs');

fs.readdir('./', (err, files) => {
  if (err) {
    throw err;
  }
  console.log(files);
});

console.log('I declared callback before this line, but it will be executed after!');
///[callback]


///[callbackAlternative]
const fs = require('fs');

const fsCallback = function(err, files) {
    if (err) throw err;
    console.log(files);
}

fs.readdir('./', fsCallback);

console.log('I declared callback before this line, but it will be executed after!');
///[callbackAlternative]

