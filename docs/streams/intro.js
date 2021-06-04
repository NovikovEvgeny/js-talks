///[callback]
const http = require('http');
const fs = require('fs');

const server = http.createServer((_req, res) => {
    fs.readFile(__dirname + '/data.txt', (err, data) => {
        if(err) res.end('Error!');
        res.end(data);
    });
});
server.listen(8000);
///[callback]

///[stream]
const http = require('http');
const fs = require('fs');

const server = http.createServer((_req, res) => {
    const stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(8000);
///[stream]
