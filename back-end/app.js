import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.js";
import complaintRoutes from "./src/routes/complaints.js";

import errorHandler from "./src/middlewares/user.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// DB connection
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/complaint", complaintRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Backend is Working!");
});

// Error middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
