# Async/Await

> Вершина в пирамиде потребностей Маслоу для JS-программиста

Если вкратце - `async/await` позволяет писать асинхронный
код (на промисах), который выглядит синхронным. В этом
`async/await` очень схож с [генераторами](../generators/).

## Ключевое слово async

`async` применяется к объявлению функции. При использовании этого
ключевого слова мы обозначаем, что функция возвращает **промис**.

Даже если явно в конструкции `return` промиса нет. Пример

```javascript
async function iAmAsyncFunction() {
  return 5;
}
```

Что происходит, когда мы вызываем такую функцию?

Результат выполнения функции - [промис]().

```javascript
async function iAmAsyncFunction() {
  return 5;
}

const asyncFunctionResult = iAmAsyncFunction();
console.log(asyncFunctionResult.toString());
```

Т.е. предыдущая запись равносильна записи

```javascript
function iAmAsyncFunction() {
  return new Promise((resolve) => {
    resolve(5);
  });
}

const promise = iAmAsyncFunction();
console.log(promise.toString());
```

Но, как мы видим, кода стало меньше.

С промисом, который вернулся из такой функции, можно поступать 
точно так же, как и с любым другим промисом.

```javascript
async function iAmAsyncFunction() {
  return 5;
}

const asyncFunctionResult = iAmAsyncFunction();
asyncFunctionResult
    .then(result => {
      console.log(result);
    });
```

Можно явно возвращать промис, результат будет такой же

```javascript
async function iAmAsyncFunction() {
  return new Promise((resolve, reject) => {
    resolve(5);
  });
}

const asyncFunctionResult = iAmAsyncFunction();
asyncFunctionResult
    .then(result => {
      console.log(result);
    });
```

Вывод - async-функции производят "боксинг" возвращаемых значений
примерно так же, как при чейнинге промисов - в результате всегда будет
промис.

## Await

Но главное достоинство `async` функций - возможность использовать
внутри них ключевое слово `await`. 

Это слово заставит интерпретатор JS ждать выполнения промиса, который
вернулся из `async`-функции или полученного любым другим способом. 

!> await работает **исключительно** внутри функций, помеченных как
`async`. (Точно так же как `yield` работает только внутри 
функций-генераторов)

```javascript
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000)
  });

  let result = await promise;

  console.log(result); // this will be printed after 1 sec
}

f();
```

Вообще, `await` сможет обработать любой `Thenable`-объект (объект, у котрого есть метод `then(resolve, reject)`);

```javascript

const thenable = {
  then: (resolve, reject) => { 
    setTimeout(() => {
      resolve('done!');
    }, 1000);
  }
}ж

async function foo() {
  const result = await thenable;
  console.log(result);
}
foo();
```

Т.е., даже всякие библиотеки с самописными `thenable`-объектами (кастмные реализации промисов) 
будут работать с `async/await`.

Ключевому слову await можно передавать и не-промис, только смысла в этом не особо.
Такое значение будет обернуто в `Promise.resolve`

```javascript
async function foo() {
  console.log('x');
  const result = await 5;
  console.log(result);
}

foo();
console.log('hello');
```

## Обработка ошибок

Т.к. `async/await` переопределяет структуру кода так, чтобы казалось, что он
выполняется "синхронно", для обработки `rejected` промисов при использовании `await` выбрасывается исключение
как будто если бы на месте `await` был `throw`

```javascript
async function foo() {
  try {
      await Promise.reject('i am rejected promise');
  } catch (e) {
    console.log('Error!');
    console.log(e);
  }
}

foo();
```

`try/catch` блок отловит любой из промисов, котоые `await`-ся в этом блоке

```javascript
async function foo() {
  try {
      const res = await Promise.resolve('good');
      console.log(res);
      const res2 = await Promise.reject('bad');
      console.log(res2);
  } catch (e) {
    console.log('Error!');
    console.log(e);
  }
}

foo();
```

## Async-функции в корне

Т.к. использовать `await` можно **только** внутри async-функций, в корне программы его использовать не получится.

Тут нас спасает тот факт, что async-функции возвращают промис:

```javascript
async function foo() {
  await new Promise((res) => {
    setTimeout(() => {
        res('hello from the future');
    }, 5000);
  });
}

foo()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  })
```

Либо же IIFE (см. урок про [функции](../functions/))

```javascript
async function foo() {
  await new Promise((res) => {
    setTimeout(() => {
        res('hello from the future');
    }, 5000);
  });
}

(async function main() {
  try {
    const result = await foo();
    console.log(result);
  } catch (error) {
      console.log(error);
  }
})();
```

## Пример

Давайте возьмем пример с прошлого урока про [промисы](../promise/README.md#live-coding) и перепишем его
на `async/await`

Промисы:

```javascript
const https = require('https');
const util = require('util');
const url = 'https://gist.githubusercontent.com/thuwie/2a2795abff3b15cd65fd7d1bc7934e15/raw/4e0af1d8d8941f80c608b2d1843a3ccfa3486cb0/test';
const gitUrl = 'https://api.github.com';
const options = {headers: {'user-agent': 'node.js'}};

const request = function (url) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            const {statusCode} = res;

            if (statusCode !== 200) {
                reject('not 200');
            }

            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                resolve(rawData);
            });
        })
    });
};

request(url)
    .then(data => {
        const usernames = data.split(', ');
        const promises = usernames.map(user => {
            return request(`${gitUrl}/users/${user}/repos`);
        });
        return Promise.all(promises);
    })
    .then(results => {
        const repos = results.flatMap(result => {
            const parsed = JSON.parse(result);
            return parsed.map(item => item.name);
        });
        console.log(repos);
    })
    .catch(err => {
        console.log(err);
    });
```

async/await:

```javascript
const https = require('https');
const util = require('util');
const url = 'https://gist.githubusercontent.com/thuwie/2a2795abff3b15cd65fd7d1bc7934e15/raw/4e0af1d8d8941f80c608b2d1843a3ccfa3486cb0/test';
const gitUrl = 'https://api.github.com';
const options = {headers: {'user-agent': 'node.js'}};

// Оборачивание callback-based функций никуда не делось - тут async/await не поможет
const request = function (url) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            const {statusCode} = res;

            if (statusCode !== 200) {
                reject('not 200');
            }

            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                resolve(rawData);
            });
        })
    });
};


// а вот тут уже самая магия

(async function main() {
  try {
      const data = await request(url);
      const usernames = data.split(', ');
      const promises = usernames.map(user => {
          return request(`${gitUrl}/users/${user}/repos`);
      });
      const results = await Promise.all(promises);
      
      const repos = results.flatMap(result => {
          const parsed = JSON.parse(result);
          return parsed.map(item => item.name);
      });
      console.log(repos);
  } catch (error) {
      console.log(error);
  }
})();
```

Ну не чудо ли?

## Links

1. [learn.javascript.ru - async/await](https://learn.javascript.ru/async-await)
