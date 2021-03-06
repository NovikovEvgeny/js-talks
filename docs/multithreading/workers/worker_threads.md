# Worker API

В то время как `child_process` - слишком "общая" библиотека, `cluster` - слишком "узкий" модуль (в основном, для работы серверов),
в Node.js v10 появился "общий" класс для обеспечения многопоточности - worker threads.

По сути, это создание дочернего процесса Node.js со своим инстансом v8, Event Loop и в целом среды выполннения Node.js

Отличительная особенность от остальных модулей — воркеры могут шарить память. Это обеспечивается либо путем
передачи `ArrayBuffer`, либо с использованием `SharedArrayBuffer`. А еще, это именно **потоки**, а не процессы. 
То есть, в отличие от `child_process` или `cluster`, **процесс** Node.js будет один. 

В основном, воркеры нужны для выполнения CPU-интенсивной работы. Их нет смысла использовать для I/O операций, т.к. 
Node.js в принципе заточена под это и прекрасно с этим справляется. Но как только мы встречаем "тяжелую" CPU операцию, то
тут нода сразу же проседает.


## Используем

Для примера "тяжелой" CPU операции я ~~нагло своровал из интернета~~ взял вычисление числа Фибоначчи, наивную реализацию.


[filename](exampleProject/single.js ':include :type=code')

Мы прекрасно понимаем, что такая реализация абсолютно не имеет права на жизнь, т.к. пока считается число Фибоначчи для 45,
весь процесс просто встает. Никакие I/O операции выполнены не будут, коллбеки стоят в очереди, всё встало, ожидая, пока
наша прекрасная функция доработает в одном потоке.

Здесь на помощь может прийти ~~математика и кеширование~~, воркер-треды. 

Давайте, вместо того, чтобы запускать такую тяжелую функцию в нашем единственном потоке, создадим новый поток, посчитаем там, 
а когда поток досчитает — просто получим "уведомление" о том, что работа сделана (идеальный воркер).


[filename](exampleProject/workers.js ':include :type=code')

Мы видим, что в главном потоке Event Loop не заблокирован, т.к. работает `setInterval`. Это значит, что воркер выполняется
как любая другая асинхронная операция, а значит мы можем принимать HTTP запросы, общаться с базой, выполнять HTTP запросы и
делать всё, что Node.js умеет.

## Постоянные воркеры

Создание воркер тредов — ресурсоемкий процесс, поэтому "правильно" использовать готовый пул тредов.

Вот пример, когда в пуле лишь один воркер:

[filename](exampleProject/workers_pool_simple.js ':include :type=code')

В данном примере в "пуле" лишь один воркер, но смысл в том, что мы создаем процесс на этапе инициализации программы,
а потом "запускаем" нужные операции. Так мы не тратим время на создание треда (расходы на межпотоковое взаимодействие всё еще остаются)

## Шаринг данных

Выше было сказано, что воркеры могут "шарить" данные. Это реализуется с помощью `SharedARrayBuffer`.

[filename](exampleProject/workers_share_data.js ':include :type=code')

Обратите внимание: мы лишь пересылаем инстанс `SharedArrayBuffer` из главного треда в дочерний, но потом дочерний лишь отсылает
сигнал `done`. А `sharedArray` изменён на месте.


## Воркер пул

See [npm library](https://www.npmjs.com/package/node-worker-threads-pool)
