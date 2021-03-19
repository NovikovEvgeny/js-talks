# number

## Запись числа

Обычные числа в JavaScript хранятся в 64-битном формате [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), который также называют 
«числа с плавающей точкой двойной точности»
(double precision floating point numbers).

Способы записи числа

[filename](number.js ':include :type=code :fragment=howToDefine')

?> Начиная с ECMAScript 2021, стандарт поддерживает "separators for numeric literals":
`const a = 1_562_352`

Ещё есть шестнадцатиричная форма записи (`0xFF` = 255), двоичная (`0b111` = 7), восьмеричная (`0o377` = 255).
Как видно, маска для записи таких чисел: `0<symbol><actualNumber>`, где `<symbol>` - `x`, `b` или `o`, а затем
идет запись числа в N-ричном формате


## Floating point numbers

[filename](number.js ':include :type=code :fragment=floating')

Как обойти это чудо? Как и сказано в стандарте IEEE-754 - округлением

[filename](number.js ':include :type=code :fragment=floatingRound')

## Любимое число

Любимое число - `NaN` - Not a Number
Кстати, тоже описанное в IEEE-754

[filename](number.js ':include :type=code :fragment=NaN')

Так что это скорее не "не число", а "значение, при приведении которого к number возникла ошибка"

[filename](number.js ':include :type=code :fragment=NaNCompare')

`NaN` Даже не равен самому себе

[filename](number.js ':include :type=code :fragment=NaNCompare')

Как же тогда проверять, что какое-то значение есть `NaN`? Используйте `Number.isNaN()` (**не** `isNaN()`! Она имеет свои особенности!)

[filename](number.js ':include :type=code :fragment=isNaN')

## Чуть менее любимое число

Чуть менее любимое число - `Infinity` и `-Infinity`. Бесконечность. И тоже описанная в IEEE 754.

[filename](number.js ':include :type=code :fragment=Infinity')

Зато никакого overflow

Да еще и один полезный юзкейс - при поиске максимума/минимума. Или в любом другом случае, когда нужно "очень-очень большое число".

[filename](number.js ':include :type=code :fragment=FindMax')

И еще одно "зато" - можно делить на 0 без ошибок!

[filename](number.js ':include :type=code :fragment=DivideByZero')
