import Router from "express";

import * as StartupController from "../controllers/startupController";

const router = Router();

router.get("/dashboard", StartupController.dashboad_get);

export default router;
