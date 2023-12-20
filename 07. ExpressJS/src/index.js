const express = require('express');
const morgan = require('morgan');
const productsRouter = require('./routes/product.router');
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'))


app.use('/products',productsRouter);

app.listen(port, () => {
    console.log("Server is runnint at http://localhost:3000/");
})