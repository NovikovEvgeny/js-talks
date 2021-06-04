///[example]
const fs = require('fs');
const readableStream = fs.createReadStream('package.json');
const writableStream = fs.createWriteStream('package.json.backup');

readableStream.setEncoding('utf8');

readableStream.on('data', (chunk) => {
    writableStream.write(chunk);
});

readableStream.on('end', () => {
    writableStream.end();
});
///[example]

///[end]
const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
file.write('test');
///[end]

///[async]
const util = require('util');
const stream = require('stream');
const fs = require('fs');
const { once } = require('events');

const finished = util.promisify(stream.finished); // turn stream.finished from callback to promise

async function writeIterableToFile(iterable, filePath) {
  const writable = fs.createWriteStream(filePath, {encoding: 'utf8'});
  for await (const chunk of iterable) {
    if (!writable.write(chunk)) {
      // wait until we can write
      await once(writable, 'drain');
    }
  }
  writable.end(); // try to close and see if there are any errors
  await finished(writable); // if there are, this line will throw
}

await writeIterableToFile(
  ['Logging info:', ' one line output is successfull.\n'], 'log.txt');
  console.log(fs.readFileSync('log.txt', {encoding: 'utf8'}));
///[async]

///[pipe]
const fs = require("fs");
 
let readableStream = fs.createReadStream('package.json', "utf8");
 
let writeableStream = fs.createWriteStream('package.json.backup');
 
readableStream.pipe(writeableStream);
///[pipe]

///[pipeline]
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

pipeline(
  fs.createReadStream('package.json'),
  zlib.createGzip(),
  fs.createWriteStream('package.json.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
///[pipeline]
