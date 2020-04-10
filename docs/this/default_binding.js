/// [emptyThisSloppy]
global.name = 'Bob';

function helloWorldGlobal() {
    console.log(`Hello, ${this.name}`);
}

helloWorldGlobal();
/// [emptyThisSloppy]

/// [emptyThisStrict]
try {
    global.name = 'Bob';

    function helloWorldInStrict() {
        "use strict";
        console.log(`Hello, ${this.name}`);
    }

    helloWorldInStrict();
} catch (error) {
    if (error.message === 'Cannot read property \'name\' of undefined') {
        console.log('Oopsie, error: ' + error.message);
    } else {
        throw error;
    }
}
/// [emptyThisStrict]
