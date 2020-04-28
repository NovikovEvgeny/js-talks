const {readdirSync, lstatSync} = require('fs');
const {resolve, join} = require('path');
const EventEmitter = require('events');

class Crawler extends EventEmitter {

    constructor() {
        super();
    }

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

    sendData(data) {
        console.log(data);
    }
}

module.exports = Crawler;