const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  logoutUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/profile/password", protect, changeUserPassword);
router.post("/logout", logoutUser);

module.exports = router;
