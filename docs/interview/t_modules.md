# Modules

a.js
```javascript
// a.js

const b = require('./b')


console.log(b.helloStringFromB);

module.exports = {
    helloStringFromA: 'hello from a'
}

```

```javascript
// b.js
const a = require('./a')


console.log(a.helloStringFromA);


module.exports = {
    helloStringFromB: 'hello from a'
}
```

start:
```bash
node a.js
```