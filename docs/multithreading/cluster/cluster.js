///[cluster-example]
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// if (cluster.isPrimary) { // starting from Node.js 16
if (cluster.isMaster) {  // node.js 0.8.1 - 15.x
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
///[cluster-example]
