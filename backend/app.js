require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();

//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true, // credentials (cookie)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(cookieParser());

// Main route
app.get("/", (req, res) => {
  res.send("Plant Store API is running...");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
