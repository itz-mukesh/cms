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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['citizen', 'admin'],
      default: 'citizen',
    },

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   fullname: String,
//   email: { type: String, unique: true },
//   phone: String,
//   password: String,
//   role: { type: String, enum: ["admin", "citizen"], default: "citizen" },
// });
// const User = mongoose.model("User", userSchema);
// export default User;
