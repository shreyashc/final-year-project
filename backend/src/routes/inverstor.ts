import Router from "express";
import { requireAuthApi } from "../middleware/authMiddleware";

import * as InvestorController from "../controllers/inverstorController";
import { multer } from "../multer";

const router = Router();

router.get("/", InvestorController.all_investors_get);

router.get("/dashboard", requireAuthApi, InvestorController.dashboad_get);

router.put(
  "/update-details",
  requireAuthApi,
  InvestorController.details_update
);

router.post(
  "/update-logo",
  requireAuthApi,
  multer.single("image"),
  InvestorController.logo_update
);

export default router;
