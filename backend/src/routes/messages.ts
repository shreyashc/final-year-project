import Router from "express";
import { requireAuthApi } from "../middleware/authMiddleware";

import * as ChatController from "../controllers/chatController";

const router = Router();

router.post("/", ChatController.addNewPchat);
router.get("/mychats", requireAuthApi, ChatController.getMychats);
router.post("/mark-as-read", requireAuthApi, ChatController.markAsRead);

export default router;

