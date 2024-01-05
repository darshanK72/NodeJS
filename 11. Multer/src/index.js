import express from 'express';
import mongan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './Database/connection.js';
import { connectCloudinary } from './Database/cloudinary.js';
import { prodErrorHandler } from './Utils/prodErrorHandler.js';
import { devErrorHandler } from './Utils/devErrorHandler.js';
import { NotFoundError } from './Errors/NotFoundError.js';

import fileRouter from './Routes/file.router.js';

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(mongan('dev'));

app.use("/files",fileRouter);

connectDB(process.env.MONGODB_CONNECTION_STRING, process.env.DATABASE);
connectCloudinary(process.env.CLOUD_NAME,process.env.API_KEY,process.env.API_SECRET);

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
})