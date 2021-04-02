/// [emptyThisSloppy]
(() => {
    global.name = 'Bob';

    function helloWorldGlobal() {
        console.log(`Hello, ${this.name}`);
    }
    
    helloWorldGlobal();
})();
/// [emptyThisSloppy]

/// [emptyThisStrict]
(() => {
    "use strict";
    global.name = 'Bob';
    
    function helloWorldInStrict() {
        console.log(`Hello, ${this.name}`);
    }
    
    helloWorldInStrict();
})();
/// [emptyThisStrict]
