const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  getMyOrders,
  getOrderDetails,
  checkoutOrder,
  getAllOrders,
} = require("../controllers/orderController");

router.post("/checkout", protect, checkoutOrder); //Create order
router.get("/my", protect, getMyOrders); //User's order history
router.get("/:orderId", protect, getOrderDetails); //Details of the products in the order
router.get("/", protect, isAdmin, getAllOrders); // admin route

module.exports = router;
