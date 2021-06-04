# Readable Stream

Стрим, который используется для чтения данных. Например: ответ от HTTP сервера, чтение данных из файла, вход `process.stdin`.

[filename](readable.js ':include :type=code :fragment=example')

# Два режима работы

Readable stream может работать в двух режимах:

* **Flowing mode**: данные получаются автоматически и выдаются в приложение максимально быстро, используя .on('data')
* **Paused mode**: текущий кусок данных нужно получить, вручную вызывая метод потока `stream.read()`

Все потоки по умолчанию создаются в paused mode, но могут переключится в flowing при одном из трех условий:

* Добавлен обработчик события 'data'

* Вызван метод `stream.resume()`

* Добавлен `stream.pipe()` в стрим, доступный для записи

Из flowing mode можно перейти назад:

* Если к нему не присоединен .pipe() вызовом `stream.pause()`

* Если есть присоединенные pipe, необходимо отсоединить их все используя `stream.unpipe()`

Readable не начнет генерировать данные, пока к нему не присоединен механизм для их обработки. Если он отключен, Readable попытается перестать генерировать данные.

Но: перестав слушать 'data' события мы **не** остановим стрим.

Если Readable был переключен в flowing mode и у него нет потребителей, данные будут утеряны.

# События Readable потока

* 'close'
* 'data'
* 'end'
* 'error'
* 'pause'
* 'readable'
* 'resume'

# Создание своего Readable

[filename](readable.js ':include :type=code :fragment=custom')

# Итераторы и Readable

Начиная с Node.js 16.3.0, можно взаимодействовать с Readable потоком как с итератором, используя асинхронный цикл `for await ... of`

[filename](readable.js ':include :type=code :fragment=for-await-of')

`stream.Readable.from(iterable)` позволяет работать с итераторами как с потоками данных. Итератор может быть синхронным или асинхронным.

[filename](readable.js ':include :type=code :fragment=iterable')

