const fs = require('fs');

const big = fs.createReadStream('./Files/big.txt','utf-8');
const bigOutput = fs.createWriteStream('./Files/bigOutput.txt','utf-8');

big.pipe(bigOutput);

big.on('end',() => {
    console.log("File Reading Complete");
});

bigOutput.on('finish',() => {
    console.log("File Writing Completed");
    bigOutput.close();
    big.close();
})

big.on('error',(error) => {
    console.log(error);
});

bigOutput.on('error',(error) => {
    console.log(error);
})