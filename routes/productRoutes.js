const express = require("express");
const {
  addProduct,
  getProductsByDistributorEmail,
  getAllProducts,
  getProductById,
  getDistributorByProductId,
  updateStock,
  updateProduct,
  deleteProduct,
  updateRejectedStock,
  getAllProductsByDistributorEmail,
} = require("../controllers/productController");
const router = express.Router();

// POST endpoint to add a new product
router.post("/add", addProduct);

// GET endpoint to retrieve products by distributor email
router.get("/", getProductsByDistributorEmail);

// GET endpoint to retrieve all products
router.get("/all", getAllProducts);

// GET endpoint to retrieve a product by its ID
router.get("/:productId", getProductById);
router.get("/:productId/distributor", getDistributorByProductId);
//update stock
router.post("/update-stock", updateStock);

// *********************************************************
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.patch("/update-stock/:productId", updateRejectedStock);

router.get("/distributor/:email", getAllProductsByDistributorEmail);

module.exports = router;