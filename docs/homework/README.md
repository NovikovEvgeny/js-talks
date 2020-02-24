## Задание 1. Типы данных и входные аргументы запускаемой программы

Написать скрипт, который будет иметь функцию которая парсит входные аргументы и формурует из них объект, 
в котором ключ объекта - имя входного аргумента, а значение по ключу - значение входного аргумента

Пример
```
node index.js property1 value1 property2 value2
```

Должен составить объект
```json
{
  "property1": "value1",
  "property2": "value2"
}
```

Сложность 0:
Не учитывать типы данных - просто взять и составить объект из входных данных

Сложность 1:

До запуска скрипта в нем же можно указать, какие ожидаются имена аргументов и значения по умолчанию, если аргумент не задан

Пример:

```javascript
const argTypes = {
    property1: 1,
    property2: "hello",
    property3: false,
}
```


Сложность 2:

До запуска скрипта в нем же можно указать, какой ожидается тип данных у какого аргумента, прямо в самом index.js
И функция будет Кастить входные аргументы в соответствии с этим объектом

Пример:
```javascript
const argTypes = {
    property1: {
      type: "number",
      default: 1,
    },
    property2: {
      type: "string",
      default: "hello",
    },
    property3: {
      type: "boolean",
      default: false,
    },
    property4: {
      type: "object",
      default: { hello: "world" }
    }
}
```

### Tips

скрипт, чтобы вывести первый не-дефолтный входной аргумент в ноде (`process.argv` - массив):

```javascript
// index.js
console.log(process.argv[2]);
```

Запуск:

```
node index.js hello
```


форматирование из примитива в примитив другого типа:
```javascript
const num = Number("420"); // String() Number() Boolean()
```


форматирование из строки в JSON и обратно:
```javascript
var str = '{"hello": "world"}';
console.log(JSON.parse(str).hello);
console.log(JSON.stringify(JSON.parse(str)));
```

доступ к свойствам объекта с помощью переменных
```javascript

const propertyName = "hello";

var a = {
  [propertyName]: "world"
}

console.log(a[propertyName]);

var b = {};
b[propertyName] = "world";
```

цикл по массиву:

```javascript
var array = [1, 2, 3];

for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```
