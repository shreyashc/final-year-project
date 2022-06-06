import Router from "express";

import * as StartupController from "../controllers/startupController";

const router = Router();

router.get("/", StartupController.startups_get);

export default router;
