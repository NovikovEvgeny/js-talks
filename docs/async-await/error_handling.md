# Ошибки

## Обработка ошибка
Т.к. `async/await` переопределяет структуру кода так, чтобы казалось, что он
выполняется "синхронно", для обработки `rejected` промисов при использовании `await` выбрасывается исключение
как будто если бы на месте `await` был `throw`

[filename](error_handling.js ':include :type=code :fragment=catch')

`try/catch` блок отловит любой из промисов, котоые `await`-ся в этом блоке

[filename](error_handling.js ':include :type=code :fragment=catchAnyPromise')

Но будьте осторожны! Т.к. механизм `try/catch` существовал и до этого, он  
будет отлавливать все ошибки, в том числе не-асинхронные

[filename](error_handling.js ':include :type=code :fragment=catchAnyError')

## Выбор ошибок

Если нам самим нужно вернуть "реджектнутый" промис из async-функции, то можно пользоваться ключевым словом `throw` (коллбека `reject`) у нас ведь нет

[filename](error_handling.js ':include :type=code :fragment=throwError')

Немного информации о базовом синтаксисе: `throw` действует как и `return` (как и в других языках), то есть выполнение кода дальше этого ключего слова не будет в функции. Поэтому можно быть уверенным, что после `throw` ничего выполнено не будет. В отличие от вызова `reject`, который, как мы помним, не останавливает выполнение функции-экзекьютора, переданной в тело промиса

[filename](error_handling.js ':include :type=code :fragment=throwErrorReturn')

Можно извернуться чуть-чуть по-другому: т.к. async-функция возвращает промис, можно возвращать реджектнутый промис:

[filename](error_handling.js ':include :type=code :fragment=throwErrorPromise')