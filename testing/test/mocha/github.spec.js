const github = require('../../src/github');
const {assert, expect, should} = require('chai');
should();

describe('GitHub.js spec test', () => {
  before(() => {

  });

  after(() => {

  });

  beforeEach(() => {

  });

  afterEach(() => {

  });

  it('getRepositories shoud return array in good case', async () => {
    const response = await github.getRepositories('NovikovEvgeny');

    // https://mochajs.org/#assertions
    // default node.js assert - first argument must be true
    // const defaultAssert = require('assert');
    // defaultAssert(!Array.isArray(response), 'asdf');

    // BDD (behavior driven development)
    // https://www.chaijs.com/api/bdd/

    // extended chai assert - assert.someCondition(validatedArgument, value, errMsg)
    // assert.lengthOf(response, 5, 'returned not 5');

    // expect
    expect(response).to.have.lengthOf(5);
    expect(response).to.include('puppeteer');

    // should
    // response.should.have.lengthOf(5);
    // response.should.include('puppeteer');
  });

  it('should throw an error if username is empty', (done) => {
    github.getRepositories()
      .then(() => {
        done('getRepositories should reject promise when usename is not specified');
      })
      .catch(err => {
        expect(err.message).to.be.eql('username must be defined');
        done();
      })
  });
});
