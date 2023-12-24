const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const productsRouter = require('./routes/product.router');

dotenv.config({path:'./config.env'});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./static'));

app.use('/products',productsRouter);

app.listen(port, () => {
    console.log(`Server is runnint at http://localhost:${port}/`);
})