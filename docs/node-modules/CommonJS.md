# CommonJS module system

## Основные принципы

* Поддерживается нодой на 100%
* Синхронная загрузка модулей
* Импорт модулей через `require`
* Экспорт через `module.exports`
* Один раз заимпортили - оно остается навсегда


С помощью `require` в ноде можно загружать `.js`, `.json`, `.NODE` файлы. 
Нода сама распознает формат файла и выполняет необходимые действия.

Загрузка `.js` модуля представляет собой обертку 

[filename](CommonJS.js ':include :type=code :fragment=wrapForModule')

Именно из-за этого в коде модуля мы можем использовать такие ключевые слова, как `exports`, `require`, `module` etc

* `require` - ссылка на функцию для загрузки других модулей
* `exports` - ссылка-шорткат на объект `module.exports` - этот объект и будет результатом "экспорта" модуля

## Пример

Возьмем простой модуль, который домножает любое число на 5

[filename](code-examples/commonjs/multiplier/myMultiplier.js ':include :type=code')

И возьмем главный модуль, который использует этот `myMultiplier.js`:

[filename](code-examples/commonjs/multiplier/main.js ':include :type=code')

Что произошло на первой строчке? Запустилась функция, которая отработала синхронно, и в 
переменную `multiplier` передана ссылка на объект, на который ссылалась `module.export` в модуле `myCoolModule`:

[filename](code-examples/commonjs/multiplier/underTheHood.js ':include :type=code')

## Require and ES6

Мы уже выяснили, что результат выполнения `require` - объект. И с помощью ES6 его можно 
деструктурировать прямо во время импорта

[filename](code-examples/commonjs/require-es6/myModule.js ':include :type=code')

[filename](code-examples/commonjs/require-es6/main.js ':include :type=code')

## Кэш 

После того, как `require` выполнился, результат выполнения заносится в кэш. 
И если происходит вызов `require` еще раз для точно такого же названия файла,
файл не вызывается еще раз, а лишь берется результат его выполнения из кеша.

Исключение - если в `require` передано имя модуля **сДругимКейСоМ**

[filename](code-examples/commonjs/cache/myModule.js ':include :type=code')

[filename](code-examples/commonjs/cache/main.js ':include :type=code')

## exports

Изначально `module.exports` пустой. И изначально `exports` ссылается на `module.exports`
Мы можем это проверить, выполнив простой код:

[filename](CommonJS.js ':include :type=code :fragment=emptyModuleExports')

Соответственно, если модуль ничего не экспортирует, результатом `require` будет пустой объект.
Пример ниже это демонстрирует. 

!> Заодно заметьте, что мы доказываем, что код в руте модуля (не засунутый в функции) выполняется
именно при `require`;

[filename](code-examples/commonjs/simple-exports/myModule.js ':include :type=code')

[filename](code-examples/commonjs/simple-exports/main.js ':include :type=code')

Обычно модуль экспортит больше, чем одну функцию/константу/класс

Для этого есть несколько путей, они будут одинаковы (почти):

[filename](code-examples/commonjs/exports/fooBarModule.js ':include :type=code')

1 и 2 способ равозначны и работают всегда. 3ий случай тоже будет работать. 4ий же не будет,
т.к. при использовании `=` мы перезапишем ссылку на объект, которая лежит в переменной `exports`.
Это сломает систему, т.к. `module.expots` останется пустым объектом.

## Циклические зависимости

Циклическая зависимость - случай, когда модули зависят друг от друга (напрямую или через N модулей)

[filename](code-examples/commonjs/circular-dependencies/fileA.js ':include :type=code')

[filename](code-examples/commonjs/circular-dependencies/fileB.js ':include :type=code')

В случае циклической зависимости, нода делает довольно простой и грязный хак - возвразает ссылку
на `module.exports` раньше, чем файл отработан. То есть, в случае запуска `fileA.js` произойдет:

* первой же строчкой там `reuire('./fileB');`
* происходит вызов `fileB`. Там первой же строчкой `require('./fileA');`. 
* Нода понимает, что `fileA` только в процессе инициализации, поэтому "заранее" возвращает ссылку
    на `module.exports` объект внутри fileA
* `fileB.js` дорабатывает до конца, выводит `undefined`, потому что `a` объект пока ссылается на пустой объект
* `fileB.js` объявляет свой экспорт
* `fileA.js` продолжает работу, выводит `b.hello`, который равен `hello from fileB`, объявляет свой экспорт

!> **Note:** экспорт сделан через `module.exports`, то есть мы не назначаем новую ссылку на объект, а лишь добавляем новое свойство

* теперь, если бы мы вывели `console.log(a.hello)` внутри `fileB.js`, то получили бы `hello from fileA`

Вывод: избегайте циклических зависимостей, пользуйтесь `module.exports.varName` синтаксисом вместо `exports = { varName: ... }`

## Экспорт одной сущности (kinda default export)

Для более ООП-шного стиля часто применяется стратегия "один класс - один файл" и этот класс тогда экспортируется по умолчанию

[filename](code-examples/commonjs/one-instance-export/myClass.js ':include :type=code')

[filename](code-examples/commonjs/one-instance-export/main.js ':include :type=code')

Это очень похоже на "экспорт по умолчанию" для ECMAScript модулей, хотя и не совсем. 
Но идея тут понятна - мы экспортируем одну сущность, поэтому нет смылса дополнительно оборачивать её
в какой-то объект

## Codestyle for cjs modules

1. Use default export only for class files. When we 100% know that only one "entity" is exported from this file (either class or a singleton instance of the class)

    **MyClass.js**
    ```javascript
    class MyClass {
      sayHello() {
        console.log('hello');
      }
    }
    
    module.exports = MyClass;
    ```
    
    **index.js**
    ```javascript
    const MyClass = require('./MyClass.js');
    new MyClass().sayHello();
    ```
    or:
    
    **MyClassSingleton.js**
    ```javascript
    class MyClass {
      sayHello() {
        console.log('hello');
      }
    }
    
    module.exports = new MyClass();
    ```
    
    **index.js**
    ```javascript
    const myClassSingleton = require('./MyClassSingleton.js');
    myClassSingleton.sayHello();
    ```

Then default export doesn't confuse about what was exported and how.

2. do not mix default export and named export
3. In case module exports functions, always use `exports.functionName = functionName` construction. Yes,
this looks a bit ugly, but it allows to JetBrains IDEs to index functions usage and use "Find usages"/"Go to declaration"
features, what is really helpful.

    ```javascript
    function sum(a, b) {
      return a + b;
    }
    
    function subtract(a, b) {
      return a - b;
    }
    exports.sum = sum;
    exports.substract = subtract;
    ```

4. Do not use default export even if your module exports only one function. In the future maybe this module will need to extend,
what will require to rewrite it's usages.

