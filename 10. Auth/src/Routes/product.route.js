import {Router} from 'express';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../Controllers/product.controller.js';
import { authorize } from '../Middlewares/authorize.middleware.js';

const router = Router();

router.route("/").get(getAllProducts).post(authorize("admin"),addProduct);
router.route("/:id").get(getProduct).put(authorize("admin"),updateProduct).delete(authorize("admin","user"),deleteProduct);


export default router;