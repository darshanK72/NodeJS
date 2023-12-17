const path = require('path');


console.log("Current Directory Name : " + __dirname);
console.log("Current File Name : " + __filename)

const joinPath = path.join('/folder1','folder2','file.txt');
console.log(joinPath);

const normalizePath = path.normalize('/folder1/folder2/../folder3');
console.log(normalizePath);

const resolvedPath = path.resolve('/folder1', '/folder2', 'file.txt');
console.log(resolvedPath);

const baseName = path.basename('/folder1/folder2/file.txt');
console.log(baseName);

const dirName = path.dirname('/filder1/folder2/file.txt');
console.log(dirName);

const extName = path.extname('/folder1/folder2/file.txt');
console.log(extName);

const pathParse = path.parse('/folder1/folder2/file.txt');
console.log(pathParse);