const express = require("express");
const { getAllRetailers, getAllDistributors ,getUserByEmail} = require("../controllers/userController");
// const { addProduct } = require("../controllers/productController");
const router = express.Router();

// Get all retailers
router.get("/retailers", getAllRetailers);
router.get("/distributors", getAllDistributors);
// router.post("/add", addProduct);
router.get('/data/:email',getUserByEmail);

module.exports = router;