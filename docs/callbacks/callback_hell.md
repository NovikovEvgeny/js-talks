# Callback hell

Есть еще такая штука.

Каждый вложенный коллбек - дополнительный отступ.

А еще все конструкции (if, for, while, try/catch) тоже добавляют отступов.

В итоге это все приводит к тому, что вложенность огромная. Например,
[код simplecrawler выглядит ну просто потрясающе](https://github.com/simplecrawler/simplecrawler/blob/master/lib/crawler.js#L1689)
