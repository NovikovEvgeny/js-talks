/// [exports]
const moduledImport = require('./exportA');
const shortcutImport = require('./exportB');


console.log(moduledImport);
console.log(shortcutImport);

const classA = new moduledImport('Phil');
console.log(classA.getHi());

classB = new shortcutImport('Nana');
console.log(classB.getHi());
/// [exports]