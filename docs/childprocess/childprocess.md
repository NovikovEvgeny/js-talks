# child_process

`child_process` библиотека позволяет создавать отдельные потоки выполнения, которые будут иметь свой Event loop => не блокировать основной. На выбор 4 основных функции - `spawn()`, `fork()`, `exec()`, `execFile()`.   
Каждый ребенок является инстансом EventEmitter, взаимодействие организовано с помощью листенеров.

Для инстанса `ChildProcess` есть 4 ивента:
- `disconnect` - бросается при вызове `child.disconnect()` из родительского процесса;
- `error` - бросается если процесс не может быть запущен/был убит системным сигналом;
- `close` - бросается если `stdio` потоки ребенка были закрыты;
- `message` - бросается при вызове `process.send()` из дочернего процесса.

## spawn
- Запускает поток с командой;
- Не создает shell.

[filename](childprocess.js ':include :type=code :fragment=childprocess')

Отлично подходит если объем информации из дочернего процесса большой, т.к. все отправится прямиком в стандартный аутпут.


[filename](childprocess.js ':include :type=code :fragment=stdio')

`stdin` - writable поток, можно перенаправить входной поток основного процесса 

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
- Передается файл скриптов.

## fork
- Взаимодействие с помощью event

[filename](childprocess.js ':include :type=code :fragment=fork')

## Так, ну и зачем?

Отделение тяжелых, блокирующих операций.

