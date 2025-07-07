require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); // db klasöründeki index.js'i import ettik

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ana route
app.get("/", (req, res) => {
  res.send("Plant Store API is running...");
});

// Test DB bağlantısı ve sorgu
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()"); // PostgreSQL’den anlık zamanı aldık
    res.json({ now: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection error");
  }
});

// Örnek ürün listeleme endpointi
app.get("/products", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products"); // products tablon varsayılıyor
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving products");
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
