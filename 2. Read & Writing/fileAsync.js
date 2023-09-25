let fs = require('fs');

fs.readFile('./Files/input.txt','utf-8',(error,data)=>{
    console.log(data);
});
console.log('Reading File');

fs.writeFile('./Files/output.txt','This is new output asynchro',()=>{
    console.log("written on file");
});

console.log('Writing File');

