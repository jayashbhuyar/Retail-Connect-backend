// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // JWT for token generation
require("dotenv").config(); // Ensure environment variables are used

// User registration
exports.registerUser = async (req, res) => {
  const { name, email, phone, password, role, companyName, shopName, image,address } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password: ", hashedPassword); // Debug log to check the hashed password

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword, // Save hashed password
      role,
      companyName: role === "distributor" ? companyName : undefined,
      shopName: role === "retailer" ? shopName : undefined,
      image,
      address,
    });

    // Save new user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password,role } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email,role });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(password)
    // console.log(user.password)
    // console.log("Password Match: ", isMatch); // Debug log to check password comparison result

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ); // Use environment variable for secret

    // Send response with user data and token
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, role: user.role ,name:user.name,email:user.email,phone:user.phone,companyName:user.companyName,shopName:user.shopName,image:user.image,address:user.address},
      token, // Include the token in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
