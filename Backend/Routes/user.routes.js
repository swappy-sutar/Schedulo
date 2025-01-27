import express from "express";
import { changePassword, createUser, loginUser } from "../Controllers/user.controller.js";
import {isAdmin,isHr,auth} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/change-password",auth, changePassword);



export default router;