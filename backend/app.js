require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("./config/passport-setup");

const app = express();

//app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "https://plant-store-frontend.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(cookieParser());
app.use(passport.initialize());

// Main route
app.get("/", (req, res) => {
  res.send("Plant Store API is running...");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/auth", require("./routes/oauthRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/coupon", require("./routes/couponRoutes"));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
