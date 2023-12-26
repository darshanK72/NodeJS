import {Router} from 'express';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../Controllers/product.controller.js';
import { authenticate } from '../Middlewares/authenticate.middleware.js';

const router = Router();

router.route("/").get(getAllProducts).post(addProduct);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);


export default router;