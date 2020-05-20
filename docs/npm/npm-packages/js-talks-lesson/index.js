/**
 * Prints name to console
 *
 * @param {number} number number of times to print in console
 * @param {string} name your name
 * @returns {string} modified name
 */
function sayHi(number, name) {
  for (let i = 0; i < number; i++) {
    console.log(`Hi, ${name}`);
  }
  return `Modified ${name}`;
}

module.exports.sayHi = sayHi;
