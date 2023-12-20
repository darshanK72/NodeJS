const express = require('express');
const { getAllProducts,
    addProduct,
    getProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
    checkProduct,
    validateBody
} = require('../controllers/product.controller')

const productsRouter = express.Router();

productsRouter.param('id',checkProduct);
productsRouter.route('/').get(getAllProducts).post(validateBody,addProduct);
productsRouter.route('/:id').get(getProduct).put(updateProduct).patch(patchProduct).delete(deleteProduct);

module.exports = productsRouter;