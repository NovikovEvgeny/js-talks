// setTimeout(function() {
//     console.log('Hello after 1000ms');
// }, 1000);


const fs = require('fs');

// function readDirRecursive(path, callback) {
//     fs.readdir(path)
// }

const path = require('path');


function readDirRecursive(currentPath, callback) {
    fs.readdir(currentPath, (err, files) => {
        if (err) return callback(err);

        let i = 0;
        const results = [];

        function nextItem() {
            if (i >= files.length) return callback(null, results);
            const currentFile = path.resolve(currentPath, files[i]);
            i++;
            // console.log('         Reading item | ' + currentFile);

            fs.lstat(currentFile, (err, stats) => {
                if (err) return callback(err);
                if (!stats.isDirectory()) {
                    results.push(currentFile);
                    // console.log('Finished Reading item | ' + currentFile);
                    nextItem();
                } else {
                    readDirRecursive(currentFile, (err, files) => {
                        if (err) return callback(err);
                        results.push(...files);
                        // console.log('Finished Reading item | ' + currentFile);
                        nextItem();
                    });
                }
            });
        }
        nextItem();
    })
}

console.time();
readDirRecursive(path.resolve(__dirname, 'somedir'), (err, files) => {
    console.timeEnd();
    console.log(`Analyzed ${files.length} files`);
});
console.log('hey there');


