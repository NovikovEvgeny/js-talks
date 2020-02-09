const SmartGithub = require('../../src/smart-github');
const github = require('../../src/github');
const { expect } = require('chai');
const simple = require('simple-mock');

// https://github.com/mochajs/mocha/wiki#mocks-stubs--spies
describe('GitHub.js spec test with nocks', () => {
  let smartGithub;

  before(() => {
    smartGithub = new SmartGithub('NovikovEvgenyf');
  });

  after(() => {

  });

  beforeEach(() => {

  });

  afterEach(() => {

  });

  it('getRepositories should return mapped array of objects', async () => {
    simple.mock(smartGithub.github, 'getRepositories').resolveWith(['my-cool-repo']);
    const response = await smartGithub.getRepositories();

    expect(response).to.have.lengthOf(1);
    expect(response).to.deep.include({
      name: 'my-cool-repo',
      private: true,
    });
  });
});
