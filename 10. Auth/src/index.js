import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './Database/connection.js';
import productRouter from './Routes/product.route.js';
import userRouter from './Routes/user.route.js';
import { devErrorHandler } from './Utils/devErrorHandler.js';
import { prodErrorHandler } from './Utils/prodErrorHandler.js';
import { authenticate } from './Middlewares/authenticate.middleware.js';
import { NotFoundError } from './Errors/NotFoundError.js';

dotenv.config({path:"./config.env"});

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

connectDB(process.env.MONGODB_CONNECTION_STRING,process.env.DATABASE);

app.use("/product",authenticate,productRouter);
app.use("/user",userRouter);

app.all("*", (req, res, next) => {
    throw new NotFoundError(`Cannot find ${req.originalUrl} on the server`);
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    console.log("error happened" + err);
    err.status = err.status || 'Error';
    if (process.env.NODE_ENV == 'devlopment') {
        devErrorHandler(err, res);
    } else if (process.env.NODE_ENV == 'production') {
        prodErrorHandler(err, res);
    }
})


app.listen(port,() => {
    console.log(`Server is runnint on http://localhost:${port}/`);
})
