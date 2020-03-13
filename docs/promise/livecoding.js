const https = require('https');
const util = require('util');
const url = 'https://gist.githubusercontent.com/thuwie/2a2795abff3b15cd65fd7d1bc7934e15/raw/4e0af1d8d8941f80c608b2d1843a3ccfa3486cb0/test';
const gitUrl = 'https://api.github.com';
const options = {headers: {'user-agent': 'node.js'}};

const request = function (url) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            const {statusCode} = res;

            if (statusCode !== 200) {
                reject('not 200');
            }

            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                resolve(rawData);
            });
        })
    });
};

const timeout = (() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('timoeout');
        }, 10);
    });
});

request(url)
    .then(data => {
        const usernames = data.split(', ');
        const promises = usernames.map(user => {
            return request(`${gitUrl}/users/${user}/repos`);
        });
        // return Promise.all(promises);
        return Promise.race([ ...promises, timeout() ]);
    })
    .then(results => {
        // if (!Array.isArray(results)) throw new Error('timeout');

        const repos = results.flatMap(result => {
            const parsed = JSON.parse(result);
            return parsed.map(item => item.name);
        });
        console.log(repos);
    })
    .catch(err => {
        console.log(err);
    });
