import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config({path:'./config.env'});
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/',(req,res) => {
    res.send("Hello World");
})

app.listen(port,() => {
    console.log(`Server is runnint on http://localhost:${port}/`);
})