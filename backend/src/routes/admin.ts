import Router from "express";
import { requireAuthApi } from "../middleware/authMiddleware";

import * as adminController from "../controllers/adminController";

const router = Router();

router.post(
  "/approve-startup/",
  requireAuthApi,
  adminController.approveStartup
);

router.post(
  "/revoke-approve-startup/",
  requireAuthApi,
  adminController.revokeStartupApproval
);

router.post(
  "/approve-investor/",
  requireAuthApi,
  adminController.approveInvestor
);

router.post(
  "/revoke-approve-inestor/",
  requireAuthApi,
  adminController.revokeInvestorApproval
);

export default router;

