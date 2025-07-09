const asyncHandler = require("express-async-handler");
const db = require("../db");

const getProducts = asyncHandler(async (req, res) => {
  const { rows } = await db.query("SELECT * FROM products");
  res.json(rows);
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // Ürün ana bilgisi
  const productRes = await db.query(
    "SELECT id, name, family, description, image_url FROM products WHERE id = $1",
    [productId]
  );
  const product = productRes.rows[0];
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Plant detayları
  const detailsRes = await db.query(
    "SELECT * FROM plant_details WHERE product_id = $1",
    [productId]
  );
  const details = detailsRes.rows[0] || null;

  // Variantlar
  const variantsRes = await db.query(
    "SELECT * FROM product_variants WHERE product_id = $1 ORDER BY price",
    [productId]
  );
  const variants = variantsRes.rows;

  res.json({
    ...product,
    plant_details: details,
    product_variants: variants,
  });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;

  // categoryId ile product_categories tablosundan ürünleri alıyoruz
  const query = `
    SELECT p.id, p.name, p.family, p.description, p.image_url
    FROM products p
    JOIN product_categories pc ON pc.product_id = p.id
    WHERE pc.category_id = $1
  `;

  const { rows } = await db.query(query, [categoryId]);

  if (rows.length === 0) {
    res.status(404);
    throw new Error("No products found for this category");
  }

  res.json(rows);
});

module.exports = { getProducts, getProductById, getProductsByCategory };
