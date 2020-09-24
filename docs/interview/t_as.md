
```javascript
process.nextTick(() => {
    console.log('tick');
});

setImmediate(() => {
    console.log('immediate');

    setTimeout(() => {
        console.log('inner timeout');
    }, 0);

    setImmediate(() => {
        console.log('inner immediate');
    });
});

setTimeout(() => {
    console.log('timeout');
}, 0);

const ignoreThisLine = '';
```



```javascript
try {
    setTimeout(() => JSON.parse('asdf'), 0);
} catch (e) {

}
```

```javascript
let counter = 0;
while (true) {
   counter = 0;
   setTimeout(() => {
      counter++
      console.log(counter);
   }, 0);
}
```

```javascript
setTimeout(function() {
  console.log('delayed by 1500')
}, 1500);

for(var i = 0; i < 1e5; i++) {
  // this for LOOP is executing 3000ms
}
```

