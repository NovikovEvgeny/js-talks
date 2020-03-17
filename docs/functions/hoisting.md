# Hoisting

Поднятие, всплытие, тысячи их.  
Любое объявление будет перемещенно наверх, выделена память под переменные, но при этом значение самих переменных неопределено. На момент запуска в скоупе **есть** эти переменные, но **нет** их значений.

[filename](hoisting.js ':include :type=code :fragment=hoisting')

Поработаем за движок:

[filename](hoisting.js ':include :type=code :fragment=hoistingInt')

### Проблемы, которые могут возникнуть из-за всплытия:

[filename](hoisting.js ':include :type=code :fragment=varProblem')

И циклы: 

[filename](hoisting.js ':include :type=code :fragment=loops')
