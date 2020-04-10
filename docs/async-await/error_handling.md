# Обработка ошибок

Т.к. `async/await` переопределяет структуру кода так, чтобы казалось, что он
выполняется "синхронно", для обработки `rejected` промисов при использовании `await` выбрасывается исключение
как будто если бы на месте `await` был `throw`

[filename](error_handling.js ':include :type=code :fragment=catch')

`try/catch` блок отловит любой из промисов, котоые `await`-ся в этом блоке

[filename](error_handling.js ':include :type=code :fragment=catchAnyPromise')

Но будьте осторожны! Т.к. механизм `try/catch` существовал и до этого, он  
будет отлавливать все ошибки, в том числе не-асинхронные

[filename](error_handling.js ':include :type=code :fragment=catchAnyError')
