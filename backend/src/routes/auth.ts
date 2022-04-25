import Router from "express";

import * as AuthController from "../controllers/authController";

const router = Router();

router.post("/signup", AuthController.signup_post);

// router.get("/login", AuthController.login);
router.post("/login", AuthController.login_post);

router.get("/logout", AuthController.logout);

export default router;
