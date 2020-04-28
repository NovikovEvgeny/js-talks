///[emitter]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');
///[emitter]

///[sync]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.on('event', () => {
  console.log('2');
});

for (let i=0; i < 5; i++) {
	console.log(i);
	if (i===2) myEmitter.emit('event');
}
///[sync]

///[async]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  setImmediate(() => {
  	console.log('an event occurred!');
  	console.log('2');
  });
});

for (let i=0; i < 5; i++) {
	console.log(i);
	if (i===2) myEmitter.emit('event');
}
///[async]

///[once]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.once('event', () => {
  console.log('an event occurred!');
  console.log('2');
});

for (let i=0; i < 5; i++) {
   myEmitter.emit('event');
}
///[once]

///[maxListeners]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.setMaxListeners(1);

myEmitter.on('event', () => {
  console.log('foo');
});
myEmitter.on('event', () => {
  console.log('bar');
});


myEmitter.emit('event');

///[maxListeners]

///[prepend]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('foo');
});
myEmitter.prependListener('event', () => {
  console.log('bar');
});


myEmitter.emit('event');

///[prepend]

///[remove]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

myEmitter.emit('event');

myEmitter.emit('event');
///[remove]


