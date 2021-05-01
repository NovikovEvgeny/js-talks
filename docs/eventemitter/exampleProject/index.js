const {resolve} = require('path');
const Crawler = require('./Crawler');
const CrawlerEmitter = require('./CrawlerEvent');

const crawler = new Crawler();
const eventCrawler = new CrawlerEmitter();

const path = resolve(__dirname, '../../../docs');

// withot event emitter - naive realization

const files = crawler.readDir(path);
files.forEach((file) => console.log(file));

//--------

// event emitter impl

eventCrawler.on('fileNameFound', (fileName) => console.log(fileName));
eventCrawler.readDir(path);