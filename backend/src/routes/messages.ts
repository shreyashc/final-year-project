import Router from "express";

import * as ChatController from "../controllers/chatController";

const router = Router();

router.post("/", ChatController.addNewPchat);

export default router;

