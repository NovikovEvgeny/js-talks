# Явный биндинг

Можно явно забиндить контекст функции, используя методы `Function.prototype`: `call`, `apply`, `bind`

!> Note: `bind` создает новый экземпляр функции, а не вызывает ее сразу, поэтому там есть дополнительные `()` скобки 

[filename](hard_binding.js ':include :type=code :fragment=hardBinding')

!> Как видно из предыдущего снипетта, однажды забинденный - забинденный навсегда! 

Можно создать свой упрощенный вариант `bind` и показать, почему бинд "жесткий":

[filename](hard_binding.js ':include :type=code :fragment=whyBoundForever')
