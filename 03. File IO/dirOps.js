const fs = require('fs');

console.log("Creating directory");
fs.mkdir('MyDir',(error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("Directory created");
    }
});

console.log("Removing directory");
fs.rmdir('MyDir',(error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("Directory removed");
    }
})

console.log("Reading directory");
fs.readdir('./Files',(error,data) => {
    if(error){
        console.log(error);
    }
    else{
        console.log(data);
        console.log("Directory read");
    }
})