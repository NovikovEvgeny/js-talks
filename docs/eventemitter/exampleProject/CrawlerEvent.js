const {readdirSync, lstatSync} = require('fs');
const {join} = require('path');
const EventEmitter = require('events');

class Crawler extends EventEmitter {

    constructor() {
        super();
    }

    readDir(path) {
        const files = readdirSync(path);

        files.forEach((file) => {
            const filePath = join(path, file);
            const fileStat = lstatSync(filePath);

            if (fileStat.isDirectory()) {
                this.readDir(filePath);
            } else {
                this.emit('fileNameFound', data);
            }
        });
    }
}

module.exports = Crawler;