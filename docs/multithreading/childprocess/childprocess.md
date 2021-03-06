# child_process

`child_process` библиотека позволяет создавать дочерние процессы, которые будут иметь свой Event loop => не блокировать основной.

На выбор 4 основных функции - `spawn()`, `fork()`, `exec()`, `execFile()`.
Каждый ребенок является инстансом класса ChildProcess, который наследуется от EventEmitter,
поэтому взаимодействие организовано с помощью ивентов.

Для инстанса `ChildProcess` есть 4 ивента:
- `exit` - бросается, когда процесс завершен. Аргументами в функцию-листенер будет передан код завершения процесса и сигнал, если процесс был завершен насильно; 
- `close` - бросается, когда процесс завершен **и** `stdio` потоки ребенка были закрыты. Отличается от `exit` тем, что несколько
child process-ов могут шарить `stdio`. Выбрасывается всегда после `exit` или `error`;
- `disconnect` - бросается при вызове `child.disconnect()` из родительского процесса. После дисконнекта, невозможно передавать или получать сообщения;
- `error` - бросается если процесс не может быть запущен; не может быть убит системным сигналом или отправка сообщения дочернему процессу не выполнилась;
- `message` - бросается при вызове `process.send()` из дочернего процесса (см. далее)
- `spawn` - (начиная с Node.js v15.1.0) - бросается сразу после того, как дочерний процесс удачно стартанул.

## spawn
- Запускает поток с командой;
- Не создает shell по умолчанию.

[filename](childprocess.js ':include :type=code :fragment=childprocess')

Отлично подходит если объем информации из дочернего процесса большой, т.к. все отправится прямиком в стандартный аутпут чайлд процесса.


[filename](childprocess.js ':include :type=code :fragment=stdio')

`stdin` - readable поток, можно перенаправить входной поток основного процесса 

[filename](childprocess.js ':include :type=code :fragment=stdin')

Дочерний процесс можно отцепить от родительского, в таком случае завершать процессы можно независимо друг от друга, а управление дочерним процессом перейдет к ОС (Linux - будет главным в новой группе процессов).

[filename](childprocess.js ':include :type=code :fragment=detach')

## exec
- Создает shell;
- Работает с shell-синтаксисом

Возвращает буффер аутпута результата консольных команд.

[filename](childprocess.js ':include :type=code :fragment=exec')

Отлично подходит если буффер будет небольшой, т.к. он попадет в память. 

## execFile
- Передается файл скриптов
- Почти то же самое, что `exec`, но не создает shell, зато выполняет файл сразу

## fork
- Создает дочерный процесс **Node.js**
- Взаимодействие с помощью event через [IPC](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BD%D0%BE%D0%B5_%D0%B2%D0%B7%D0%B0%D0%B8%D0%BC%D0%BE%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D0%B5)
- Своя память
- Свой инстанс v8
- Всё своё :)

[filename](childprocess.js ':include :type=code :fragment=fork')
