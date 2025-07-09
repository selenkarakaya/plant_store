const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  addItemToCart,
  getCart,
  removeItemFromCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");

router.get("/", protect, getCart); // Get the user's active cart
router.post("/add", protect, addItemToCart); // Add product to cart
router.delete("/remove/:cartItemId", protect, removeItemFromCart); // Remove product from cart
router.patch("/update/:cartItemId", protect, updateCartItemQuantity); // Update product quantity in cart

module.exports = router;
