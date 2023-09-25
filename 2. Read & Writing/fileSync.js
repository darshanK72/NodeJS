let fs = require('fs')

let inputContent = fs.readFileSync('./Files/input.txt', 'utf-8');
console.log(inputContent);

let outputContent = `This is output, Input File Content : ${inputContent}`;

fs.writeFileSync('./Files/output.txt', outputContent);
