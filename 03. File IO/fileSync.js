let fs = require('fs')

console.log("Reading file");
try {
    let readContent = fs.readFileSync('./Files/input.txt', 'utf-8');
    console.log(readContent);
    console.log("Reading completed");
} catch (error) {
    console.log(error);
}

console.log("Writing file");
try{
    let writeContent = "This is content I want to write synchroneously";
    fs.writeFileSync('./Files/output.txt',writeContent);
    console.log("Writing completed")
}catch(error){
    console.log(error);
}

console.log("Appending file");
try{
    let appendContent = "This is appnded content";
    fs.appendFileSync('./Files/output.txt',appendContent);
    console.log("Appending completed");
}catch(error){
    console.log(error);
}