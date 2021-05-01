# Примеры использования EventEmitter в Node.js

## Streams

```js
const { createReadStream } = rqeuire('fs');

let chunkIndex = 0;
const readStream = createReadStream('./example.md');

readStream.on('open', () => {
    console.log('Started Reading...');
});

readStream.on('end', () => {
    console.log('Completed Reading...');
});

readStream.on('data', chunk => {
    chunkIndex += 1;
    console.log(`Chunk: ${chunkIndex}`);
    console.log('-----------------------------------------');
    console.log(chunk);
    console.log("\n");
});
```

## HTTP calls

Taken from [promises lesson](../promise/livecoding)

```js
const https = require('https');
const util = require('util');
const url = 'https://gist.githubusercontent.com/thuwie/2a2795abff3b15cd65fd7d1bc7934e15/raw/4e0af1d8d8941f80c608b2d1843a3ccfa3486cb0/test';
const gitUrl = 'https://api.github.com';
const options = {headers: {'user-agent': 'node.js'}};

const request = function (url, callback) {
    https.get(url, options, (res) => {
        const {statusCode} = res;

        if (statusCode !== 200) {
            callback(new Error('not 200'));
            return;
        }

        let rawData = '';

        // 'data' event!
        res.on('data', (chunk) => {
            rawData += chunk;
        });

        // 'end' event!
        res.on('end', () => {
            callback(null, String(rawData));
        });
    })
};

request(url, (err, response) => {
  if (err) {
    console.log('error!', err)
    return;
  }
  console.log('success!', response)
});
```

## Process events

```js
// some clean up
process.on("exit", () => console.log("Exit"));
process.on("beforeExit", () => console.log("Before Exit"));

// catch errors (sync)
process.on('uncaughtException', () => {
    console.log('Exception');
    process.exit();
});

// catch unhandled Promises
process.on('unhandledRejection', () => {
    console.log('Unhandled promise');
    process.exit();
});

// graceful shutdown
process.on('SIGINT', () => {
    console.log('The program was interrupted with Ctrl + C');
    // e.g. server.close(), or close some conntecions, or log info
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('The program was terminated');
    // e.g. server.close(), or close some conntecions, or log info
    process.exit();
});


throw new Error('Test Error');
Promise.reject();
```