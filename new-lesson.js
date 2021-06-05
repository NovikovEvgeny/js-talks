const path = require('path');
const fs = require('fs');

const SIDEBAR_MENUITEM_TEMPLATE = `- [LESSON_NAME](LESSON_NAME/LESSON_NAME.md)\n`;

const SIDEBAR_TEMPLATE = `- [LESSON_NAME](./LESSON_NAME.md)
_____
- [Read more](./read_more.md)\n`;

const MD_TEMPLATE = `# LESSON_NAME

Some text

and below is an example of the code snippet

[filename](LESSON_NAME.js ':include :type=code :fragment=fragment1')
`;

const JS_TEMPLATE = `/// [fragment1]
console.log('some code');
/// [fragment1]
`;

const READ_MORE_TEMPLATE = `# Read more

* [link text](link url)
`;

function generateFilesContent(lessonName) {
  return {
    lessonSidebar: SIDEBAR_TEMPLATE.replace(/LESSON_NAME/g, lessonName),
    mainMd: MD_TEMPLATE.replace(/LESSON_NAME/g, lessonName),
    mainJs: JS_TEMPLATE.replace(/LESSON_NAME/g, lessonName),
    readMore: READ_MORE_TEMPLATE.replace(/LESSON_NAME/g, lessonName),
    sidebarMenuItem: SIDEBAR_MENUITEM_TEMPLATE.replace(/LESSON_NAME/g, lessonName),
  }
}

// --------- logic starts here ----------
const newLessonName = process.argv[2];

if (!newLessonName) {
  console.log('Failed to get new lesson name');
  console.log('Run the script using "npm run new-lesson <lesson name>');
}

const rootPath = __dirname;


const docsPath = path.join(rootPath, 'docs');
const newFolderName = path.join(docsPath, newLessonName);
const pathExists = fs.existsSync(newFolderName);
if (pathExists) {
  console.error('already exists');
  process.exit(1);
}

fs.mkdirSync(newFolderName);

const filesContent = generateFilesContent(newLessonName);
fs.writeFileSync(path.join(newFolderName, '_sidebar.md'), filesContent.lessonSidebar);
fs.writeFileSync(path.join(newFolderName, 'read_more.md'), filesContent.readMore);
fs.writeFileSync(path.join(newFolderName, `${newLessonName}.md`), filesContent.mainMd);
fs.writeFileSync(path.join(newFolderName, `${newLessonName}.js`), filesContent.mainJs);

fs.appendFileSync(path.join(docsPath, '_sidebar.md'), `${filesContent.sidebarMenuItem}\n`);
fs.appendFileSync(path.join(docsPath, 'README.md'), `${filesContent.sidebarMenuItem}\n`);