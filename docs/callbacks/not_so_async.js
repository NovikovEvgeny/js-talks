

{
/// [not-so-async]
    function iAmAsyncFunction(callback) {
        console.log('ok this is executed as expected');
        callback('trolled');
    }

    iAmAsyncFunction((res) => {
        console.log(res);
    });
    console.log('this should be printed first, right?');
/// [not-so-async]
}

{
/// [so-async]
    function iAmAsyncFunction(callback) {
        console.log('ok this is executed as expected');
        callback('trolled');
    }

    iAmAsyncFunction((res) => {
        process.nextTick(() => console.log(res));
    });
    console.log('this should be printed first, right?');
/// [so-async]
}

{
/// [async-emitter]
    const EventEmitter = require('events');

    class Example extends EventEmitter {
        constructor() {
            super();
            process.nextTick(() => this.emit('event'));
        }
    }

    const example = new Example();
    example.on('event', function() {
        console.log('on event listener');
    });
/// [async-emitter]
}
