const asyncHandler = require("express-async-handler");
const db = require("../db");

// GET /api/categories
const getCategories = asyncHandler(async (req, res) => {
  const { rows } = await db.query(
    "SELECT id, name, parent_id, description FROM categories ORDER BY id"
  );
  res.json(rows);
});

module.exports = { getCategories };
