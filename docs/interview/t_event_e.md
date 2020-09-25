# Tasks

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    doSomething() {
        setTimeout(() => {
            this.emit('someEvent', 'asdf');
            console.log('hello after 100 ms!');
        }, 100);
    }
}

const myEmitter = new MyEmitter();

myEmitter.on('someEvent', (data) => {
    JSON.parse(data);
    console.log(data.someProperty);
});

myEmitter.doSomething();
```