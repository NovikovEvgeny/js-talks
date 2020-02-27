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

