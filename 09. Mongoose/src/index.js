import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectionDB from './Database/connection.js';
import userRouter from './Routes/user.route.js';
import { devErrors } from './Utils/devlopmentError.js';
import { prodErrors } from './Utils/productionError.js';
import { NotFoundError } from './Errors/NotFoundError.js';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
const app = express();

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Rejection Occured ! Shutting down..");
    process.exit(1);
})

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled Exception Occured ! Shutting down..");
    process.exit(1);
})

app.use(express.json());
app.use(morgan('dev'));

connectionDB(process.env.CONNECTION_STRING);

app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
    throw new NotFoundError(`Cannot find ${req.originalUrl} on the server`);
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    if (process.env.NODE_ENV == 'devlopment') {
        devErrors(err, res);
    } else if (process.env.NODE_ENV == 'production') {
        prodErrors(err, res);
    }
})

const server = app.listen(port, () => {
    console.log(`Server is runnint on http://localhost:${port}/`);
})
