# Promise

## Что такое Promise

Promise это stateful-объект, который может находится в одном из трех состояний:

![](https://learn.javascript.ru/article/promise/promiseInit.png)

В отличии от использования коллбеков и инверсии контроля, когда наш код вызывается в неизвестное время и в неизвестном месте, промис выполняет код как только был создан объект.

![](https://sun9-68.userapi.com/c858124/v858124604/1a33e5/qh56xFEX-F0.jpg)

Promise, при создании нового промиса через `new Promise(function)`, запускается функцию, которая была передана в конструктор промиса, начинает выполнять асинхронный и его состоянием управляет переданная в конструктор функция. `resolve()` меняет статус на Fulfilled, сохраняя значение, которое было передано в функцию resolve, `reject()` меняет статус на Rejected, сохраняя ошибку, переданную в reject.

При создании промиса состояние по умолчанию - pending, далее он может сменить состояние **один** раз.

```
new Promise(function)
    PromiseState = 'pending'
    PromiseResult = undefined
    PromiseFulfillReactions: []
    PromiseRejectReactions: []
```

## Правила смены статуса

### resolve
Сменить состояние на Fulfilled можно только при помощи вызова функции `resolve`. Просто вернуть результат, не возвращать ничего - обе операции оставят промис в состоянии ожидания навсегда.

[filename](promise.js ':include :type=code :fragment=ruleResolve')

### reject
На Rejected состояние можно сменить либо вызовом `reject`, либо бросок любой необработанной ошибки. 

[filename](promise.js ':include :type=code :fragment=ruleReject')

## Обработка результатов

Результат выполнения промиса можно получить только используя обработчики `PromiseFulfillReactions, PromiseRejectReactions`. Назначаются они функциями `.then()`, `.catch()`, `.finally()`. 

[filename](promise.js ':include :type=code :fragment=then')



Обработка реакций:

[filename](promise.js ':include :type=code :fragment=synt')



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

Live-coding

[filename](livecoding.js)

.
