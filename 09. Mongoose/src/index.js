import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectionDB from './Database/connection.js';
import userRouter from './Routes/user.route.js';

dotenv.config({path:'./config.env'});

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

connectionDB(process.env.CONNECTION_STRING);

app.use("/api/v1/user",userRouter);

app.listen(port,() => {
    console.log(`Server is runnint on http://localhost:${port}/`);
})