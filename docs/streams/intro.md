# Зачем нужны стримы (Stream) и буфферы (Buffer)?

Мы уже знаем, что все операции ввода/вывода в Node.js происходят асинхронно. Чтобы отдать пользователю нашего Node.js сервера некий файл с диска, нам придется использовать коллбеки/промисы/async функции:

[filename](intro.js ':include :type=code :fragment=callback')

Такой простой пример кода на коллбеках будет работать, но ему придется прочитать файл data.txt в память целиком при каждом запросе пользователя. Если файл достаточно большой, сервер начнет есть слишком много памяти, особенно если у клиентов медленные соединения и мы держим для них файл в памяти пока отвечаем на другие запросы. Пользователям так же придется ждать, пока весь файл прочитается в память сервера до того, как они начнут получать данные.

# Преимущества использования Stream

1. **Эффективное использование памяти**: нам не нужно держать в памяти данные, которые мы обрабатываем, целиком
2. **Сокращение времени работы**: мы можем начать обрабатывать данные по мере их поступления, не дожидаясь завершения получения данных

# Встроенные в Node.js модули работают с Stream

Из-за указаных выше преимуществ, многие встроенные в Node.js модули поддерживают работу со стримами, например:

* `net.Socket` - основное апи ноды для работы с TCP сокетами
* `process.stdin` - стандартный ввод процесса
* `process.stdout`
* `process.stderr`
* `fs.createReadStream()` - создает поток для чтения файла
* `fs.createWriteStream()` - создает поток для записи в файл
* `http.request()` - создает http.ClientRequest который является потомком Stream
* `zlib.createGzip()` - сжатие данных с использованием gzip
* `zlib.createGunzip()`
* `zlib.createDeflate()` - сжатие данных с использованием deflate
* `zlib.createInflate()`

# Типы стримов

В Node.js существует 4 типа стримов:

1. **Writable**: стрим, который принимает данные. Например `fs.createWriteStream()` который позволяет нам писать данные в файл.
2. **Readable**: стрим, который отдает данные. Например, `fs.createReadStream()`.

3. **Duplex**: стрим, который может принимать и отдавать данные. Например `net.Socket`.

4. **Transform**: стрим, который принимает и отдает данные, модифицируя их в процессе передачи.

# Что представляют из себя Stream

Стримы в Node.js наследуют класс `EventEmitter`. У потоков на чтение, например, можно слушать события `data` и `end`. Слушать события можно так же, как и у EventEmitter-ов: используя `stream.on()`.

# Пример кода с использованием Stream

[filename](intro.js ':include :type=code :fragment=stream')

Здесь используется функция Readable стрима .pipe(), которая сама работает с потоком созданным `fs.createReadStream()`, не добавляя обработчики .on('read'). Код выглядит приятнее чем коллбековый вариант, а клиенты получают данные по кусочками (chunk) как только они прочитаны из файла. pipe() так же сам может приостановить чтение файла, если клиент получает данные слишком медленно.