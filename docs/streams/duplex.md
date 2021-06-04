# Duplex Stream

Стрим, который используется для чтения и записи данных. Например: TCP сокет, имплементация Websocket. Он имеет одновременно интерфейсы Readable и Writable.

# Transform Stream

Имеет такой же интерфейс как и Duplex, но его выход каким-то образом связан со входом. Например: zlib стримы.

[filename](writable.js ':include :type=code :fragment=pipeline')
