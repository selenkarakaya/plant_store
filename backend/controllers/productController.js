const asyncHandler = require("express-async-handler");
const db = require("../db");

const getProducts = asyncHandler(async (req, res) => {
  const query = `
    SELECT p.id, p.name, p.family, p.description, p.image_url,
           MIN(v.price) AS min_price
    FROM products p
    LEFT JOIN product_variants v ON p.id = v.product_id
    GROUP BY p.id, p.name, p.family, p.description, p.image_url
    ORDER BY RANDOM()
    LIMIT 3;
  `;
  //LIMIT 10
  const { rows } = await db.query(query);
  res.json(rows);
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // Product main information
  const productRes = await db.query(
    "SELECT id, name, family, description, image_url FROM products WHERE id = $1",
    [productId]
  );
  const product = productRes.rows[0];
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Product details
  const detailsRes = await db.query(
    "SELECT * FROM plant_details WHERE product_id = $1",
    [productId]
  );
  const details = detailsRes.rows[0] || null;

  // Variants
  const variantsRes = await db.query(
    "SELECT * FROM product_variants WHERE product_id = $1 ORDER BY price",
    [productId]
  );
  const variants = variantsRes.rows;

  const categoriesRes = await db.query(
    "SELECT * FROM product_categories Where product_id =$1",
    [productId]
  );
  const categories = categoriesRes.rows;
  res.json({
    ...product,
    plant_details: details,
    product_variants: variants,
    product_categories: categories,
  });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const categoryId = parseInt(req.params.categoryId); // ID olarak al

  let query;
  let queryParams = [];

  if (categoryId === 9) {
    // Under £30
    query = `
      SELECT 
        p.id, p.name, p.family, p.description, p.image_url,
        MIN(v.price) AS min_price
      FROM products p
      LEFT JOIN product_variants v ON v.product_id = p.id
      GROUP BY p.id, p.name, p.family, p.description, p.image_url
      HAVING MIN(v.price) <= 30
    `;
  } else if (categoryId === 10) {
    // Under £50
    query = `
      SELECT 
        p.id, p.name, p.family, p.description, p.image_url,
        MIN(v.price) AS min_price
      FROM products p
      LEFT JOIN product_variants v ON v.product_id = p.id
      GROUP BY p.id, p.name, p.family, p.description, p.image_url
      HAVING MIN(v.price) <= 50
    `;
  } else {
    query = `
      SELECT 
        p.id, p.name, p.family, p.description, p.image_url,
        MIN(v.price) AS min_price
      FROM products p
      JOIN product_categories pc ON pc.product_id = p.id
      LEFT JOIN product_variants v ON v.product_id = p.id
      WHERE pc.category_id = $1
      GROUP BY p.id, p.name, p.family, p.description, p.image_url
    `;
    queryParams = [categoryId];
  }

  const { rows } = await db.query(query, queryParams);

  if (rows.length === 0) {
    res.status(404);
    throw new Error("No products found for this category");
  }

  res.json(rows);
});

const getPopularProducts = asyncHandler(async (req, res) => {
  const result = await db.query(`
  SELECT 
  p.id,
  p.name,
  p.family,
  p.description,
  p.image_url,
  MIN(v.price) AS min_price,
  pp.total_sold
FROM 
  product_popularity pp
JOIN 
  products p ON p.id = pp.product_id
LEFT JOIN 
  product_variants v ON p.id = v.product_id
GROUP BY 
  p.id, p.name, p.family, p.description, p.image_url, pp.total_sold
ORDER BY 
  pp.total_sold DESC
LIMIT 20;
  `);

  const rows = result.rows;

  if (rows.length === 0) {
    res.status(404);
    throw new Error("No popular products found");
  }

  res.json(rows);
});

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getPopularProducts,
};
