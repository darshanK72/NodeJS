const crypt = require('crypto');


process.env.UV_THREADPOOL_SIZE = 6;

const start = Date.now();

const MAX_COUNT = 6;

for(let i = 1; i <= MAX_COUNT; i++){
    crypt.pbkdf2('darshan@123','salt',100000,512,'sha512',() => {
        console.log(`Hash ${i} : ${Date.now() - start}`);
    });
}
