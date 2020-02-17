# JS - Типы данных

## Основы
Всего в JS 7 типов данных

**Примитивы:**
* number
* string
* boolean
* null
* undefined
* Symbol (ES6)

**Составной тип данных:**
* object

> Стоит упомянуть `BigInt`([link](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/BigInt))  - до сих пор не в спецификации ECMAScript, но уже в Stage 3 (предпоследняя) и поддерживается в Chrome, Mozilla, Opera, Node.js > 10.4.0

## typeof

Тип переменной можно определить с помощью оператора `typeof`. Он возвращает **строку**.

**Определение типа для примитивов**:

[filename](typeof.js ':include :type=code :fragment=typeofPrimitives')

!> Но! `typeof null` возвращает "object", хотя это ни разу не объект!

[filename](typeof.js ':include :type=code :fragment=typeofNull')

Через `typeof` также не стоит пытаться определить тип не-примитива. Всегда (почти) будет object. Потому что почти всё в JS - это
object

[filename](typeof.js ':include :type=code :fragment=typeofObject')

!> Почему "всегда (почти)"? Потому что `typeof` для функции возвращает "function", несмотря на то, что такого типа данных
нет

[filename](typeof.js ':include :type=code :fragment=typeofFunction')

> `typeof` можно применять к **необъявленным** переменным:

[filename](typeof.js ':include :type=code :fragment=typeofUndefined')

## number

### Запись числа

Обычные числа в JavaScript хранятся в 64-битном формате [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), который также называют 
«числа с плавающей точкой двойной точности»
(double precision floating point numbers).

Способы записи числа

[filename](number.js ':include :type=code :fragment=howToDefine')

Ещё есть шестнадцатиричная форма записи (`0xFF` = 255), двоичная (`0b111` = 7), восьмеричная (`0o377` = 255).
Как видно, маска для записи таких чисел: `0<symbol><actualNumber>`, где `<symbol>` - `x`, `b` или `o`, а затем
идет запись числа в N-ричном формате


### Floating point numbers

[filename](number.js ':include :type=code :fragment=floating')

Как обойти это чудо? Как и сказано в стандарте IEEE-754 - округлением

[filename](number.js ':include :type=code :fragment=floatingRound')

### Любимое число

Любимое число - `NaN` - Not a Number
Кстати, тоже описанное в IEEE-754

[filename](number.js ':include :type=code :fragment=NaN')

Так что это скорее не "не число", а "значение, при приведении которого к number возникла ошибка"

[filename](number.js ':include :type=code :fragment=NaNCompare')

### Чуть менее любимое число

Чуть менее любимое число - `Infinity` и `-Infinity`. Бесконечность. И тоже описанная в IEEE 754.

[filename](number.js ':include :type=code :fragment=Infinity')

Зато никакого overflow

Да еще и один полезный юзкейс - при поиске максимума/минимума. Или в любом другом случае, когда нужно "очень-очень большое число".

[filename](number.js ':include :type=code :fragment=FindMax')

И еще одно "зато" - можно делить на 0 без ошибок!

[filename](number.js ':include :type=code :fragment=DivideByZero')

## string

Строки есть. "Символов" нет. 

Строки кодируются в UTF-16.

Объявление строки - с помощью кавычек. Одинарные, двойные, или обратные.

Одинарные и двойные - по сути одно и то же.

[filename](string.js ':include :type=code :fragment=defineString')

Обратные кавычки - имеют бОльшую функциональность:

* можно использовать переменные прямо внутри объявления строки
    
[filename](string.js ':include :type=code :fragment=useVariableInStr')

* можно использовать больше одной строки

[filename](string.js ':include :type=code :fragment=moreThanOneString')

Обращаться к символам строки можно с помощью квадратных скобок `[<index>]`, либо с помощью метода `.charAt(<index>)`

[filename](string.js ':include :type=code :fragment=charAccess')

Строки - иммутабельны. Нельзя изменить уже существующую строку. Как только она создана, она создана навсегда.

Все методы строк возвращают новую строку, а не меняют существующую.

[filename](string.js ':include :type=code :fragment=immutableString')

