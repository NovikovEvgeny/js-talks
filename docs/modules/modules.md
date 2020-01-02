# Модули ECMAScript и CommonJS

## ECMAScript
import загружает асинхронно, после загрузки и синтаксического анализа нам известно что доступно в модуле к исопльзованию.
## CommonJS
require может загружать JS, JSON и .NODE и сам определяет тип.
Загрузка модуля представляет собой обертку 
```
function (exports, require, module, __filename, __dirname) {
  const m = 1;
  module.exports.m = m;
}
```
Так что в модуле имеется возможность использовать ключевые слова `exports`, `require` и `module`. После исполнения этой функции результат кэшируется и при вызове require в любом другом месте значение будет взято из кэша. 
Зная это, нужно помнить правило - импорт статических объектов, таких как функции и переменные может быть сделан с помощью `exports`, например `exports.area = (r) => r * 3.14 * 2` или `export.myconst = 2`. Но класс должен быть экспортирован как 
```
module.exports = class Square {
  constructor(width) {
    this.width = width;
  }

  area() {
    return this.width ** 2;
  }
};
```

Любой импорт в CommonJS синхронный, а так же результат экспорта неизвестен до окончания парсинга, так что на данный момент нельзя использовать именнованный импорт как в ES2015+ `import { foo } from 'bar'`. 
Команда ядра работает над тем, чтобы выпустить модули из под экспериментального флага, но на данный момент LTS 12 Node работает с модулями только если: 
* расширение файла `.mjs`, 
* файл кончается на `.js` или без расширения, но рядом лежит `package.json` в котором есть поле `"type": "module"`.  
Все остальное будет считаться CommonJS модулем, но в случае смешивания пакетов предлагают быть точным. Правила аналогичны:   
* расширение файла `.cjs`, 
* файл кончается на `.js` или без расширения, но рядом лежит `package.json` в котором есть поле `"type": "commonjs"`. 

## И чего
Со стороны ноды нельзя просто взять и сделать синхронный `require()` асинхронным, говорят это разрушительно для экосистемы. Но в теории можно сделать `require.import()` который будет возвращать промис и когда ES модуль загружен - резолвиться. Ну это звучит выполнимо.

Со стороны ES можно использовать CJS модули через import, потому что асинхронная загрузка может быть и не нужна. Но есть одно НО - именнованные импорты.
`import {foo, bar} from 'baz.cjs'` никогда не заработает потому что мы не знаем структуру модуля до окончания загрузки.

## Nodejs
### LazyLoading
Так как `require()` - синхронный, то весь код модуля исполнится сразу, при использовании CJS нет понятия lazyLoading.

### Dynamic path resolvement

[filename](example/dynamic-path/index.js ':include :type=code')

### Examples

[filename](example/exports/index.js ':include :type=code')

### cjs vs mjs

[filename](example/ejs-cjs/index.js ':include :type=code')

## Code style for modules

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