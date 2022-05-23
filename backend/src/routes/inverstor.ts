import Router from "express";

import * as InvestorController from "../controllers/inverstorController";

const router = Router();

router.get("/", InvestorController.all_investors_get);

export default router;
