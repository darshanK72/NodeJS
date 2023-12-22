import { Router } from "express";
import { addUser, getUserById, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.route('/users').get(getUsers).post(addUser);
router.route('/users/:id').get(getUserById);

export default router