!> *For fun*: есть один известный баг (фича) в V8, когда при вызове  методов строки возвращаемая строка "внутри"
содержит ссылку на родительскую строку, тем самым не давая GC очистить ролительскую строку, даже если она больше нигде не используется.
[Статья на хабре](https://habr.com/ru/post/449368/); [Баг в V8](https://bugs.chromium.org/p/v8/issues/detail?id=2869)

## Object

> An Object is logically a collection of properties.

Включая функции, и все built-in нейтивы String, Number, Boolean, Date, RegExp, Error etc

### Object usage

С объектом, как и с любой другой переменной можно делать разные вещи - обращаться
к её значению, менять значение/ссылку, передавать как аргумент в функции и т.п.

**Обращение к свойствам объекта** может быть выполнено двумя способами:

[filename](object.js ':include :type=code :fragment=objectKeys')

**Обычно** используется первый способ. Второй удобен, когда:

1. Имя свойства содержит символы типа `-`, `+` и т.д.
2. Имя свойства сохранено в переменной

[filename](object.js ':include :type=code :fragment=objectKeysExpression')

### Boxing

[filename](object.js ':include :type=code :fragment=objectBoxing')

Вывод: почти никогда нет смысла явно врапать в объект, ЖС сам скастит, если надо, например, вызвать метод прототипа

В то же время есть смысл использовать конструкторы Нейтивов для `Error` и `Date` (`Map`, `Set`, etc),
т.к. по-другому вы не создадите такой объект: 

[filename](object.js ':include :type=code :fragment=objectConstructor')


### Передача значения по ссылке и по значению

Примитивы передаются по значению, объекты - по ссылке.

[filename](object.js ':include :type=code :fragment=referenceVsValue')

`const` при объявлении объекта не иммутит **весь** объект, а лишь ссылку на этот объект
(в переменную `a` нельзя будет записать ссылку на другой объект)

Проперти объекта менять по-прежнему можно.
Чтобы совсем заморозить объект, можно использовать

[filename](object.js ':include :type=code :fragment=objectFreeze')

Но и это не сработает, если объекты вложенны

[filename](object.js ':include :type=code :fragment=objectFreezeDeep')

Почему? Потому что "Object is a collection of properties" и `Object.freeze` "замораживает" только проперти (ключи) 
переданного объекта. "Вложенный" объект - уже другая сущность, и она не замораживается.

### Удаление свойства

Ключ (и значение) из объекта можно удалить с помощью ключевого слова `delete`

[filename](object.js ':include :type=code :fragment=objectDelete')

### new String() vs String

при вызове конструктора `new` создается новый **объект** данного типа, без new - просто кастится один тип в другой

[filename](object.js ':include :type=code :fragment=newVsCoercion')

## Coercion <3

Приведение данных из одного типа в другой.

Явное и неявное

"Явность" на самом деле зависит от понимания написанного кода.

Очевидно явный каст:

[filename](coercion.js ':include :type=code :fragment=clearCoercion')

Чуть менее явный:

[filename](coercion.js ':include :type=code :fragment=notSoClearCoercion')

Неявный, т.к. нет никаких операций (хотя тоже достаточно очевидно, что кастится)

[filename](coercion.js ':include :type=code :fragment=maybeUnclearCoercion')

### Truthy and falsy

Неявный каст происходит к булеану внутри булевых контекстов

* if (arg)
* do {} while()
* while() {}
* a ? a : b
* for (let i = 0; i < 10; i++)
* !a
* ||
* &&

Truthy - значения очевдино конвертятся в таких контекстах в true, 

Falsy - в false

Truthy - всё, что не falsy

Falsy:

<details>
<summary>Очевидные falsy:</summary>

* false
* undefined
* null
* NaN

</details>

<details>
<summary>Неочевидные:</summary>

* ""
* 0

</details>

Почему важно знать:

любой `if()`, или другой булевый контекст, или `|| &&` операция конвертят в булеан, поэтому это и называется "булевый контекст"

При этом при конвертировании, конечно же, не изменяется оригинальное значение, а возвращается новое

[filename](coercion.js ':include :type=code :fragment=defaultValue')

То же самое с `if` и чем угодно

!> Операторы `||` и `&&` конвертят в булеан при выборе операнда, но итоговое операции равно значению операнда (wut):

[filename](coercion.js ':include :type=code :fragment=orOperator')

`&&` usecase

[filename](coercion.js ':include :type=code :fragment=andOperator')

## "==" vs "==="
На целый урок отдельный наберется.

!>Основная идея:
"==" приводит типы, в то время как "===" нет

"==" сначала меняет тип одного или обоих операндов, а затем сравнивает как "===" 

Под копотом оба алгоритма добиваются сравнения **примитивов** (или возвращают false раньше)

Когда это может быть полезно

[filename](equality.js ':include :type=code :fragment=soft')

ну... и всё...

Когда это может вас поймать:

[filename](equality.js ':include :type=code :fragment=softBad')

А все потому, что "==" оператор **кастит булеан в намбер**, а не наоборот

[filename](equality.js ':include :type=code :fragment=booleanNumber')

При сравнении стринги и намбера, "==" оператор **кастит стринг в намбер**

Если один из операндов - объект, к нему применяется `valueOf`, а если `valueOf()` возвращает **не-примитив**, то применяется `toString()`

[filename](equality.js ':include :type=code :fragment=valueOf')

Два объекта всегда будут не равны друг другу, если это не один и тот же объект (Референс на один и тот же объект) (для `===` действует то же правило)

[filename](equality.js ':include :type=code :fragment=equalObjects')

## JS Global Object

В стандарте JS есть множество "глобальных объектов" - обычно это
какие-либо стркутуры данных. Например,

* Обертки для типов данных: `Number`, `String`, `Boolean` etc
* "Классы" `Error`, `Date`
* Структуры данных `Array`, `Map`, `Set`
* Вспомогательные штуки типа `Promise`

Всё это описано в стандарте и должно работать в любой среде выполнения JS

## Node global objects 

У ноды есть свои глобальные объекты, типо `window` в браузерах. Эти объекты принадлежат ноде, а не V8, так что процесса в браузере не будет.

### console

В ноде есть класс `Console`, функционал которого похож на такой же в браузере. Конструктор позволяет определить 2 потока для записи данных: output для `.log()` и error, для варнингов и ошибок. Если стрим для ошибок и варнингов не определен - все будет уходить в output.

В общем виде глобальный объект `console` это экземпляр класса `new Console(process.stdout, process. stderr)`.

Набор методов: 

* для вывода сообщений - `.log()`, `.info()`, `.warn()`, `.error()`, `.trace()`.
* для замера времени - `.time(label)`, `.timeEnd(label)`. Лейбл уникальный для каждого замера, вызов окончания выведет результат в ms в консоль.
* для assertion test - `.assert(value[, message][, ...])`. В отличии от браузеров кинет `AssertionError` и закончит выполнение.

### process

Предоставляет информацию и контролирует текущий процесс Node.js. Как глобальный объект, он всегда доступен приложениям Node.js без необходимости вызова require().
Сам по себе процесс - экземпляр EventEmitter, так что он может бросать несколько ивентов. Все сигнальные ивенты, такие как `SIGINT`, `SIGTERM` и прочие. Удобно работать с ними когда необходимо обеспечить gracefull shutdown. Еще есть `disconnect`, `beforeExit` и `exit`. Первый управление дочерними процессами, второй генерируется когда в евентлупе больше нет задач, а третий можно вызвать через `process.exit()` либо он сгенерируется когда лупа пустая. 

Процесс хранит в себе `argc` и `argv`, где как и в других языках первый - количество переданных аргументов, второй - массив строк. На нулевом индексе - путь до ноды, на первом - путь до выполняемого файла, остальные - переданные аргументы.

Процесс имеет доступ к переменным среды. `process.env`. Их можно назначить из кода, но эффект будет только внутри процесса. Любое присваивание неявно конвертирует значение в строку.

```
process.env.test = null;
console.log(process.env.test); // 'null'
process.env.test = undefined;
console.log(process.env.test); // 'undefined'
```

И еще много проперти которые есть, но нужны в каких-то специальных кейсах.

### dash variables
Удобно, когда организовываешь работу с локальными файлами.
`__dirname` - имя каталога, в котором в данный момент находится выполняющийся скрипт.
```
node ~/project/test/example.js

example.js:

console.log(__dirname); // ~/project/test/
```
`__filename` - разрешенный путь до файла.
```
node ~/project/test/example.js

example.js:

console.log(__filename); // ~/project/test/example.js
```
### global
В отличии от бразуеров, в ноде объявление глобальных переменных, например через var, будет замкнуто на область конкретного модуля. Для того, чтобы создать и использовать глобальную, для всего процесса, переменную, мы делаем `global.varName = any` и можем обращаться к ней либо как к полю объекта global, либо только по ее имени.

### Buffer
Буфер - большая тема для обсуждения, но если коротко обозревать что он из себя представляет.

### etc
Еще, глобальными объектами будет считать ключи экспорта-импорта, такие как `module`, `require`, `exports`. О них в другой раз. И таймеры, `setTimeout`, `setInterval`, которые не отличаются от таймаутов в браузере.
