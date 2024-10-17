// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors"); // Optional: for handling CORS
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const networkRoutes = require("./routes/networkRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes=require("./routes/adminRoutes")
const feedbackRoutes=require("./routes/feedbackRoutes")
const newsRoutes = require("./routes/newsRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS
// app.use(cors({ origin: "*" }));
app.use(express.json()); // Parse JSON bodies

mongoose
  .connect(process.env.MONGO_URI, {
    // Use the connection string from .env
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/network", networkRoutes);
app.use("/api/orders", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/news", newsRoutes);
// app.use('/admin/orders',adminRoutes);
// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
