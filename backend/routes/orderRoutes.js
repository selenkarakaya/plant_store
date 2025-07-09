const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getOrderDetails,
  checkoutOrder,
} = require("../controllers/orderController");

router.post("/checkout", protect, checkoutOrder); //Create order
router.get("/my", protect, getMyOrders); //User's order history
router.get("/:orderId", protect, getOrderDetails); //Details of the products in the order

module.exports = router;
