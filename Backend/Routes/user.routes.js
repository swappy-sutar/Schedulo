import express from "express";
import { changePassword, createUser, loginUser } from "../Controllers/user.controller.js";
import {isAdmin,isHr,auth} from "../Middlewares/auth.middleware.js"
import { resetPassword, resetPasswordToken } from "../Controllers/resetPassword.Controller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/change-password",auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);


export default router;