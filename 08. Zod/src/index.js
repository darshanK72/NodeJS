import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config({path:'./config.env'});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api',userRouter);

app.listen(port, () => {
    console.log(`Server is runnint at http://localhost:${port}/`);
})