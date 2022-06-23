import Router from "express";
import { requireAuthApi } from "../middleware/authMiddleware";

import * as SeekerController from "../controllers/seekerController";
import { multer } from "../multer";

const router = Router();

router.get("/details/:id", SeekerController.details_investors_get);

router.get("/dashboard", requireAuthApi, SeekerController.dashboad_get);

router.put("/update-details", requireAuthApi, SeekerController.details_update);
router.get("/jobs", SeekerController.jobs_get);

router.post(
  "/update-logo",
  requireAuthApi,
  multer.single("image"),
  SeekerController.logo_update
);

router.post(
  "/update-resume",
  requireAuthApi,
  multer.single("pitch-pdf"),
  SeekerController.resume_update
);
export default router;

