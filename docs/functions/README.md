# Функции
Любая функция являет объектом, экземпляром прототипа Function, что позволяет оперировать функцией как объектом, передавать как аргумент, возвращать, присваивать переменной. 
Каждая функция имеет свой контекст this, который указывает на область вызова функции.

[filename](declaration.js ':include :type=code :fragment=isObject')

## Способы создания (объявления)

### Function declaration

Обычное объявление функции

[filename](declaration.js ':include :type=code :fragment=functionDeclar')

### Function expression

Через присваивание функции переменной

[filename](declaration.js ':include :type=code :fragment=functionExpress')

### Declaration vs Expression

Разница между двумя методами заключается в т.н. "поднятии" - hoisting. Объявление будет отличаться от выражения тем, что при объявлении функция будет доступна даже если вызов в коде осуществлен раньше. При использовании выражения функцию сначала необходимо создать.

[filename](declaration.js ':include :type=code :fragment=functionDeclarationHoisting')

И 

[filename](declaration.js ':include :type=code :fragment=functionExpressionHoisting')

### Arrow function
В отличии от вышеупомянутых функций, стрелочные функции сохраняют ссылку на контекст, в котором они были объявлены.

[filename](declaration.js ':include :type=code :fragment=functionArrow')

Отличие

[filename](declaration.js ':include :type=code :fragment=functionArrowContext')

### Method
Т.к. функция это объект ее можно хранить в свойстве объекта.

[filename](declaration.js ':include :type=code :fragment=functionMethod')

### new Function и Function
Объект можно создать с помощью конструктора прототипа, в обоих случаях поведение одинаковое, но, т.к. тело функции передается строкой то движок ее оптимизировать не будет.

[filename](declaration.js ':include :type=code :fragment=functionProt')

При это функция при запуске будет иметь доступ только к global scope.

  а че кстати если передать в функцию а то оно не пойдет в глобал скоп

[filename](declaration.js ':include :type=code :fragment=functionProtScope')


### eval
Выполняет код, переданный строкой. Имеет доступ только к области видимости где был запущен. Евал несекьюрный, съест что дадут, медленный.

[filename](declaration.js ':include :type=code :fragment=functionEval')

## Вызов функции
Такой

[filename](call.js ':include :type=code :fragment=direct')

У прототипа Function есть метод `.apply(this, argv)`, который вызывает функцию с массивом переданных аргументов.

[filename](call.js ':include :type=code :fragment=apply')

Такой

[filename](call.js ':include :type=code :fragment=call')

Сякой

[filename](call.js ':include :type=code :fragment=bind')

И вот

[filename](call.js ':include :type=code :fragment=bindcall')








