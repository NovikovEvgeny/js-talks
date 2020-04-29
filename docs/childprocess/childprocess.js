///[childprocess]
const { spawn } = require('child_process');

const child = spawn('pwd');

child.on('exit', function (code, signal) {
  console.log('child process exited with ' +
              `code ${code} and signal ${signal}`);
});
///[childprocess]


///[stdio]
child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});
///[stdio]

///[stdin]
const { spawn } = require('child_process');

const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-l']);

find.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
  console.log(`Number of files ${data}`);
});
///[stdin]


///[detach]
const { spawn } = require('child_process');

const child = spawn('node', ['timer.js'], {
  detached: true,
  stdio: 'ignore'
});

child.unref();
///[detach]


///[exec]
const { exec } = require('child_process');

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Number of files ${stdout}`);
});
///[exec]


///[fork]
const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.send({ hello: 'world' });
// ____________________ 
// child.js
process.on('message', (msg) => {
  console.log('Message from parent:', msg);
});

let counter = 0;

setInterval(() => {
  process.send({ counter: counter++ });
}, 1000);
///[fork]
