# Callbacks

Коллбек - функция обратного вызова - основной инструмент работы с асинхронностью.

На нём завязаны практически все механизмы асинхронного выполнения кода.

Это уже обсуждали несколько раз, но повторим еще раз - callback - функция, которая
должна (может) быть вызвана "когда-то потом". Когда - при наступлении определенного события.

Самый простой пример - установка таймаутов/интервалов.

`setTimeout`, `setImmediate` и `process.nextTick` специально созданы для того, чтобы 
"вызвать эту функцию попозже".


```javascript
setTimeout(function iAmCallback() {
  console.log('hello from the future'); 
}, 1000);
```

Функции можно создавать отдельно, и передавать лишь ссылки на них.

```javascript
function iAmACallback() {
  console.log('hello from the future');
}

//                    ↓ note: there is no `()` !
setTimeout(iAmACallback, 1000);
```

С этим должно все быть понятно. Функция `iAmCallbackFunction` СОЗДАНА на строчке 1, 
еще ДО вызова `setTimeout` но ВЫЗЫВАНА она будет спустя секунду 
(или больше - в зависимости от состояния Job/Task Queue - см. "как работает Node.js лекцию")

Всё это время (эту секунду) она хранится где-то в памяти, но не запустится.

## Callback-last, error-first

Одна из самых популярных "договоренностей" о том, как создавать асинхронные функции.
Концепция заключается в том, что callback всегда передается последним аргументом в асинхронную
функцию, а при этом возможная ошибка - первым аргументом коллбека. Так написаны почти
все API Node.js. [Больше об этом - в доке Node.js](https://nodejs.org/api/errors.html#errors_error_first_callbacks)

Если ошибки нет, то первым аргументом принято использовать `null` 

Пример: функции модуля fs для работы с файлами

```javascript
const fs = require('fs');
//           ↓ first argument of the async function
//                          ↓ second (and in this case - last one) argument of the async function
//                                                                ↓ first argument in the CALLBACK
//                                                                ↓ it will be Error if error really happend and null if everything is ok 
fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {

});
```

Таким образом, мы не забываем об ошибке, и так нам легче проверять, случилась ли она

```javascript
const fs = require('fs');
fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
  if (error) {
    throw error;
  }
  console.log(fileContent.toString());
});
```

Важно понимать, что callback-функции будут вызваны **только когда коллстек пустой** (см. лекцию how Node.js works)

С этим нужно быть аккуратным, потому что, например, предыдущий пример не заработает так, как вроде бы
ожидается

```javascript
const fs = require('fs');
try {
  fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
    if (error) {
      throw error;
    }
    console.log(fileContent.toString());
  });
} catch (error) {
  console.error(error);
}
```

`try-catch` блок **ловит ошибки только в пределах своего коллстека**. (мы сейчас не говорим об async/await, там этот механизм работает по-другому)

Это значит, что если у вас есть асинхронные функции, то и работать вы с ними должны
асинхронно - передавать коллбеки, а не ловить все в try/catch.

```javascript
const fs = require('fs');
// note that callback is the last argument again
function readFileTxt(callback) {
  fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
    if (error) {
      callback(error);
    }
    //       ↓ note null here! 
    callback(null, fileContent.toString().trimEnd().trimStart());
  });
}

readFileTxt(function iAmAlsoACallback(error, properContent) {
  if (error) {
    console.error('Some error happened, but I handled it properly!');
  }
  console.log(properContent);
});
```

Выглядит красиво. Что мы потеряли? Ключевое слово `return`! **Никогда** не забывайте
выходить из callback-функций, чтобы выполнение функции завершилось. JS запускает функции
run-to-completion! 

Правильным будет использование return.

```javascript
const fs = require('fs');
// note that callback is the last argument again
function readFileTxt(callback) {
  fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
    if (error) {
      callback(error);
      return; // just to stop execution of the current function
      // or return callback(error);
    }
    //       ↓ note null here! 
    callback(null, fileContent.toString().trimEnd().trimStart());
    return;
  });
}

readFileTxt(function iAmAlsoACallback(error, properContent) {
  if (error) {
    console.error('Some error happened, but I handled it properly!');
    return;
  }
  console.log(properContent);
  return;
});
```

Отсюда следует **очень** важный вывод - никто не застрахован от того,
как, когда и сколько раз будет вызван его коллбек!

Мы можем лишь **доверять** функции, в которую мы передаём коллбек, но
не можем быть уверены, что она всегда сработает правильно.

Конечно, уровень доверия выше к каким то библиотекам (Node.js API, например),
а к каким-то - ниже (какие-то рандомные библиотеки из npm).

Часто это называют *инверсией управления* - Inversion of control, IoC, когда
какой-то другой код (не программист) управляет выполнением кода, написанного 
программистом.

Можно придумывать кучи вариантов о том, что коллбеки будут вызваны неправильно,
но смысл, думаю, понятен: как только мы передаем callback в асинхронную функцию,
она может быть вызвана 0, 1 или более раз, и на это мы повлиять не сможем.

Для того, чтобы быть 100% уверенным, можно извращаться.

Например, добавить счетчик "вызовов".

Возьмем "плохую" функцию и попробуем сделать так, чтобы коллбек вызывался только один раз
```javascript
const fs = require('fs');
function readFileTxt(callback) {
  fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
    if (error) {
      callback(error);
    }
    callback(null, fileContent.toString().trimEnd().trimStart());
  });
}

let iAmAlsoCallbackCounter = 0;
readFileTxt(function iAmAlsoACallback(error, properContent) {
  if (iAmAlsoCallbackCounter > 0) {
    return;
  }
  iAmAlsoCallbackCounter++;
  if (error) {
    console.error('Some error happened, but I handled it properly!');
    return;
  }
  console.log(properContent);
});
```

Но такое придется добавлять к каждому коллбеку, что, конечно,
сииильно усложнит нам работу.



А что, если нужно будет вызвать 2 раза?

Изменим код, и заставим функцию читать любой файл:

```javascript
const fs = require('fs');
function readFileTxt(fileName, callback) {
  fs.readFile(fileName, function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
    if (error) {
      callback(error);
    }
    callback(null, fileContent.toString().trimEnd().trimStart());
  });
}

let iAmAlsoCallbackCounter = 0;
let iAmAlsoCallbackCounterforB = 0;
readFileTxt('fileA.txt.', function iAmAlsoACallback(error, properContent) {
  if (iAmAlsoCallbackCounter > 0) {
    return;
  }
  iAmAlsoCallbackCounter++;
  if (error) {
    console.error('Some error happened, but I handled it properly!');
    return;
  }
  console.log('from fileA: ' + properContent);
  readFileTxt(properContent, function iAmAlsoCallbackB(error2, content2) {
    if (iAmAlsoCallbackCounterforB > 0) {
      return;
    }
    iAmAlsoCallbackCounterforB++;
    if (error2) {
      console.error('Some error happened, but I handled it properly! in second file!');
      return;
    }
    console.log('from second file: ' + content2);
  });
});
```

Ужас...


## Callback hell

Есть еще такая штука.

Каждый вложенный коллбек - дополнительный отступ.

А еще все конструкции (if, for, while, try/catch) тоже добавляют отступов.

В итоге это все приводит к тому, что вложенность огромная. Например,
[код simplecrawler выглядит ну просто потрясающе](https://github.com/simplecrawler/simplecrawler/blob/master/lib/crawler.js#L1689)



## Не совсем асинхронные

Опять же, надуманный пример, но смысл, думаю, понятен

```javascript
const fs = require('fs');
function iAmAsyncFunction(callback) {
  console.log('ok this is executed as expected');
  callback('trolled');
}

iAmAsyncFunction((res) => {
  console.log(res);
});
console.log('this should be printed first, right?');
```

callback выполняется в синхронном режиме, коллстек не очищается, соответственно,
`trolled` напечатается раньше чем `this should be printed first`.

Чтобы избежать этого, можно врапнуть в асинхронную функцию вручную.
```javascript
function iAmAsyncFunction(callback) {
  console.log('ok this is executed as expected');
  callback('trolled');
}

iAmAsyncFunction((res) => {
  process.nextTick(() => console.log(res));
});
console.log('this should be printed first, right?');
```


Другой пример, где мы уже сами должны заюзать `process.nextTick` для


```javascript
const EventEmitter = require('events');

class Example extends EventEmitter {
    constructor() {
        super();
        process.nextTick(() => this.emit('event'));
    }
}

const example = new Example();
example.on('event', function() {
    console.log('on event listener');
});

```