///[ruleResolve]
const promise = new Promise((resolve, reject) => {
    resolve('a');
});

promise
    .then(res => console.log("Fullfilled! :)", res))
    .catch(res => console.error("Rejected! :(", res));
///[ruleResolve]

///[rulePendingForever]
const promise = new Promise((resolve, reject) => {
  for (let i = 0; i < 3; i++) {
    console.log(i);
  }
  // Forgot to call "resolve" or "reject!"
  return 'some data! but it will be always ignored';
});

promise
  .then(res => console.log("Fullfilled! :)", res))
  .catch(res => console.error("Rejected! :(", res));
///[rulePendingForever]


///[ruleRejectWithReject]
const promiseWithReject = new Promise((resolve, reject) => {
    reject('error message (string)');
});

promiseWithReject
    .then(res => console.log("Fullfilled! (1) :)", res))
    .catch(res => console.error("Rejected! (1) :(", res));

promiseWithReject; // Promise { &lt;rejected&lt; }
///[ruleRejectWithReject]


///[ruleRejectWithThrow]
const promiseWithThrowError = new Promise((resolve, reject) => {
  throw new Error('error message (inside Error object)');
});

promiseWithThrowError
  .then(res => console.log("Fullfilled! (2) :)", res))
  .catch(res => console.error("Rejected! (2) :(", res));

promiseWithThrowError; // Promise { &lt;rejected&gt; }
///[ruleRejectWithThrow]

///[synt]
// single promise. Created once and will never change it's status
const myPromise = new Promise((resolve, reject) => {
    const name = null;

    if (!name) {
        reject(new Error('No name'));
    }

    resolve(name);
});

// Will create new promise every call
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

///[thenBoth]

function getPromiseResRef(shouldResolve) {
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      return resolve('Good');
    }
    reject ('Bad');
  });
}

getPromiseResRef(true)
  .then((result) => console.log('Fulfilled! (1)', result), (err) => console.log('Rejected! (1)', err));

getPromiseResRef(false)
  .then((result) => console.log('Fulfilled! (2)', result), (err) => console.log('Rejected! (2)', err));

///[thenBoth]

///[try]
const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);

try {
	readFilePromise('filename')
	  .then(res => console.log("Resolved! :) ", res));
} catch (err) {
  console.log("We'll never get here");
	console.error(error);
}
///[try]

///[chain]
const promise = new Promise((resolve, reject) => {
	resolve(5);
});

promise
  .then(res => { // or .then(res => res + 10)
    return res + 10;
  })
  .then(res => console.log(res));
///[chain]


///[chainWithCatchInTheMiddle]
const promise = new Promise((resolve, reject) => {
	resolve(5);
});

promise
  .then(res => {
    throw new Error('my cool error');
  })
  .catch(err => {
    console.error("Catched in the middle:", err, "will return some string instead and proceed the chain");
    return 'good value processed after error';
  })
  .then(res => console.log(res))
  .catch(err => console.log('this will never happen in our core'));
///[chainWithCatchInTheMiddle]


///[chainWithCatchInTheEnd]
const promise = new Promise((resolve, reject) => {
	resolve(5);
});

promise
  .then(res => {
    throw new Error('my cool error');
  })
  .then(res => console.log('and now THIS will never happen in our core, since we removed middle-catch'))
  .catch(err => console.error(err));
///[chainWithCatchInTheEnd]


///[noreturn]
const fs = require('fs');

const fileName = 'file_name_that_does_not_exist.txt';

const promise = new Promise((resolve, reject) => {
  fs.readFile(fileName, (err, content) => {
    if (err) {
      console.log('inside if');
      reject(err);
    }
    console.log('promise is already rejected, but code is still being executed');
    resolve(content);
  });
});

promise
    .then(res => console.log("Fullfilled! :)", res))
    .catch(res => console.error("Rejected! :(", res));
///[noreturn]


///[all]
const data = [{id:1}, {id:2}];

function store(item){
	return new Promise((resolve, reject) => {
		//save item somewhere
		setTimeout(resolve, Math.random()*1000);
	});
}

for (let i = 0; i < data.length; i++) {
	store(data[i])
	  .then(() => console.log('Success'))
	  .catch((err) => console.log(err));
}

const promises = data.map((item) => store(item));

Promise.all(promises);
Promise.race(promises);

// Since Node.js v12
Promise.allSettled(promises);

// Since Node.js v15
Promise.any(promises);
///[all]


///[promisify]
const fs = require('fs');

function readFileProperly(fileName, cb) {
  fs.readFile(fileName.replace('\r\n', '', (err, content) => {
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

const myPromise = readFileProperlyPromise('package.json');

///[promisify]
