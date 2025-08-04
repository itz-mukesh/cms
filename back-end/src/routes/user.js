import express from "express";
import { registerUser, loginUser } from "../controllers/uesr.js";
import { verifyOTP } from "./verifyotp.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/otpverification", verifyOTP);

export default router;
