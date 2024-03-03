import express from "express";
import {
  getAllUserController,
  loginController,
  logoutController,
  registerController,
  setAvatarController,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/setavatar/:id", setAvatarController);
router.get("/getAllUser/:id", getAllUserController);
router.get("/logout/:id", logoutController);
export default router;
