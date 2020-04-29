const {createServer} = require('http');

const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e20; i++) {
        sum += i;
    }
    return sum;
};

const server = createServer();

server.on('request', (req, res) => {
    console.log('rqe');
    if (req.url === '/compute') {
        const sum = longComputation();
        return res.end(`Sum is ${sum}`);
    } else {
        res.end('Ok')
    }
});

server.listen(8080);