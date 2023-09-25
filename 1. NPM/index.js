import {v4 as uuidv4} from 'uuid'

const http = require('http');

const host = '127.0.0.1';
const port = 3000;

let server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World');
});

server.listen(port,host,()=>{
    console.log(`Server is running at http://${host}/${port}`);
    console.log(uuidv4());
    console.log(uuidv4());
})
