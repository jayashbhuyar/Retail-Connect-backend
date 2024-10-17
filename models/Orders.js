const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    distributorId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: false,
      ref: "User",
    },
    distributorName: {
      type: String,
      // required: true,
    },
    distributorEmail: {
      type: String,
      // required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    userName: {
      type: String,
      // required: true,
    },
    userEmail: {
      type: String,
      // required: true,
    },
    userPhone: {
      type: String,
      // required: true,
    },
    shopName: {
      type: String,
      // required: true,
    },
    quantity: {
      type: Number,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    msg: {
      type: String,
    },
    deliveryBefore: {
      type: Date,
    },
    orderCancelReason: {
      type: String, // Ensure the type matches what you're passing
      default: null,
    },
    retailerAddress: {
      type: String,
    },
    img: {
      type: String,
    },
    productName: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Product",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
