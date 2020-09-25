# Tasks
```javascript
Promise.resolve()
    .then(() => console.log('1'))
    .then(() => {
        throw new Error('e');
    })
    .catch(e => console.log(e))
    .then(() => {
        throw new Error('e2');
    })
    .then((a) => console.log(a), (a) => console.log(a));
```

```javascript
function getPromise(shouldBeResolved, number) {
    return new Promise((resolve, reject) => {
        return shouldBeResolved ? resolve(number) : reject(number);
    });
}


const promises = [getPromise(true, 1), getPromise(true, 3), getPromise(true, 2)];
Promise.all(promises)
    .then(res => console.log(res))
    .catch(e => console.log(e));



const promises2 = [
    getPromise(true, 1), 
    getPromise(false, 3), 
    getPromise(true, 2)
];
Promise.all(promises2)
    .then(res => console.log(res))
    .catch(e => console.log(e));
```


```javascript
function isLucky() {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve('well it should be always resolved?');
        }
        process.exit(1);
        reject('we should never reject it right?')
    });
}


isLucky()
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })
```