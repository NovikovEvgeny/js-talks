# Writable Stream

Стрим, который используется для чтения данных. Например: объект запроса HTTP клиента, запись данных в файл, выходы `process.stdout` и `process.stderr`.

[filename](writable.js ':include :type=code :fragment=example')

Функция `writable.write()` возвращает *boolean*, показывающий успешно ли прошла запись. Если вернулось false, это значит что что-то при потреблении данных пошло не так и сейчас нельзя писать дальше. Writable даст нам знать, что снова возможна запись посредством события 'drain'.

Мы можем использовать `writable.end()` чтобы показать потребителю, что больше данных записано не будет.

[filename](writable.js ':include :type=code :fragment=end')

# События Writable потока
* 'close'
* 'drain'
* 'error'
* 'finish'
* 'pipe'
* 'unpipe'

# Асинхронное взаимодействие

[filename](writable.js ':include :type=code :fragment=async')

# writable.cork()

Используя `writable.cork()` мы начинаем записывать данные в буфер в памяти. Данные из буфера будут посланы потребителю только когда вызван один из методов `writable.uncork()` или `writable.end()`.

# .pipe() и .pipeline()

Piping - механизм передачи выхода одного стрима на вход к другому. Нет ограничений на количество таких связей, что позволяет обрабатывать данные в несколько шагов.

[filename](writable.js ':include :type=code :fragment=pipe')

Метод `Stream.pipeline()` может быть использован чтобы передать данные между несколькими потребителями, корректно закрывая и обрабатывая ошибки в едином коллбеке.

[filename](writable.js ':include :type=code :fragment=pipeline')
