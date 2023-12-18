const crypt = require('crypto');

const start = Date.now();

crypt.pbkdf2Sync('darshan@123','salt',100000,512,'sha512');
crypt.pbkdf2Sync('darshan@123','salt',100000,512,'sha512');
crypt.pbkdf2Sync('darshan@123','salt',100000,512,'sha512');

const end = Date.now();

console.log(end - start);