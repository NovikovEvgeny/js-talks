# Promise

## Что такое Promise

Promise это stateful-объект, который может находится в одном из трех состояний:

![](https://learn.javascript.ru/article/promise/promiseInit.png)

В отличие от использования коллбеков и инверсии контроля, когда наша функция-коллбек вызывается в неизвестное время и в неизвестном месте неизвестное количество раз, промис лишь меняет свое состояние. А функции-хендлеры (что выполнить при удачном состоянии, что выполнить при ошибке)

Главное отличие промисов от использования коллбеков в том, что мы получаем объект (обещание), для какого-то действия, которое еще не завершено. Этот объект сам реализует логику смену своего состояния при завершении действия и предоставляет API для вызова функций-обработчиков на успешное и неуспешное завершение этого действия.

Promise, при создании нового промиса через `new Promise(function)`, запускает функцию, которая была передана в конструктор промиса, начинает выполнять асинхронный код и его состоянием управляет переданная в конструктор функция. `resolve(data)` меняет статус на Fulfilled, сохраняя значение, которое было передано в функцию resolve, `reject(error)` меняет статус на Rejected, сохраняя ошибку, переданную в reject.

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
Сменить состояние на Fulfilled можно только при помощи вызова функции `resolve`. 

[filename](promise.js ':include :type=code :fragment=ruleResolve')

Просто вернуть (`return`) результат или не возвращать ничего - обе операции оставят промис в состоянии ожидания навсегда, более того - возвращаемое значение функции, которая передается в конструктор промиса, всегда игнорируется.

[filename](promise.js ':include :type=code :fragment=rulePendingForever')

### reject
На Rejected состояние можно сменить либо вызовом `reject`, либо бросок любой необработанной ошибки. 

[filename](promise.js ':include :type=code :fragment=ruleRejectWithReject')


[filename](promise.js ':include :type=code :fragment=ruleRejectWithThrow')

## Обработка результатов

Результат выполнения промиса можно получить только используя обработчики `PromiseFulfillReactions, PromiseRejectReactions`. Назначаются они функциями `.then()`, `.catch()`, `.finally()`. 

```
.then(onFulfilled, onRejected)

.then(name => console.log(name), error => console.error(error));

.then(null, error => console.error(error));

.catch(error => console.error(error));
```


Обработка реакций:

[filename](promise.js ':include :type=code :fragment=synt')

`.then()` можно использовать единожды для обработки И успешного результата, И ошибки, если передать 2 аргумента-функции (первый - хендлер удачного результата, второй - ошибки)


[filename](promise.js ':include :type=code :fragment=thenBoth')


try-catch не работает снаружи промиса

[filename](promise.js ':include :type=code :fragment=try')

return в **хэндлерах** всегда вернет новый промис. Это позволяет выполнять цепочки промисов (chaining)

[filename](promise.js ':include :type=code :fragment=chain')

Даже `.catch()` возвращает новый промис, что дает возможность обрабатывать ошибки прямо в середине цепочки:

[filename](promise.js ':include :type=code :fragment=chainWithCatchInTheMiddle')

Но, чаще всего, почему то любят вещать один `.catch` на всю цепочку:

[filename](promise.js ':include :type=code :fragment=chainWithCatchInTheEnd')

вызов методов `reject()` или `resolve()` не выходят из тела функции-екзекьютора, которая была передана в конструктор

[filename](promise.js ':include :type=code :fragment=noreturn')

Методы прототипа - `.all`, `.race`, `.allSettled`.

[filename](promise.js ':include :type=code :fragment=all')

Promisify

[filename](promise.js ':include :type=code :fragment=promisify')
