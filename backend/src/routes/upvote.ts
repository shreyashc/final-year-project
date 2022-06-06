import Router from "express";
import { requireAuthApi } from "../middleware/authMiddleware";
import * as UpvoteController from "../controllers/upvoteController";

const router = Router();

router.post("/:startupid", requireAuthApi, UpvoteController.upvote);
router.get("/my-upvotes", requireAuthApi, UpvoteController.get_my_upvotes);

export default router;
