import { User } from "../models/userModel.js";
import {
  getAllUserService,
  loginService,
  registerService,
  setAvatarService,
} from "../services/userServices.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log(username, email, password, confirmPassword);
    if (username && email && password && confirmPassword) {
      let respone = await registerService({
        username,
        email,
        password,
        confirmPassword,
      });
      return res.json(respone);
    }
    return res.json({
      status: "err",
      message:
        "The username or email or password or confirmPassword is required",
    });
  } catch (error) {
    return res.json({
      status: "err",
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (email && password) {
      let respone = await loginService({
        email,
        password,
      });
      return res.json(respone);
    }
    return res.json({
      status: "err",
      message: "The email and password is required",
    });
  } catch (error) {
    return res.json({
      status: "err",
      message: error.message,
    });
  }
};

export const setAvatarController = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const avatarImage = req.body.image;
    const response = await setAvatarService({ userId, avatarImage });
    return res.json(response);
  } catch (error) {
    res.json({
      status: "err",
      message: error.message,
    });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const respone = await getAllUserService(req);
    res.json(respone);
  } catch (error) {
    console.log(error);
    res.json({
      status: "err",
      message: error,
    });
  }
};

export const logoutController = (req, res) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (error) {
    res.json({
      status: "OK",
      message: error,
    });
  }
};
