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
  console.time('parse2-main');
  fibo(2);
  console.timeEnd('parse2-main');

  const worker = new Worker(__filename);

  worker.on('message', (data) => {
    console.timeEnd('parse2-worker');
    console.log(data);
    worker.unref();
  });
  worker.on('error', () => console.error('some error happened'));
  worker.on('exit', (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });

  console.time('parse2-worker');
  worker.postMessage(2);
} else {
  parentPort.on('message', data => {
    parentPort.postMessage(fibo(data));
  });
}
