import express from "express";
import * as staticController from "../controller/static_controller";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/images/:name", auth, staticController.images);

export default router;
