const fs = require('fs');

setTimeout(() => {
  console.log('start (1st (or maybe second!) iteration of event loop');

  const intId = setInterval(() => console.log('interval'), 0);

  fs.readFile('file.txt', (err, res) => {
    if (err) {
      throw err;
    }

    console.log(res.toString());

    clearInterval(intId);
  });

  let counter = 0;

  function b() {
    console.log('b');
  }
  function a() {
    console.log('a');
    b();
  }

  function rec() {
    if (counter++ > 100) {
      return;
    }
    // console.log('rec');
    a();
    return rec();
  }
  rec();

// rec();


  console.log('end 1st/2nd iteration of event loop!');
}, 0);

console.log('from index.js before 1st iteration of event loop');
