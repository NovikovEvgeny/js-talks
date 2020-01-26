# Await 

**Await** - работа с `thenable` объектами, ключевое слово ожидает `resolve` в результате. **Async** оборачивает объект в `return` в промис.  
Если не использовать `await`, к такой функции все еще можно будет применить `.then .catch`. Важное условие - функция, в которой используется `await` обязательно должна быть `async`, иначе это приведет к отбросу **SyntaxError**.

```
function normalFunction() { 
    return 5;
}

const obj = normalFunction();
console.log(obj);
```
```
async function asyncFunction() {
    return 5;
}

const obj = asyncFunction();
console.log(obj);
```
Пример того, как использовать `await` в async функции и/или в главном скоупе, IIFE
```
async function asyncFunction() {
  return 5;
}

(async () => {
  console.log('In async');
  const obj = await asyncFunction();
  console.log(obj);
})();
console.log('After async');
```

Await в цикле:
```
function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

async function delayedLog(item) {
  await delay();
  console.log(item);
}
async function processArray(array) {
  array.forEach(async (item) => {
    await delayedLog(item);
  })
  console.log('Done!');
}

processArray([1, 2, 3]);
```
Рабочий вариант:
```
function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

async function delayedLog(item) {
  await delay();
  console.log(item);
}
async function processArray(array) {
  for (const item of array) {
    await delayedLog(item);
  }
  console.log('Done!');
}

processArray([1, 2, 3]);
```
Правильный вариант:
```
function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

async function delayedLog(item) {
  await delay();
  console.log(item);
}
async function processArray(array) {
  const promises = array.map(delayedLog);
  await Promise.all(promises);
  console.log('Done!');
}

processArray([1, 2, 3]);
```
Ретерн асинк функции
```
async function wait(timeout) {
	return new Promise(resolve => setTimeout(resolve, timeout));
}

async function timer() {
	const timeout = 300;
	return wait(timeout);
}
(async () => {
	await timer();
	console.log('Done');
})
```
Неправильный ретерн
```
async function wait(timeout) {
	throw new Error('My error');
}

async function timer() {
	try {
		const timeout = 300;
		return wait(timeout);
    } catch (error) {
    	console.log(error);
    }
}
(async () => {
	await timer();
	console.log('Done');
})
```