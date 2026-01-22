import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SW_User from "../models/sw.user.model.js";

/* ---------- REGISTER USER ---------- */
export const registerUser = async (req, res) => {
  try {
    const { fullName, emailAddress, password } = req.body;

    if (!fullName || !emailAddress || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await SW_User.findOne({ emailAddress });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await SW_User.create({
      fullName,
      emailAddress,
      hashedPassword
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error });
  }
};

/* ---------- LOGIN USER ---------- */
export const loginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await SW_User.findOne({ emailAddress });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};
