const express = require('express');
const { getAllProducts,
    addProduct,
    getProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} = require('../controllers/product.controller')

const productsRouter = express.Router();

productsRouter.route('/').get(getAllProducts).post(addProduct);
productsRouter.route('/:id').get(getProduct).put(updateProduct).patch(patchProduct).delete(deleteProduct);

module.exports = productsRouter;