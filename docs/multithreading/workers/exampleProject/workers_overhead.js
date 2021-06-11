const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

function fibo(n) {
  if (n > 45) {
    throw "too much";
  }
  if (n < 2) {
    return 1;
  }
  return fibo(n - 2) + fibo(n - 1);
}

if (isMainThread) {

  console.time('parse2');
  const worker = new Worker(__filename, {
    workerData: 2
  });
  worker.on('message', () => {
    console.timeEnd('parse2');
  });
  worker.on('error', () => console.error('some error happened'));
  worker.on('exit', (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });
} else {
  parentPort.postMessage(fibo(workerData));
}
