import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["citizen", "admin"],
      default: "citizen",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
