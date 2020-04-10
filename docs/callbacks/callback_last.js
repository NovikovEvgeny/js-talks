{
/// [fs-simple]
const fs = require('fs');
//           ↓ first argument of the async function
//                            ↓ second (and in this case - last one) argument of the async function
//                                                                        ↓ first argument in the CALLBACK
//                                                                        ↓ it will be Error if error really happened and null if everything is ok
fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {

});
/// [fs-simple]
}

{
/// [fs-error-handling]
    const fs = require('fs');
    fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
        if (error) {
            throw error;
        }
        console.log(fileContent.toString());
    });
/// [fs-error-handling]
}

{
/// [async-try-catch-bad]
    const fs = require('fs');
    try {
        fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
            if (error) {
                throw error;
            }
            console.log(fileContent.toString());
        });
    } catch (error) {
        console.error(error);
    }
/// [async-try-catch-bad]
}

{
/// [async-error-handling-almost-good]
    const fs = require('fs');
// note that callback is the last argument again
    function readFileTxt(callback) {
        fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
            if (error) {
                callback(error);
            }
            //       ↓ note null here!
            callback(null, fileContent.toString().trimEnd().trimStart());
        });
    }

    readFileTxt(function iAmAlsoACallback(error, properContent) {
        if (error) {
            console.error('Some error happened, but I handled it properly!');
        }
        console.log(properContent);
    });
/// [async-error-handling-almost-good]
}

{
/// [async-error-handling-good]
    const fs = require('fs');
// note that callback is the last argument again
    function readFileTxt(callback) {
        fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
            if (error) {
                callback(error);
                return; // just to stop execution of the current function
                // or return callback(error);
            }
            //       ↓ note null here!
            callback(null, fileContent.toString().trimEnd().trimStart());
            return; // not really necessary here, since last operation in the function
        });
    }

    readFileTxt(function iAmAlsoACallback(error, properContent) {
        if (error) {
            console.error('Some error happened, but I handled it properly!');
            return;
        }
        console.log(properContent);
        return; // not really necessary here, since last operation in the function
    });
/// [async-error-handling-good]
}

{
/// [counter]
    const fs = require('fs');
    function readFileTxt(callback) {
        fs.readFile('file.txt', function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
            if (error) {
                callback(error);
            }
            callback(null, fileContent.toString().trimEnd().trimStart());
        });
    }

    let iAmAlsoCallbackCounter = 0;
    readFileTxt(function iAmAlsoACallback(error, properContent) {
        if (iAmAlsoCallbackCounter > 0) {
            return;
        }
        iAmAlsoCallbackCounter++;
        if (error) {
            console.error('Some error happened, but I handled it properly!');
            return;
        }
        console.log(properContent);
    });
/// [counter]
}

{
/// [counter-twice]
    const fs = require('fs');
    function readFileTxt(fileName, callback) {
        fs.readFile(fileName, function iAmCallbackAndIAmTheLastArgument(error, fileContent) {
            if (error) {
                callback(error);
            }
            callback(null, fileContent.toString().trimEnd().trimStart());
        });
    }

    let iAmAlsoCallbackCounter = 0;
    let iAmAlsoCallbackCounterforB = 0;
    readFileTxt('fileA.txt.', function iAmAlsoACallback(error, properContent) {
        if (iAmAlsoCallbackCounter > 0) {
            return;
        }
        iAmAlsoCallbackCounter++;
        if (error) {
            console.error('Some error happened, but I handled it properly!');
            return;
        }
        console.log('from fileA: ' + properContent);
        readFileTxt(properContent, function iAmAlsoCallbackB(error2, content2) {
            if (iAmAlsoCallbackCounterforB > 0) {
                return;
            }
            iAmAlsoCallbackCounterforB++;
            if (error2) {
                console.error('Some error happened, but I handled it properly! in second file!');
                return;
            }
            console.log('from second file: ' + content2);
        });
    });
/// [counter-twice]
}