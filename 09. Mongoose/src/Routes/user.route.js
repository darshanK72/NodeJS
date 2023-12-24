import { Router } from "express";
import { addUser, getUsers,getUserById } from "../Controllers/user.controller.js";

const router = Router();

router.route("/").get(getUsers).post(addUser);
router.route("/:id").get(getUserById);

export default router;