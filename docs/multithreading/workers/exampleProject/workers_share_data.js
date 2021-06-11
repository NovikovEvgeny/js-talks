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
  const worker = new Worker(__filename);

  worker.on('message', (data) => {
    console.log(`data is just ${data}`);
    sharedArray.forEach((elem, index) => {
      console.log(elem);
    });
    worker.unref();
  });
  worker.on('error', () => console.error('some error happened'));
  worker.on('exit', (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });


  let nums = [21, 33, 15, 22];

  //get size of the array buffer with int32 size buffer for each element in the array
  const size = Int32Array.BYTES_PER_ELEMENT * nums.length;

  //create the buffer for the shared array
  const sharedBuffer = new SharedArrayBuffer(size);
  const sharedArray = new Int32Array(sharedBuffer);

  nums.forEach((num, index) => {
    Atomics.store(sharedArray, index, num);
  });


  worker.postMessage(sharedArray);
} else {
  parentPort.on('message', (sharedArray) => {
    sharedArray.forEach((elem, index) => {
      console.log(elem);
      Atomics.store(sharedArray, index, fibo(elem));
    });
    parentPort.postMessage('done');
  });
}
