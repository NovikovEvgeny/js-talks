# Разница

* import "хоистится" (выполняется в самом начале модуля), в то время как require выполняется в рантайме в момент вызова
* import имеет статическую валидацию
* из CJS невозможно загрузить EJS модуль, обратно - можно
* EJS - теперь де-юре стандарт в ECMAScript, наверно, лет через 10, мы все откажемся от CJS