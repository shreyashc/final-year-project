import Router from "express";
import { multer } from "../multer";
import * as StartupController from "../controllers/startupController";

const router = Router();

router.get("/dashboard", StartupController.dashboad_get);
router.put("/update-details", StartupController.details_update);
router.post(
  "/update-logo",
  multer.single("image"),
  StartupController.logo_update
);

export default router;
