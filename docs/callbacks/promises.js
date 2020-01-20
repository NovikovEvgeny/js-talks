const fs = require('fs');

function readFileProperly(fileName, cb) {
  fs.readFile(fileName.replace('\r\n', ''), (err, content) => {
    if (err) {
      return void cb(err);
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

// for (let i = 0; i < 100000; i++) {
//   console.log(i);
// }

myPromise
  .then(content => {
    console.log(content);
    // return readFileProperlyPromise(content);
    return Promise.reject('sdf');
  })
  .then(content => {
    console.log(content);
  }, err => {
    console.log('err from inner!' + err);
    return Promise.resolve(42);
  })
  .then(c => console.log(c))
  .catch(err => {
    console.error('error!: ' + err);
  });

// myPromise.then( c => {
//   return 5;
// })
// .then(c => console.log(c));


// Promise.all


// cb - callstack
// cb - try-catch
// cb - indentation
// cb - 2-times call (full cb_bad)
// promises - how to promisify
// promises - 1 time resolve
// promises - do not stop it's execution
// promises - tye-catch
// promises - two .then do not call promise itself twice
// promises - chaining
// promises - Promise boxing when return non-promise
// promises - resolve chaining immediately
// promises - .catch for all chain and for one promise only
// promises - .all .race etc
