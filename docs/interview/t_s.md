# Tasks

```javascript
var b = 2;

(function doThings() {
    var a = b = 1;
})();

console.log(b);
```

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
      console.log(`callback # ${i} is fired`);
  }, i * 100);
}
void 0;
```
