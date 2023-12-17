let fs = require('fs');

console.log("Reading file")

fs.readFile('./Files/input.txt','utf-8',(error,data)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(data);
        console.log("Reading complete")
    }
});
console.log("Reading file is yet to complete");

console.log("Writing file")

let content = "This is content that I want to write in file";
fs.writeFile('./Files/output.txt',content,(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Writing completed")
    }
});

console.log('Writing to file is yet to complete');


console.log("Appending file")

content = "\nThis is appended content content that I want to write in file";
fs.appendFile('./Files/output.txt',content,(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Appending completed")
    }
});

console.log('Appending to file is yet to complete');

