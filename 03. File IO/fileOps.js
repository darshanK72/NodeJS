const fs = require('fs');

fs.stat('./Files/input.txt',(error,stat) => {
    if(error){
        console.log(error);
    }
    else{
        console.log(`Stats : ${stat}`);
    }
});

fs.rename('./Files/temp.txt','./Files/rename.txt',(error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("Rename file completed");
    }
});

fs.copyFile('./Files/source.txt','./Files/destination.txt',(error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("File copied successfuly");
    }
})

fs.unlink('./Files/delete.txt',(error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("File deleted successfuly");
    }
})