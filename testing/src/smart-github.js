const github = require('./github');

class SmartGithub {
  constructor(username) {
    if (!username) {
      throw new Error('username must be defined');
    }
    this.username = username;
    this.github = github;
  }

  async getRepositories() {
    const repos = await this.github.getRepositories(this.username);

    return repos.map(repoName => ({
      name: repoName,
      private: true,
    }));
  }
}

module.exports = SmartGithub;
