import {Router} from 'express';
import { signIn, signUp, forgotPassword, resetPassword} from '../Controllers/auth.controller.js';

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/forget/password").post(forgotPassword);
router.route("/reset/password/:token").patch(resetPassword);


export default router;