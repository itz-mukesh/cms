import express from "express";
const router = express.Router();

import createComplaint from "../controllers/complaints.js";
import { upload } from "../middlewares/complent.js";
import {
  getAllComplaints,
  getComplaintById,
} from "../controllers/complaints.js";
import { verifyToken } from "../middlewares/auth.js";
// import { verifyToken } from "../middlewares/auth.js";

router.post(
  "/submit-complaint",
  verifyToken,

  upload.single("file"),
  createComplaint
);
router.get("/complaints", verifyToken, getAllComplaints);
router.get("/complaints/:id", verifyToken, getComplaintById);

export default router;
