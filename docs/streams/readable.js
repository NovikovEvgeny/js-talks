///[example]
const fs = require('fs');

const readStream = fs.createReadStream('./package.json');

readStream.on('data', chunk => {
    console.log(chunk);
});

readStream.on('open', () => {
    console.log('--- Opened stream ---');
});

readStream.on('end', () => {
    console.log('--- Closed stream ---');
});
///[example]

///[custom]
const Stream = require('stream');
const readableStream = new Stream.Readable();

readableStream.push('data chunk');
readableStream.push('another data chunk');
///[custom]

///[for-await-of]
const { Readable } = require('stream');

async function readableToString2(readable) {
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

const readable = Readable.from('This data will be sent to processing function in chunks!', {encoding: 'utf8'});
readableToString2(readable).then(console.log);
///[for-await-of]

///[iterable]
const { Readable } = require('stream');

async function * generate() {
    yield 'hello';
    yield 'from';
    yield 'stream';
}

const readable = Readable.from(generate());

readable.on('data', (chunk) => {
    console.log(chunk);
});
///[iterable]
