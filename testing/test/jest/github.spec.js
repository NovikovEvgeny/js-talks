const github = require('../../src/github');

describe('github.js jest spec', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {

  });

  test('should be ok', async () => {
    const response = await github.getRepositories('NovikovEvgeny');
    expect(response).toBeArray();
  });
});
