# cluster

Без cluster нода работает на 1 ядре, для масштабирования создаются новые процессы через `child_process.fork()` автоматически;
То есть теперь мы имеем более высокоуровневый API для common задач, которым проще пользоваться, нежели `chind_process`.

Каждый из процессов может узнать, он главный или дочерний, через `cluster.isMaster` и `cluster.isWorker`. 

Между процессами можно передавать сообщения (события) и сокеты (дескрипторы сокетов).

Таким образом, tcp или http сокеты принимаются главным процессом, а на обработку отправляются в один из дочерних. 

?> Более подробно о том, как cluster работает, очень (**ОЧЕНЬ!!!**) хорошо описано в [документации](https://nodejs.org/api/cluster.html#cluster_how_it_works)


[filename](cluster.js ':include :type=code :fragment=cluster-example')