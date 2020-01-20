
const fs = require('fs');

// fs.readFile('fileA.txt', (err, content) => {
//   if (err) {
//     throw err;
//   }
//
//   fs.readFile(content.toString().replace('\r\n', ''), (err, content) => {
//     if (err) {
//       throw err;
//     }
//
//     console.log(content.toString());
//   });
// });



//


function readFileProperly(fileName, cb) {
  fs.readFile(fileName.replace('\r\n', ''), (err, content) => {
    if (err) {
      return void cb(err);
      // return;
    }

    if (content) {
      cb(null, content.toString());
    }
    cb(null, '');
  });
}

let fileACb = 0;
readFileProperly('fileA.txt', (err, content) => {
  if (fileACb > 0) {
    return;
  }
  fileACb++;
  if (err) {
    return console.log('error!: ', err);
  }
  console.log('fileAcb: filecontent is ' + content);
  readFileProperly(content, (err, content2) => {
    console.log('innterCb: ' + content2);
  });
});
