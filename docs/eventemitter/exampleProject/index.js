const {resolve} = require('path');
const Crawler = require('./Crawler');
const CrawlerEmitter = require('./CrawlerEvent');

const crawler = new Crawler();
const eventCrawler = new CrawlerEmitter();

// const path = resolve(__dirname, '../../../../tictactoe/node_modules'); // over9000
const path = resolve(__dirname, '../../../docs');

// withot event emitter
const files = crawler.readDir(path);
files.forEach((file) => console.log(file));
//--------

// event emitter impl
// eventCrawler.on('data', (data) => console.log(data));

eventCrawler.readDir(path);