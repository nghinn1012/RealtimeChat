import express from "express";
import {
  addMessageController,
  getMessagesController,
} from "../controllers/messageController.js";
const router = express.Router();

router.post("/addmsg", addMessageController);
router.post("/getmsg", getMessagesController);
export default router;
