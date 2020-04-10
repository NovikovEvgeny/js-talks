
## Входные и выходные значения

Входные аргументы функции-генератора задаются при её создании

[filename](input-output.js ':include :type=code :fragment=inputOnCreation') 

"Выходные" значения - то, что стоит после `yield` (при паузе) или `return` (при полной остановке генератора).

[filename](input-output.js ':include :type=code :fragment=outputGenerators') 

1. Создан генератор `foo`
2. Вызван первый `gen.next()`. Выполняется код до первого `yield`.
Т.к. строчка `'before the first yield'` стоит справа от оператора
`yield`, она резолвится ДО `yield` и сохраняется в `value` объекта,
который вернулся из первого `gen.next()`. Первый `gen.next()` 
завершает работу.
3. Запускается второй `gen.next('input from outside')` - 
строка `input from outside` становится
"результатом выполнения" первого `yield` и "встает на его место"
4. в переменную `input` записано значение `input from outside` и выведено в консоль


Чтобы было проще понять, как сработал `yield` и в какой последовательности
отработали операторы, можно "переиначить" код как:

[filename](input-output.js ':include :type=code :fragment=withoutGenerators') 

Код выше - **это НЕ равнозначная замена примеру на генераторах**,
но он показывает моменты "изменения". Если проводить
аналогию, то:

* то, что подается внутрь функции `getOneStringAndReturnAnother` - отрабатывает во время первого `it.next`
* то, что работает внутри функции `getOneStringAndReturnAnother` - работает вне функции-генератора
* то, что работает после функции `getOneStringAndReturnAnother` - работает во время второго `it.next()`

## throw и return

Можно даже кидать ошибки "внутрь" генератора снаружи:

[filename](input-output.js ':include :type=code :fragment=throwGenerator') 

И принудительно завершать выполнение генератора:

[filename](input-output.js ':include :type=code :fragment=returnGenerator') 
