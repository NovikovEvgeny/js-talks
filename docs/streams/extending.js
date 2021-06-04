const { Readable } = require('stream');
const through2 = require('through2');

const stream = Readable({objectMode: true});   
stream._read = () => {};                       

setInterval(() => {                            
  stream.push({
    x: Math.random()
  });
}, 100);

const getX = through2.obj((data, enc, cb) => { 
  cb(null, `${data.x.toString()}\n`);
});

stream.pipe(getX).pipe(process.stdout);
