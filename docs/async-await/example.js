/// [promisesExample]
const https = require('https');
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

request(url)
    .then(data => {
        const usernames = data.split(', ');
        const promises = usernames.map(user => {
            return request(`${gitUrl}/users/${user}/repos`);
        });
        return Promise.all(promises);
    })
    .then(results => {
        const repos = results.flatMap(result => {
            const parsed = JSON.parse(result);
            return parsed.map(item => item.name);
        });
        console.log(repos);
    })
    .catch(err => {
        console.log(err);
    });

/// [promisesExample]

/// [asyncAwaitExample]
const https = require('https');
const url = 'https://gist.githubusercontent.com/thuwie/2a2795abff3b15cd65fd7d1bc7934e15/raw/4e0af1d8d8941f80c608b2d1843a3ccfa3486cb0/test';
const gitUrl = 'https://api.github.com';
const options = {headers: {'user-agent': 'node.js'}};

// Оборачивание callback-based функций никуда не делось - тут async/await не поможет
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

// here is the magic!
async function main() {
    try {
        // one await - but don't change indentation!
        const data = await request(url);
        const usernames = data.split(', ');
        const promises = usernames.map(user => {
            return request(`${gitUrl}/users/${user}/repos`);
        });
        // second await - but still don't change indentation!
        const results = await Promise.all(promises);

        const repos = results.flatMap(result => {
            const parsed = JSON.parse(result);
            return parsed.map(item => item.name);
        });
        console.log(repos);
    } catch (error) {
        console.log(error);
    }
}

// we can event get rid of ".catch" because try catch is inside the main function
main();
/// [asyncAwaitExample]