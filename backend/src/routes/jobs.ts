import Router from "express";
import { requireAuthApi } from "../middleware/authMiddleware";

import * as jobController from "../controllers/jobController";

const router = Router();

router.post("/", requireAuthApi, jobController.addJob);
router.get("/:sid", jobController.getJobsId);
router.get("/", requireAuthApi, jobController.getJobs);
export default router;

