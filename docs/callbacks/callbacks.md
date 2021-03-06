# Callbacks

Коллбек - функция обратного вызова - основной инструмент работы с асинхронностью.

На нём завязаны практически все механизмы асинхронного выполнения кода.

Это уже обсуждали несколько раз, но повторим еще раз - callback - функция, которая
должна (может) быть вызвана "когда-то потом". Когда - при наступлении определенного события.

## Простой пример коллбека

Самый простой пример - установка таймаутов/интервалов.

`setTimeout`, `setImmediate` и `process.nextTick` специально созданы для того, чтобы 
"вызвать эту функцию попозже".

[filename](callbacks.js ':include :type=code :fragment=timeout')

Функции можно создавать отдельно, и передавать лишь ссылки на них.


[filename](callbacks.js ':include :type=code :fragment=timeout-reference')

С этим должно все быть понятно. Функция `iAmCallbackFunction` СОЗДАНА на строчке 1, 
еще ДО вызова `setTimeout` но ВЫЗЫВАНА она будет спустя секунду 
(или больше - в зависимости от состояния Job/Task Queue - см. [лекцию как работает Node.js](../eventloop/))

Всё это время (эту секунду) она хранится где-то в памяти, но не запустится.
