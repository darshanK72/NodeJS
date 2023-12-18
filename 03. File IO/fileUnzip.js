const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('./Files/normalZip.txt.gz')
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream('./Files/normalOutput.txt'))
   .on('finish',() => console.log('Finished Unziping File'))
   .on('error',() => console.log(error));

