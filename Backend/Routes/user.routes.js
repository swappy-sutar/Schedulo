import express from "express";
import { createUser, loginUser } from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);


export default router;