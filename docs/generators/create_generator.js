/// [declareGenerator]
function* iAmGenerator1() {

}
function *iAmGenerator2() {

}
function*iAmGenerator3() {

}
/// [declareGenerator]

/// [logGenerator]
function* iAmGenerator() {
    console.log('Hey! I am generator!');
}

const gen = iAmGenerator();

console.log(gen.toString());
/// [logGenerator]
