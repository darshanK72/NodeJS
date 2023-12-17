const commonModule = require('./commonModule');
const data = require('./data.json');


console.log(commonModule.add(52,62));
console.log(commonModule.subtract(63,34));

console.log(data);

console.log(data.user[0].firstName);
