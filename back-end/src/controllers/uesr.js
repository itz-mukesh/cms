// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const registerUser = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ msg: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.status(201).json({ msg: "Registered successfully", userId: user._id });
//   } catch (err) {
//     next(err);
//   }
// };

// export const loginUser = async (req, res, next) => {
//   console.log("Login request:", req.body);

//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       success: true,
//       msg: "Login successful",
//       token,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // import User from "../models/User.js";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";

// // export const register = async (req, res) => {
// //   try {
// //     const { fullname, email, phone, password, role } = req.body;
// //     const hash = await bcrypt.hash(password, 10);

// //     const user = await User.create({ fullname, email, phone, password: hash, role });
// //     res.status(201).json({ message: "Registered Successfully", user });
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // };

// // export const login = async (req, res) => {
// //   const { email, password } = req.body;
// //   const user = await User.findOne({ email });

// //   if (!user) return res.status(404).json({ error: "User not found" });

// //   const isMatch = await bcrypt.compare(password, user.password);
// //   if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

// //   const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1d" });
// //   res.json({ token, user: { email: user.email, role: user.role } });
// // };

// 📁 controllers/userController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

dotenv.config();
// ✅ Register User
// export const registerUser = async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // 🔍 Check if user already exists
//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ msg: "User already exists" });

//     // 🔐 Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Create user with role (default to "citizen" if not provided)
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "citizen", // default role
//     });

//     res.status(201).json({
//       msg: "Registered successfully",
//       userId: user._id,
//       role: user.role,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email - OTP",
    html: `<h1>Your OTP is ${otp}</h1>`,
  };

  await transporter.sendMail(mailOptions);
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // 🔍 Check if user already exists
    const exist = await User.findOne({ email });
    if (exist)
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create the user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
      role: role || "citizen",
    });

    // 🔑 Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    await sendOTP(email, otp);
    // res.status(200).json({ message: "OTP sent to your email" });

    res.status(201).json({
      success: true,
      msg: "Registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });

    next(err);
  }
};

// ✅ Login User (with role check)
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // 🔐 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    // ⚠️ Check role
    if (user.role !== role) {
      return res
        .status(403)
        .json({ msg: `Unauthorized role: expected '${user.role}'` });
    }

    // 🔑 Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await sendEmail(
      user.email,
      "Welcome Back!",
      `Hi ${user.name},\n\nYou've successfully logged in to the Traffic Violation App.`
    );

    res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
