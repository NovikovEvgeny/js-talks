# typeof

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
