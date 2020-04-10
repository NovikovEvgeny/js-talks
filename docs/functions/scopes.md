# Scope

## Что есть скоуп
Набор правил, как мы храним все данные(перменные), описывающие state программы - scope. И хоть JS и считается динамическим языком он все-равно, технически, является компилируемым, хоть этот процесс и не проиходит заранее.  
* Токенизация\Лексический анализ разбивает код на токены. `const foo = 'bar';` предстанет как `const, foo, =, 'bar', ;`;
* Парсер строит из токенов абстрактное дерево синтаксиса;
* Генератор когда берет дерево и создает выполняемый код.

[filename](scopes.js ':include :type=code :fragment=scope') 

## Поиск переменных в скоупах

Алгоритм прост - движок при выполнении "обращается" к текущей области видимости, спрашивает о наличии объявленной переменной, если такой нет - идет на 1 уровень выше и повторяет действия, пока не дойдет до глобальной области видимости

Работает как для функций, так и для переменных

[filename](scopes.js ':include :type=code :fragment=nested')

## Пересекающиеся скоупы

Если переменна была объявлена в текущем скоупе нет никаких шансов вызвать переменную с таким же именем из скоупа повыше

[filename](scopes.js ':include :type=code :fragment=cross')

Если только не подхачить **this**

[filename](scopes.js ':include :type=code :fragment=crossThis')

Или так

[filename](scopes.js ':include :type=code :fragment=crossArrow')

## Ошибки скоупов

**ReferenceError** - я не могу найти ссылку на объект

[filename](scopes.js ':include :type=code :fragment=referenceError')

**TypeError** - я не могу сделать этого

[filename](scopes.js ':include :type=code :fragment=typeError')

ошибки

## Лексический скоуп

Как не надо

[filename](scopes.js ':include :type=code :fragment=cheating')


## Области видимости и var, let, const

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

