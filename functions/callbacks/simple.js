const fs = require('fs');


fs.readdir('./', (err, files) => {
  if (err) {
    throw err;
  }
  console.log(files);
});

console.log('I declared callback before this line, but it will be executed after!');