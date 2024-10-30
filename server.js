const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Load environment variables
dotenv.config();

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
const chatRoutes = require("./routes/chatRoutes");
const landingpageRoutes = require("./routes/landingpageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const { verifyToken, validate } = require("./middleware/verify");

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration
const corsOptions = {
  origin: "https://retail-connect-webapp.vercel.app", // Update this to your frontend URL
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/landingpage", landingpageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/network", verifyToken, networkRoutes);
app.use("/api/orders", verifyToken, orderRoutes);
app.use("/admin", verifyToken, adminRoutes);
app.use("/api", verifyToken, feedbackRoutes);
app.use("/api/invoices", verifyToken, invoiceRoutes);
app.use("/api/news", verifyToken, newsRoutes);
app.use("/api/chat", chatRoutes);
app.post("/api/validate", validate);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
