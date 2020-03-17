# Установка контекста через объект

В случае, когда функция была вызвана как свойство объекта, `this` будет ссылаться на этот объект.

[filename](object_binding.js ':include :type=code :fragment=bindingToObj')

При этом неважно, как был объявлено свойства объекта: через `=` или внутри литрала объекта

[filename](object_binding.js ':include :type=code :fragment=bindingToObjProperty')

Таким образом, одной и той же функции можно устанавливать разный контекст

[filename](object_binding.js ':include :type=code :fragment=bindingToDifferentObjects')

Чтобы доказать, что установка контекста зависит **от способа вызова функции**, а не от способа её объявления,
можно провести эксперимент "наоборот" - "разбиндить" функцию

Как видно, `employeeWithFuncDeclaration.sayHello` и `separateFunction` - просто две ссылки на одну и ту же функцию,
что говорит о том, что `this` зависит не от самой функции

[filename](object_binding.js ':include :type=code :fragment=bindingViceVersa')

При определении значения `this`, именно "последний" объект устанавливается значением `this`

[filename](object_binding.js ':include :type=code :fragment=nestedBinding')

Почему на этом делается такой акцент? Чтобы в таких случаях как ниже понимать, почему контекст "теряется".
На самом деле, он не теряется вовсе. Его никогда и не было до момента вызова функции

[filename](object_binding.js ':include :type=code :fragment=looksLikeWeLooseContext')

А, как мы знаем, в JS мы очень часто передаем функци как аргументы - коллбеки. И каждый такой коллбек
будет иметь другое значение `this` (глобальный объект или другой объект, явно установленный вызванной функцией),
так как такой коллбек будет вызван из другого контекста.

[filename](object_binding.js ':include :type=code :fragment=thisInCallbacks')
