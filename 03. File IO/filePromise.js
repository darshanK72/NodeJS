const fsp = require('fs/promises');

fsp.readFile('./Files/input.txt', 'utf-8')
    .then((data) => {
        console.log(data);
        console.log("File read");
        return data;
    })
    .then((data) => {
       return fsp.writeFile('./Files/output.txt',data);
    })
    .then(() => {
        console.log("Written to file");
    })
    .catch((error) => {
        console.log(error)
    })
