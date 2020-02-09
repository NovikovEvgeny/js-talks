const SmartGithub = require('../../src/smart-github');
const smartGithub = new SmartGithub('NovikovEvgeny');

describe('smart-github.js jest spec', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {

  });

  test('should be ok', async () => {
    const mock = jest.spyOn(smartGithub.github, 'getRepositories')
      .mockReturnValue(Promise.resolve(['asdf', 'fdas']));

    const response = await smartGithub.getRepositories();

    expect(response).toBeArrayOfSize(2);
    expect(response).toIncludeAnyMembers([{
      name: 'asdf',
      private: true,
    }]);
    expect(mock).toBeCalledWith('NovikovEvgeny');
  });
});
