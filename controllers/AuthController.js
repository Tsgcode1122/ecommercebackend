// controllers/AuthController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Register a new user
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller function to check if email exists
exports.checkEmailExists = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    const exists = !!user;

    res.status(200).json({ exists });
  } catch (error) {
    console.error("Error checking email existence:", error);
    res.status(500).json({ error: "Failed to check email existence" });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return user data along with the token
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Forgot password
// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "reset sent to email" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.newPasswords = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log("email gotten:", email);
  console.log("newpassword inputed:", newPassword);

  // console.log(email);
  // console.log(newPassword);3
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    console.log("password successfully changed");
    // Send a response
    res.status(200).json({ message: "password change successffully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reset password

// good, i want you  to create a nice reset password from antd, i want when a input that say input your email, after that, it use the usercontext to check if the mail exist, if it exist in the data base, it should
