const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { applyCoupon } = require("../controllers/couponController");

router.post("/apply-coupon", protect, applyCoupon);

module.exports = router;
