///[synt]
const myPromise = new Promise((resolve, reject) => {
    const name = null;

    if (!name) {
        reject(new Error('No name'))
    }

    resolve(name);
});

function getPromise(name) {
    return new Promise((resolve, reject) => {
        if(!name) {
            reject(new Error('No'))
        }

        resolve(name);
    })
}

myPromise
    .then(name => console.log(name))
    .catch(err => console.log(err));


const namePromise = getPromise('Alice');
namePromise.then(name => console.log(name));
///[synt]


///[then]
.then(onFulfilled, onRejected)

.then(name => console.log(name), error => console.error(error));

.then(null, error => console.error(error));

.catch(error => console.error(error));
///[then]


///[noreturn]
const fs = require('fs');

fs.readFile(fileName, (err, content) => {
  if (err) {
    reject(err);
  }
  console.log('sdf');
  resolve(content);
})
///[noreturn]


///[try]
const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);

try {
	readFilePromise('filename')
	  .then(res => console.log(res));
} catch (err) {
	console.error(error);
}
///[try]


///[chain]
const promise = new Promise((resolve, reject) => {
	resolve(5);
})

promise
  .then(res => res + 10)
  .then(res => console.log(res));
///[chain]

///[all]
const data = [{id:1}, {id:2}];

for (let i = 0; i < data.length; i++) {
	store(data[0])
	  .then(() => console.log('Success'))
	  .catch((err) => console.log(err));
}

const promises = data.map((item) => store(item));

Promise.all(promises);
///[all]


///[promisify]
const fs = require('fs');

function readFileProperly(fileName, cb) {
  fs.readFile(fileName.replace('\r\n', ''), (err, content) => {
    if (err) {
      return cb(err);
      // return;
    }

    if (content) {
      cb(null, content.toString());
    }
    cb(null, '');
  });
}

function readFileProperlyPromise(fileName) {
  return new Promise((res, rej) => {
    readFileProperly(fileName, (err, content) => {
      // console.log('sdf');
      if (err) {
        rej(err);
      }
      res(content);
    })
  });
}

const myPromise = readFileProperlyPromise('fileA.txt');

///[promisify]
