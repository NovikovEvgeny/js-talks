# Функции
Любая функция являет объектом, экземпляром прототипа Function, что позволяет оперировать функцией как объектом, передавать как аргумент, возвращать, присваивать переменной. 
Каждая функция имеет свой контекст this, который указывает на область вызова функции.  
Прототип Function выглядит так:
```
 Function.name - имя функции
 Function.length - кол-во аргументов
 Function.prototype.apply() - вызов с определяемым this и массивоподобными аргументами
 Function.prototype.bind() - создание новой функции с определяемым this и набором аргументов
 Function.prototype.call() - вызов функции с определяемым this и набором аргументов
 Function.prototype.toString() - возвращает объект Function как строку
```
!> Объект Function иммутабельный и у него невозможно переопределить `name` или `length` 

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
### Стандартный

[filename](call.js ':include :type=code :fragment=direct')

### apply
У прототипа Function есть метод `.apply(this, argv)`, который вызывает функцию с массивом переданных аргументов.

[filename](call.js ':include :type=code :fragment=apply')

### call
`.call(thisArg[, arg1[, arg2[, ...]]]`

[filename](call.js ':include :type=code :fragment=call')

### bind
`.bind(thisArg[, arg1[, arg2[, ...]]])`

[filename](call.js ':include :type=code :fragment=bind')

В этом случае у функции `greet` будет жестко привязан первый аргумент, но с помощью `.call` можно было бы задать те, которые не были привязаны в `.bind`

[filename](call.js ':include :type=code :fragment=bindcall')

### iife
Существует способ немедленно вызывать функции - IIFE - Immediately Invoked Function Expression, выполняется сразу как была выражена:

[filename](call.js ':include :type=code :fragment=iife')

Что мы получаем при использовании IIFE?  
* Изоляцию переменных

[filename](call.js ':include :type=code :fragment=iifeIsolate')

* Асинхронные вызовы в корне (пока TS 3.8 не вышел в свет - единственный вариант)

[filename](call.js ':include :type=code :fragment=iifeAsync')

### callback

Древнейший метод работы с асинхронностью, функция которая будет вызвана после того, как асинхронный вызов закончит свою работу.

[filename](call.js ':include :type=code :fragment=callback')

Альтернатива

[filename](call.js ':include :type=code :fragment=callbackAlternative')

## Scope
### Что есть скоуп
Набор правил, как мы храним все данные(перменные), описывающие state программы - scope. И хоть JS и считается динамическим языком он все-равно, технически, является компилируемым, хоть этот процесс и не проиходит заранее.  
* Токенизация\Лексический анализ разбивает код на токены. `const foo = 'bar';` предстанет как `const, foo, =, 'bar', ;`;
* Парсер строит из токенов абстрактное дерево синтаксиса;
* Генератор когда берет дерево и создает выполняемый код.

[filename](scopes.js ':include :type=code :fragment=scope') 

### Поиск переменных в скоупах

Алгоритм прост - движок при выполнении "обращается" к текущей области видимости, спрашивает о наличии объявленной переменной, если такой нет - идет на 1 уровень выше и повторяет действия, пока не дойдет до глобальной области видимости

Работает как для функций, так и для переменных

[filename](scopes.js ':include :type=code :fragment=nested')

### Пересекающиеся скоупы

Если переменна была объявлена в текущем скоупе нет никаких шансов вызвать переменную с таким же именем из скоупа повыше

[filename](scopes.js ':include :type=code :fragment=cross')

Если только не подхачить **this**

[filename](scopes.js ':include :type=code :fragment=crossThis')

Или так

[filename](scopes.js ':include :type=code :fragment=crossArrow')

### Ошибки скоупов

**ReferenceError** - я не могу найти ссылку на объект

[filename](scopes.js ':include :type=code :fragment=referenceError')

**TypeError** - я не могу сделать этого

[filename](scopes.js ':include :type=code :fragment=typeError')

ошибки

### Лексический скоуп

Как не надо

[filename](scopes.js ':include :type=code :fragment=cheating')


### Области видимости и var, let, const

Они, `let` и `const`, видны только в блоке, где были объявлены. Блок - циклы и if.

[filename](scopes.js ':include :type=code :fragment=letIf')

И с циклом 

[filename](scopes.js ':include :type=code :fragment=letLoop')

Они тоже всплывают(**HOISTNG**), но не так как var, попадая в TDZ(Temporal dead zone).

[filename](scopes.js ':include :type=code :fragment=tdz')

`const` еще и неизменяемая

[filename](scopes.js ':include :type=code :fragment=const')

Ну и пример, пытаемся в цикле выполнить действие

[filename](scopes.js ':include :type=code :fragment=example')

И вот так

[filename](scopes.js ':include :type=code :fragment=exampleF')

И вот так

[filename](scopes.js ':include :type=code :fragment=exampleIife')

И как же просто с `let`

[filename](scopes.js ':include :type=code :fragment=easylife')


## Hoisting

### Что это такое
Поднятие, всплытие, тысячи их.  
Любое объявление будет перемещенно наверх, выделена память под переменные, но при этом значение самих переменных неопределено. На момент запуска в скоупе **есть** эти переменные, но **нет** их значений.

[filename](hoisting.js ':include :type=code :fragment=hoisting')

Поработаем за движок:

[filename](hoisting.js ':include :type=code :fragment=hoistingInt')

### Проблемы, которые могут возникнуть из-за всплытия:

[filename](hoisting.js ':include :type=code :fragment=varProblem')

И циклы: 

[filename](hoisting.js ':include :type=code :fragment=loops')


## Closure

### Что это такое
Еще одна вещь, которая относится к области видимости и функциям

Способность функции сохранять доступ к той области видимости, где функция была **объявлена**, даже если она **вызвана** из другой области видимости.

[filename](closure.js ':include :type=code :fragment=closure')

Вот у нас есть что-то, что делает что-то

[filename](closure.js ':include :type=code :fragment=calculator')

Используя силу **ЗАМКАНИЙ** мы можем получить вытащить нужное нам значение:

[filename](closure.js ':include :type=code :fragment=ubercalculator')

asd

















