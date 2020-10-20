# Tasks

```javascript
function asyncWait(ms = 100) {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
}

async function myCoolFunc(array) {
    console.log('1');
    array.forEach(async (elem) => {
        await asyncWait(100);
        console.log(elem);
    });
    console.log('2');
}

myCoolFunc(['a', 'b', 'c'])
    .then(() => console.log('async iteration is done'));
void 0; // ignore this line
```

```javascript
function getUser(id) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({
                id,
                username: `user${id}`,
            });
        }, Math.random() * 1000)
    });
}

async function getUsers(ids) {
    const users = [];
    for (i in ids) {
        const user = await getUser(ids[i]);
        users.push(user);
    }
    return users;
}

getUsers([1, 2, 3])
    .then((users) => console.log(users));
void 0; // ignore this line !
```