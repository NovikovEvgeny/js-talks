

const github = require('./github');

github.getRepositories('NovikovEvgeny')
  .then(response => {
    console.log(response);
  });
