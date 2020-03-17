# Coercion 

Приведение данных из одного типа в другой.

Явное и неявное

"Явность" на самом деле зависит от понимания написанного кода.

Очевидно явный каст:

[filename](coercion.js ':include :type=code :fragment=clearCoercion')

Чуть менее явный:

[filename](coercion.js ':include :type=code :fragment=notSoClearCoercion')

Неявный, т.к. нет никаких операций (хотя тоже достаточно очевидно, что кастится)

[filename](coercion.js ':include :type=code :fragment=maybeUnclearCoercion')

## Truthy and falsy

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
