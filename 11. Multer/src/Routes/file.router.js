import { Router } from "express";
import { getFile, getFiles, uploadFile } from "../Controllers/file.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = new Router();

router.route("/").get(getFiles).post(upload.single('file'),uploadFile);
router.route("/:fileId").get(getFile);

export default router;