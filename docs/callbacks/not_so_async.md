# Не совсем асинхронные

Опять же, надуманный пример, но смысл, думаю, понятен

[filename](not_so_async.js ':include :type=code :fragment=not-so-async')

callback выполняется в синхронном режиме, коллстек не очищается, соответственно,
`trolled` напечатается раньше чем `this should be printed first`.

Чтобы избежать этого, можно врапнуть в асинхронную функцию вручную.

[filename](not_so_async.js ':include :type=code :fragment=so-async')

Другой пример, где мы уже сами должны заюзать `process.nextTick` для того, чтобы наш класс работал правильно

[filename](not_so_async.js ':include :type=code :fragment=async-emitter')

Без `process.nextTick` в конструкторе ивен будет fired сразу же - когда на
нем еще чисто теоретически не может быть ни одного лисенера.
