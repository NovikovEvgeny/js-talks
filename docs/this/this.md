# This

> JavaScript makes me want to flip the table and
> say “Fuck this shit”, but 
> I can never be sure what “this” refers to.

(c) @oscherler

Ключевое слово this - ссылка на объект, определяемая
в рантайме при каждом вызове функции и объект, на который ссылается
`this` зависит от **способа вызова функции**

По порядку

## Биндинг по умолчанию

Представим, что у нас есть свойство `name` в глобальном объекте и функция, которая обращается к `this.name`

Если эта функция никаким явным или неявным образом не забиндена на контекст, в не-стрикт режиме в качестве
`this` будет использован **глобальный объект**

**Sloppy mode**

[filename](this.js ':include :type=code :fragment=emptyThisSloppy')


В случае `use strict`, `this` будет равен значению `undefined`

**Strict mode**

[filename](this.js ':include :type=code :fragment=emptyThisStrict')

## Установка контекста через объект

В случае, когда функция была вызвана как свойство объекта, `this` будет ссылаться на этот объект.

[filename](this.js ':include :type=code :fragment=bindingToObj')

При этом неважно, как был объявлено свойства объекта: через `=` или внутри литрала объекта

[filename](this.js ':include :type=code :fragment=bindingToObjProperty')

Таким образом, одной и той же функции можно устанавливать разный контекст

[filename](this.js ':include :type=code :fragment=bindingToDifferentObjects')

Чтобы доказать, что установка контекста зависит **от способа вызова функции**, а не от способа её объявления,
можно провести эксперимент "наоборот" - "разбиндить" функцию

Как видно, `employeeWithFuncDeclaration.sayHello` и `separateFunction` - просто две ссылки на одну и ту же функцию,
что говорит о том, что `this` зависит не от самой функции

[filename](this.js ':include :type=code :fragment=bindingViceVersa')

При определении значения `this`, именно "последний" объект устанавливается значением `this`

[filename](this.js ':include :type=code :fragment=nestedBinding')

Почему на этом делается такой акцент? Чтобы в таких случаях как ниже понимать, почему контекст "теряется".
На самом деле, он не теряется вовсе. Его никогда и не было до момента вызова функции

[filename](this.js ':include :type=code :fragment=looksLikeWeLooseContext')

А, как мы знаем, в JS мы очень часто передаем функци как аргументы - коллбеки. И каждый такой коллбек
будет иметь другое значение `this` (глобальный объект или другой объект, явно установленный вызванной функцией),
так как такой коллбек будет вызван из другого контекста.

[filename](this.js ':include :type=code :fragment=thisInCallbacks')

# Явный биндинг

Можно явно забиндить контекст функции, используя методы `Function.prototype`: `call`, `apply`, `bind`

!> Note: `bind` создает новый экземпляр функции, а не вызывает ее сразу, поэтому там есть дополнительные `()` скобки 

[filename](this.js ':include :type=code :fragment=hardBinding')

!> Как видно из предыдущего снипетта, однажды забинденный - забинденный навсегда! 

Можно создать свой упрощенный вариант `bind` и показать, почему бинд "жесткий":

[filename](this.js ':include :type=code :fragment=whyBoundForever')

# new Binding

[filename](this.js ':include :type=code :fragment=newBinding')

# ES6 arrow functions

[filename](this.js ':include :type=code :fragment=arrowFunctions')

Но можно и к обычным объектам применять, не всё же классами описывать:

[filename](this.js ':include :type=code :fragment=arrowFunctionInObjects')

# This is always object?

[filename](thisIsAlwaysObject.js ':include :type=code :fragment=sloppyMode')

[filename](thisIsAlwaysObject.js ':include :type=code :fragment=strictMode')

