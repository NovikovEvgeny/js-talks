# Object

> An Object is logically a collection of properties.

(c) [ECMAScript](https://tc39.es/ecma262/#sec-object-type)

Включая функции, и все built-in нейтивы String, Number, Boolean, Date, RegExp, Error etc

## Object usage

С объектом, как и с любой другой переменной можно делать разные вещи - обращаться
к её значению, менять значение/ссылку, передавать как аргумент в функции и т.п.

**Обращение к свойствам объекта** может быть выполнено двумя способами:

[filename](object.js ':include :type=code :fragment=objectKeys')

**Обычно** используется первый способ. Второй удобен, когда:

1. Имя свойства содержит символы типа `-`, `+` и т.д.
2. Имя свойства сохранено в переменной

[filename](object.js ':include :type=code :fragment=objectKeysExpression')

## Boxing

[filename](object.js ':include :type=code :fragment=objectBoxing')

Вывод: почти никогда нет смысла явно врапать в объект, ЖС сам скастит, если надо, например, вызвать метод прототипа

В то же время есть смысл использовать конструкторы Нейтивов для `Error` и `Date` (`Map`, `Set`, etc),
т.к. по-другому вы не создадите такой объект: 

[filename](object.js ':include :type=code :fragment=objectConstructor')


## Передача значения по ссылке и по значению

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

## Удаление свойства

Ключ (и значение) из объекта можно удалить с помощью ключевого слова `delete`

[filename](object.js ':include :type=code :fragment=objectDelete')

## new String() vs String

при вызове конструктора `new` создается новый **объект** данного типа, без new - просто кастится один тип в другой

[filename](object.js ':include :type=code :fragment=newVsCoercion')
