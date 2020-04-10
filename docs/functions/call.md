# Вызов функции
## Стандартный

[filename](call.js ':include :type=code :fragment=direct')

## apply
У прототипа Function есть метод `.apply(this, argv)`, который вызывает функцию с массивом переданных аргументов.

[filename](call.js ':include :type=code :fragment=apply')

## call
`.call(thisArg[, arg1[, arg2[, ...]]]`

[filename](call.js ':include :type=code :fragment=call')

## bind
`.bind(thisArg[, arg1[, arg2[, ...]]])`

[filename](call.js ':include :type=code :fragment=bind')

В этом случае у функции `greet` будет жестко привязан первый аргумент, но с помощью `.call` можно было бы задать те, которые не были привязаны в `.bind`

[filename](call.js ':include :type=code :fragment=bindcall')

## iife
Существует способ немедленно вызывать функции - IIFE - Immediately Invoked Function Expression, выполняется сразу как была выражена:

[filename](call.js ':include :type=code :fragment=iife')

Что мы получаем при использовании IIFE?  
* Изоляцию переменных

[filename](call.js ':include :type=code :fragment=iifeIsolate')

* Асинхронные вызовы в корне (пока TS 3.8 не вышел в свет - единственный вариант)

[filename](call.js ':include :type=code :fragment=iifeAsync')

## callback

Древнейший метод работы с асинхронностью, функция которая будет вызвана после того, как асинхронный вызов закончит свою работу.

[filename](call.js ':include :type=code :fragment=callback')

Альтернатива

[filename](call.js ':include :type=code :fragment=callbackAlternative')
