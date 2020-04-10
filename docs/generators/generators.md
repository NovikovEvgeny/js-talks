# Generators

Генераторы - специальный вид функций, которые ведут себя
**совершенно по-другому** по сравнению с обычными функциями.

## Ломаем обычные функции

Обычные функции JS, при их вызове, отрабатывают от начала до конца
и возвращают одно единственное значение.

[filename](generators.js ':include :type=code :fragment=runToCompletion')

`console.log` никогда не выполнится раньше, чем закончится `bar()`, 
и это гарантированно стандартом (Run-to-completion). 

Блокирующий код (синхронные операции) идут сверху вниз, и ничего
не может быть вызвано "в середине выполнения функции", т.к. Event Loop
однопоточный и он "занят" выполнением этой функции.

Другими словами, вы не можете поставить выполнение обычной функции 
"на паузу", чтобы выполнить другой код.

***или можете***?

**Функции-Генераторы** - отдельный вид функций, которые могут 
"приостанавливать" свое выполнение, генерировать (возвращать) более
одного значения, передавать управление и выполнение кода "в середине"
функции, обеспечивая еще один вид асинхронности в JS.

## Links

1. [Kyle Simpson - You don't know JS - Async & Performance - ch.4 (Online book)](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/sync-async/ch4.md)
2. [Asynchrony: Under the Hood - Shelley Vohr - JSConf EU (Youtube)](https://www.youtube.com/watch?v=SrNQS8J67zc)
3. [learn.javascript.ru - Generators (Online resource)](https://learn.javascript.ru/generators)
4. [developer.mozilla.org - Generators and iterators (Online resource)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Iterators_and_Generators)
