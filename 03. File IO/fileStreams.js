const fs = require('fs');

const big = fs.createReadStream('./Files/big.txt','utf-8');
const bigOutput = fs.createWriteStream('./Files/bigOutput.txt','utf-8');

big.on('data',(chunk) => {
    console.log(chunk);
    bigOutput.write(chunk);
});

big.on('end',() => {
    bigOutput.close();
    console.log("Printing Completed");
});

bigOutput.on('finish',() => {
    console.log('Writing Finished');
})
bigOutput.on('close',() => {
    console.log("File Closed");
});

big.on('error',(error) => {
    console.log(error);
});

bigOutput.on('error',(error) => {
    console.log(error);
})

