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
  const interval = setInterval(() => {
    console.log('MASTER: event loop is not blocked!');
  }, 500);


  console.time('parse45');
  const worker = new Worker(__filename, {
    workerData: 45
  });
  worker.on('message', () => {
    console.timeEnd('parse45');
    clearInterval(interval)
  });
  worker.on('error', () => console.error('some error happened'));
  worker.on('exit', (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });

  console.time('parse35');
  const worker2 = new Worker(__filename, { workerData: 35 });
  worker2.on('message', () => console.timeEnd('parse35'));
  worker2.on('error', () => console.error('some error happened'));
  worker2.on('exit', (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });
} else {
  const interval = setInterval(() => {
    console.log('WORKER: event loop IS blocked!');
  }, 500);
  parentPort.postMessage(fibo(workerData));
  clearInterval(interval);
}
