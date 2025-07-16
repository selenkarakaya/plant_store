const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  getProductsByCategory,
  getPopularProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/popular", getPopularProducts);
router.get("/:id", getProductById);
router.get("/category/:categoryId", getProductsByCategory);

module.exports = router;
