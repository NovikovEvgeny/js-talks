# Promise

Promise это stateful-объект, который может находится в одном из трех состояний:

![](https://learn.javascript.ru/article/promise/promiseInit.png)

При создании промиса состояние по умолчанию - pending, далее он может сменить состояние **один** раз.
```
new Promise( async function )
    PromiseState = 'pending'
    PromiseResult = undefined
    PromiseFulfillReactions: []
    PromiseRejectReactions: []
```


[filename](promise.js ':include :type=code :fragment=synt')

Обработка реакций:

[filename](promise.js ':include :type=code :fragment=then')

try-catch не работает снаружи промиса

[filename](promise.js ':include :type=code :fragment=try')

return в хэндлерах всегда вернет новый промис

[filename](promise.js ':include :type=code :fragment=chain')

reject или resolve не выходят из тела функции

[filename](promise.js ':include :type=code :fragment=noreturn')

Методы прототипа - `.all`, `.race`, `.allSettled`.

[filename](promise.js ':include :type=code :fragment=all')

Promisify

[filename](promise.js ':include :type=code :fragment=promisify')


.
