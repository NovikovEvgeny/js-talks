const {readdirSync, lstatSync} = require('fs');
const {join} = require('path');

class Crawler {
    readDir(path, fileArr = []) {
        const files = readdirSync(path);

        files.forEach((file) => {
            const filePath = join(path, file);
            const fileStat = lstatSync(filePath);

            if (fileStat.isDirectory()) {
                this.readDir(filePath, fileArr);
            } else {
                fileArr.push(filePath);
            }
        });

        return fileArr;
    }
}

module.exports = Crawler;