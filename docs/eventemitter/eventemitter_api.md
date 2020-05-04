# API
Базовые функции - `.emit(message)` и `.on(event, callback)`.

[filename](events.js ':include :type=code :fragment=emitter')

## .on
- Срабатывают в порядке добавления;
- Работают синхронно;

[filename](events.js ':include :type=code :fragment=sync')

Можно заставить его работать асинхронно используя `setTimeout` или `setImmediate`

[filename](events.js ':include :type=code :fragment=async')


## .once
- Сработает один раз и удалится из `listeners`.

[filename](events.js ':include :type=code :fragment=once')

Почему он важен? У `EventEmitter` есть максимальное количество слушателей объекта, по дефолту - 10, можно получить с помощью функции `.getMaxListeres()` и установить с помощью функции `.setMaxListeners(n)`.

## .setMaxListeners

[filename](events.js ':include :type=code :fragment=maxListeners')

## .prependListener .prependOnceListener
При необходимости добавить слушатель в начало списка используются функции `.prependListener(event, callbac)` и `.prependOnceListener(event, callback)`.

[filename](events.js ':include :type=code :fragment=prepend')

## .removeListener .off
Убирает один объект из массива `listeners`.

[filename](events.js ':include :type=code :fragment=remove')

# Example

[См. пример проекта на GitHub](https://github.com/NovikovEvgeny/js-talks/tree/master/docs/eventemitter/exampleProject)