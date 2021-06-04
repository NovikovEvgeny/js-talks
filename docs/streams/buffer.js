///[alloc]
const buf1 = Buffer.alloc(16);

const buf2 = Buffer.from('buffer content', 'utf8');

console.log(buf1);

console.log(buf2);

//Buffer size is set

console.log(buf1.length, buf2.length);

buf1.write('My new buffer content is really long');

console.log(buf1.toString()); //My new buffer co

///[alloc]

///[fill]
const emptyBuffer = Buffer.alloc(10);
emptyBuffer.fill('AB');
console.log(emptyBuffer.toString());
///[fill]

///[compare]
const compBuffer1 = Buffer.from('123');
const compBuffer2 = Buffer.from('456');
const compBuffer3 = Buffer.from('456');

console.log(Buffer.compare(compBuffer1, compBuffer2));
console.log(Buffer.compare(compBuffer2, compBuffer3));
console.log(Buffer.compare(compBuffer3, compBuffer1));
///[compare]

///[concat]
const concBuffer1 = Buffer.from('1');
const concBuffer2 = Buffer.from('2');
const concBuffer3 = Buffer.from('3');

const array = [ concBuffer1, concBuffer2, concBuffer3 ];
console.log(array);

const concatenatedBuffer = Buffer.concat(array);

console.log(concatenatedBuffer);
///[concat]

///[slice]
const longBuffer = Buffer.from(' this buffer is so long you have no HOPE of extracting data from it');

console.log(longBuffer.slice(36, 40).toString());
///[slice]

///[includes]
const bufferWithoutGiraffes = Buffer.from('This buffer contains random data and definitely has no giraffes in it');
console.log(bufferWithoutGiraffes.includes('giraffe'));
///[includes]

///[playground]
const playWithMe = Buffer.from('8ee775981a292976182e5522a0d53314', 'hex');

///[playground]

