# API
Базовые функции - `.emit(eventName, [...args])` и `.on(eventName, callback)`.

[filename](events.js ':include :type=code :fragment=emitter')

Обычно, конечно, `.emit` вызывается изнутри инстанса ИвентЭмиттера, а "снаружи" лишь вешаются ивент лисенеры:

[filename](events.js ':include :type=code :fragment=emitterClass')

## .on
- Срабатывают в порядке добавления;
- Работают синхронно;

[filename](events.js ':include :type=code :fragment=sync')

Как понять, что они отрабатывают синхронно? Мы явно видим, что логи "an event occured" и "2" "вклиниваются" в 0..5, следовательно здесь никакой отложенности - .emit сразу же выполняет функцию-лисенер

?> Почему важно помнить, что они отрабатывают **синхронно**? Если
в лисенере будет выброшена ошибка, она пойдет вверх по коллстеку, следовательно, сам эмиттер будет тоже подвержен ошибке:

[filename](events.js ':include :type=code :fragment=syncError')

Можно заставить его работать асинхронно используя `setTimeout` или `setImmediate` или `process.nextTick`, если нам критически важно запускать лисенеры с пустым коллбеком (вспоминаем занятия про асинхронность - ивент луп переходит на следующую фазу, только когда коллстек пуст)

[filename](events.js ':include :type=code :fragment=async')


## .once
- Сработает один раз и удалится из `listeners`.

[filename](events.js ':include :type=code :fragment=once')

Почему он важен? У `EventEmitter` есть максимальное количество слушателей объекта, по дефолту - 10, можно получить с помощью функции `.getMaxListeres()` и установить с помощью функции `.setMaxListeners(n)`. При добавлении бОльшего числа слушаетелей - они всё равно добавятся, но warning-сообщение будет напечатано с информацией "возможна утечка памяти"

## .setMaxListeners

[filename](events.js ':include :type=code :fragment=maxListeners')

## .prependListener .prependOnceListener
При необходимости добавить слушатель в начало списка используются функции `.prependListener(event, callbac)` и `.prependOnceListener(event, callback)`.

[filename](events.js ':include :type=code :fragment=prepend')

## .removeListener .off
Убирает один объект из массива `listeners`.

Убирает функцию-лисенер **по ссылке!**

[filename](events.js ':include :type=code :fragment=removeEventListener')


## .emit
Основные вещи уже покрыты выше. Из интересного - возвращает boolean. `true`, если хотя бы один лисенер был выполнен

[filename](events.js ':include :type=code :fragment=emitBoolean')
