# Async/Await

> Вершина в пирамиде потребностей Маслоу для JS-программиста

Если вкратце - `async/await` позволяет писать асинхронный
код (на промисах), который выглядит синхронным. В этом
`async/await` очень схож с [генераторами](../generators/generators.md).

## Ключевое слово async

`async` применяется к объявлению функции. При использовании этого
ключевого слова мы обозначаем, что функция возвращает **промис**.

Даже если функция явно не возвращает промис. Пример

[filename](asyncawait.js ':include :type=code :fragment=declaration')

Даже если она пустая - она все равно возвращает промис

[filename](asyncawait.js ':include :type=code :fragment=declarationEmpty')

Что происходит, когда мы вызываем такую функцию?

Результат выполнения функции - [промис](../promise/promise.md).

[filename](asyncawait.js ':include :type=code :fragment=declarationAndCall')

Т.е. предыдущая запись равносильна записи

[filename](asyncawait.js ':include :type=code :fragment=promiseInsteadOfAsyncFunc')

Но, как мы видим, кода стало меньше.

С промисом, который вернулся из такой функции, можно поступать 
точно так же, как и с любым другим промисом.

[filename](asyncawait.js ':include :type=code :fragment=waitForAsyncFunc')

Можно явно возвращать промис, результат будет такой же

[filename](asyncawait.js ':include :type=code :fragment=returnPromiseFromAsync')

Вывод - async-функции производят "боксинг" возвращаемых значений
примерно так же, как при чейнинге промисов - в результате всегда будет
промис.

## Await

Но главное достоинство `async` функций - возможность использовать
внутри них ключевое слово `await`. 

Это слово заставит интерпретатор JS ждать выполнения промиса, который
вернулся из `async`-функции или полученного любым другим способом. 

!> await работает **исключительно** внутри функций, помеченных как
`async`. (Точно так же как `yield` работает только внутри 
функций-генераторов)

[filename](asyncawait.js ':include :type=code :fragment=await')

Вообще, `await` сможет обработать любой `Thenable`-объект (объект, у котрого есть метод `then(resolve, reject)`);

[filename](asyncawait.js ':include :type=code :fragment=awaitThenable')

Т.е., даже всякие библиотеки с самописными `thenable`-объектами (кастмные реализации промисов) 
будут работать с `async/await`.

Ключевому слову await можно передавать и не-промис, только смысла в этом не особо.
Такое значение будет обернуто в `Promise.resolve`

[filename](asyncawait.js ':include :type=code :fragment=awaitNonPromise')

## Links

1. [learn.javascript.ru - async/await](https://learn.javascript.ru/async-await)
