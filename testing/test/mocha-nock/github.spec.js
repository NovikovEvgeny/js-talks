const github = require('../../src/github');
const nock = require('nock');
const { expect } = require('chai');

// https://github.com/mochajs/mocha/wiki#mocks-stubs--spies
describe('GitHub.js spec test with nocks', () => {
  before(() => {
    nock('https://api.github.com')
      .get('/users/NovikovEvgeny/repos')
      .reply(200, [
        { name: 'repo1' },
        { name: 'repo2' },
        { name: 'repo3' },
        { name: 'repo4' },
        { name: 'puppeteer' },
      ]);

    nock('https://api.github.com')
      .get('/users/notfound/repos')
      .reply(404, {
        error: 'user not found'
      });
  });

  after(() => {

  });

  beforeEach(() => {

  });

  afterEach(() => {

  });

  it('getRepositories should return array in good case', async () => {


    const response = await github.getRepositories('NovikovEvgeny');
    // expect
    expect(response).to.have.lengthOf(5);
    expect(response).to.include('puppeteer');
  });

  it('getRepositories should rethrow any error', (done) => {
    github.getRepositories('notfound')
      .then(() => {
        done('getRepositories should reject promise when username not found');
      })
      .catch(err => {
        expect(err.message).to.be.eql('Request failed with status code 404');
        expect(err.response.data.error).to.be.eql('user not found');
        done();
      })
  });

});
