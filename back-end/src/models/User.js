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
  unique: true
},
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["citizen", "admin"],
      default: "citizen",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
