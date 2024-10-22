const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // Add this
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const networkRoutes = require("./routes/networkRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const newsRoutes = require("./routes/newsRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const otpRoutes = require("./routes/otpRoutes");
const {verifyToken, validate} = require("./middleware/verify")

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const corsOptions = {
  origin: 'https://retail-connect-webapp.vercel.app/',

 // Allow requests only from this origin
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Add cookie parser

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post("/api/validate", validate)
app.use("/api/auth", authRoutes);
app.use("/api/users",  verifyToken,userRoutes);
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/network", verifyToken, networkRoutes);
app.use("/api/orders", verifyToken, orderRoutes);
app.use("/admin", verifyToken, adminRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/invoices", verifyToken, invoiceRoutes);
app.use("/api/news", verifyToken, newsRoutes);
app.use("/api", verifyToken, feedbackRoutes);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
