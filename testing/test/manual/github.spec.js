

const github = require('../../src/github');

async function shouldReturnArrayOfRepositoryNames() {
  const response = await github.getRepositories('NovikovEvgeny');

  console.assert(response && Array.isArray(response), 'Response is not an array')
}

(async () => {
  await shouldReturnArrayOfRepositoryNames();
})();
