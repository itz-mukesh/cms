import { Router } from "express";
const router = Router();

import { upload } from "../middlewares/complent.js";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
} from "../controllers/complaints.js";
// import authMiddleware from "../middlewares/auth.js";

router.post("/create", upload.single("file"), createComplaint);
router.get("/get-all", getAllComplaints);
router.get("/get/:id", getComplaintById);

export default router;
