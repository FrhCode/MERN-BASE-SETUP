import express from "express";
import * as authController from "../controller/auth_controller";
import validate from "../middleware/validate";
import loginSchema from "../zod/login_schema";
import registerSchema from "../zod/register_schema";

const router = express.Router();

router.get("/verify", authController.verify);

router.post("/login", validate(loginSchema), authController.login);

router.post("/logout", authController.logOut);

router.post("/register", validate(registerSchema), authController.register);

export default router;
