const fs = require('fs');
const path = require('path');
const walk = function(dir, done) {
    const results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            // console.log('         Reading item | ' + file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results.push(...res);
                        // console.log('Finished Reading item | ' + file);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    // console.log('Finished Reading item | ' + file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

console.time();
walk(path.resolve(__dirname, 'somedir'), (err, files) => {
    console.timeEnd();
    console.log(`Analyzed ${files.length} files`);
});