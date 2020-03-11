const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);
const a = readFilePromise('asd.html');
try {

        a.then(res => console.log(res)).catch(err => console.log('a'))
} catch (err) {
    console.error(error);
}
