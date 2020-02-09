const axios = require('axios');

async function getRepositories(username) {
  if (!username) {
    throw new Error('username must be defined');
  }

  const requestUrl = `https://api.github.com/users/${username}/repos`;

  const response = await axios.get(requestUrl);

  return response.data.map(repo => repo.name);
}

exports.getRepositories = getRepositories;
