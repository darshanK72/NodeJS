import { Router } from "express";
import { addUser, getUsers,getUserById, updateUser , deleteUser} from "../Controllers/user.controller.js";

const router = Router();

router.route("/").get(getUsers).post(addUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;