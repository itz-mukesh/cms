import multer from "multer";
import { storage } from "../utils/cloudneary.js";

export const upload = multer({ storage });
