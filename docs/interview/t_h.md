# Tasks

```javascript
function callTaxi() {
  var taxi = getAvailableTaxi();

  return taxi.toUpperCase();
 
  var getAvailableTaxi = function() {
    return 'taxi 5'
  };
}

callTaxi();
```

```javascript
var foo = 5;

function test() {
  if (foo) {
    console.log('foo exists and equals to ' + foo);
  } else {
    var foo = 666;
    console.log('foo did not exist but now it equals to ' + foo);
  }
}

test();
```
