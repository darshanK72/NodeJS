const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('./Files/normalFile.txt')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('./Files/normalZip.txt.gz'))
   .on('finish', () => console.log('Finished Ziping File'))
   .on('error', () => console.log(error));


