let readLine = require('readline');
let rl = readLine.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question("Enter Your Name : ",(answer)=>{
    console.log("Welcome to Node Js Mr." + answer);
    rl.close();
});

rl.on('close',()=>{
    console.log("Interface Closed");
    process.exit(0);
});