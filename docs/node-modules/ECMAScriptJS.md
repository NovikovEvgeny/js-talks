# EJS

Стандарт, который наконец-то описывает как **должны** выглядеть и 
работать модули в JS. 

Использует ключевые слова `import` и `export`. 
Под капотом эта система работает абсолютно по-другому, поэтому
Node.js и потребовалось несколько нет для того, чтобы хотя бы
**экспериментальную** поддержку ввести.

## Синтаксис

### export

```javascript
export function calc(a, b) {
  return a + b;
}
```

```javascript
export default function calc(a, b) {
  return a + b;
}
```

```javascript
// re-export
// index.js
export * from './file1.js';
export * from './file2.js'; 
```


```javascript
// re-export with rename
export { foo as bar } from './file1.js';
```

### import

named import

```javascript
import { foo } from './file1.js';
```

rename
```javascript
import { foo as bar } from './file1.js';
```

import everything

```javascript
import * as mod from './file1';
mod.foo();
```

import of the default export

```javascript
import React from 'React';
```

default + named import

```javascript
import React, { bla, foo, bar } from 'React';
```

## EJS в Node.js

Чтобы заставить работать EJS в ноде, необходимо, чтобы:

* файлы имели расширения `.mjs` 
или
* в ближайшем package.json файле была строчка `"type": "module"`

В случае, когда файлы имеют расширение `.cjs` или в ближайшем package.json
есть строчка `"type": "commonjs"`, файлы обрабатываются как `CommonJS` модули

Для большей информации [см. офф. документацию Node.js](https://nodejs.org/api/esm.html)

## Dynamic import

для динамической загрузки есть асинхронная функция `import`:

```javascript
(async () => {
  const conditionalNameOfTheModule = 'myModule.js';
  // if () ...
  const module = await import(conditionalNameOfTheModule);
  module.foo();
})();
```

В то время как `require` можно сделать в любой момент

Почему такая разница? Потому что "дефолтный" импорт работает ДО запуска функции

```javascript
console.log("first");
import { foo } from './myModule.js';
foo();
```

Выведет
```
inside myModule.js
first
foo
```

То есть при парсинге и анализе кода все `import` конструкции вызываются ДО начала выполнения кода в файле
В то время как `require` асолютно синхронный и ему неважно где и как работать.

### Static analysis

У вас просто физически не получится заимпортить то, что не заэкспорчено

```javascript
console.log('first');
import { foobar } from './myModule.js';
foobar();
```

Выведет

```
SyntaxError: The requested module './myModule.js' does not provide an export named 'foobar'
```

!> SyntaxError

Синтаксическая ошибка! То есть не ошибка рантайма (как видите, даже "first" не вывелся)

В то время как в common js на 

```javascript
const { unexisingVariable } = require('fs');

console.log(unexisingVariable);
unexisingVariable();
```

Выведет 

```
undefined
TypeError: unexisingVariable is not a function
```

это будет runtime-ошибкой во время выполнения кода в main.js

## Import CJS modules

Чтобы заимпортить файл, написанный в CommonJS формате, есть только один путь: заимпортировать 
целиком модуль. Никакой деструктуризации не выйдет.

```javascript
import wholeModule from './cjsModule';
wholeModule.foo();
```

```javascript
import { foo } from './cjsModule';
foo();
```

Не сработает!