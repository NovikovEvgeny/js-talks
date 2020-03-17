# Async-функции в корне

Т.к. использовать `await` можно **только** внутри async-функций, в корне программы его использовать не получится.

Тут нас спасает тот факт, что async-функции возвращают промис:

[filename](top_level_await.js ':include :type=code :fragment=asyncAndPromise')

Либо же IIFE (см. урок про [функции](../functions/functions.md))

[filename](top_level_await.js ':include :type=code :fragment=asynAndIIFE')
