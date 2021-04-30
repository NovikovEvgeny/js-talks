///[emitter]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');
///[emitter]

///[emitterClass]
const EventEmitter = require('events');

class IAmDoingSomethig extends EventEmitter {
  doSomething() {
    // faking async operation or any other operation
    setTimeout(() => {
      this.emit('event1', 'message From do something');
    }, 1000);
  }
  
  doSomethingElse() {
    // faking async operation or any other operation
    setTimeout(() => {
      this.emit('event2', 'message From do something else', 25);
    }, 1500);
  }
}

const myEmitter = new IAmDoingSomethig();

myEmitter.on('event1', (data) => {
  console.log(`an event1 occurred! Argument is ${data}`);
});

myEmitter.on('event2', (data, data2) => {
  console.log(`another event occurred! Arguments: ${data} ${data2}`);
});

myEmitter.doSomething();
myEmitter.doSomethingElse();
///[emitterClass]

///[sync]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  doSomething() {
    for (let i=0; i < 5; i++) {
      console.log(i);
      if (i===2) {
        this.emit('event');
      }
    }
  }
}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.on('event', () => {
  console.log('2');
});

myEmitter.doSomething();
///[sync]


///[syncError]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  async doSomething() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.emit('event after 1 sec', 'some message');
    // we'll never see this line in the console
    console.log('Hello from event emitter!');
  }
}

const myEmitter = new MyEmitter();

myEmitter.on('event after 1 sec', () => {
  console.log('an event occurred!');
  JSON.parse('asdf');
});

myEmitter.doSomething();
///[syncError]

///[async]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  doSomething() {
    for (let i=0; i < 5; i++) {
      console.log(i);
      if (i===2) {
        this.emit('event');
      }
    }
  }
}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  setImmediate(() => {
  	console.log('an event occurred!');
  	console.log('2');
  });
});

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


///[emitBoolean]
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  doSomething() {
    const res1 = this.emit('event1');
    const res2 = this.emit('event2');
    console.log(res1, res2);
  }
}

const myEmitter = new MyEmitter();

myEmitter.on('event1', () => {
  console.log('on event 1');
});

myEmitter.doSomething();

///[emitBoolean]

