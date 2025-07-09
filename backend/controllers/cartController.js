const asyncHandler = require("express-async-handler");
const db = require("../db");

const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { product_variant_id, quantity } = req.body;

  if (!product_variant_id || !quantity || quantity < 1) {
    res.status(400);
    throw new Error("Product variant ID and quantity are required");
  }

  // Check if there is an active cart
  let cartRes = await db.query(
    "SELECT * FROM carts WHERE user_id = $1 AND status = $2",
    [userId, "active"]
  );
  let cart = cartRes.rows[0];

  // If not, create a new cart
  if (!cart) {
    const insertCart = await db.query(
      `INSERT INTO carts (user_id, status, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())
       RETURNING *`,
      [userId, "active"]
    );
    cart = insertCart.rows[0];
  }

  // Check if the same product variant exists in the cart
  let itemRes = await db.query(
    `SELECT * FROM cart_items WHERE cart_id = $1 AND product_variant_id = $2`,
    [cart.id, product_variant_id]
  );
  let cartItem = itemRes.rows[0];

  // Get the product variant price
  const variantPriceRes = await db.query(
    "SELECT price FROM product_variants WHERE id = $1",
    [product_variant_id]
  );
  if (variantPriceRes.rows.length === 0) {
    res.status(404);
    throw new Error("Product variant not found");
  }
  const unit_price = variantPriceRes.rows[0].price;

  if (cartItem) {
    // If the product exists, increase the quantity
    const newQuantity = cartItem.quantity + Number(quantity);
    const newTotalPrice = newQuantity * unit_price;

    const updateItem = await db.query(
      `UPDATE cart_items
       SET quantity = $1, total_price = $2, added_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [newQuantity, newTotalPrice, cartItem.id]
    );

    res.json(updateItem.rows[0]);
  } else {
    // If the product doesn't exist, add a new row
    const total_price = unit_price * quantity;
    const insertItem = await db.query(
      `INSERT INTO cart_items (cart_id, product_variant_id, quantity, unit_price, total_price, added_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [cart.id, product_variant_id, quantity, unit_price, total_price]
    );

    res.status(201).json(insertItem.rows[0]);
  }
});

const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Fetch the active cart and its contents
  const cartRes = await db.query(
    `SELECT * FROM carts WHERE user_id = $1 AND status = 'active'`,
    [userId]
  );
  const cart = cartRes.rows[0];
  if (!cart) {
    return res.json({ message: "No active cart", cart_items: [] });
  }

  const itemsRes = await db.query(
    `SELECT ci.id, ci.quantity, ci.unit_price, ci.total_price, pv.variant_name, pv.product_id
     FROM cart_items ci
     JOIN product_variants pv ON ci.product_variant_id = pv.id
     WHERE ci.cart_id = $1`,
    [cart.id]
  );

  res.json({
    cart,
    cart_items: itemsRes.rows,
  });
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { cartItemId } = req.params;

  // First, check if the cart\_item exists and if it belongs to the user's active cart
  const cartItemRes = await db.query(
    `SELECT ci.*, c.user_id 
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       WHERE ci.id = $1`,
    [cartItemId]
  );
  const cartItem = cartItemRes.rows[0];

  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  if (cartItem.user_id !== userId) {
    res.status(403);
    throw new Error("Not authorized to remove this item");
  }

  // Delete
  await db.query("DELETE FROM cart_items WHERE id = $1", [cartItemId]);

  res.json({ message: "Item removed from cart" });
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== "number" || quantity < 0) {
    res.status(400);
    throw new Error("Quantity must be a non-negative number");
  }

  // cart\_item and cart check
  const cartItemRes = await db.query(
    `SELECT ci.*, c.user_id
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       WHERE ci.id = $1`,
    [cartItemId]
  );
  const cartItem = cartItemRes.rows[0];

  if (!cartItem) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  if (cartItem.user_id !== userId) {
    res.status(403);
    throw new Error("Not authorized");
  }

  // Check variant stock availability
  const variantRes = await db.query(
    `SELECT stock, price FROM product_variants WHERE id = $1`,
    [cartItem.product_variant_id]
  );
  const variant = variantRes.rows[0];
  if (!variant) {
    res.status(404);
    throw new Error("Product variant not found");
  }

  if (quantity > variant.stock) {
    res.status(400);
    throw new Error(`Only ${variant.stock} items in stock`);
  }

  if (quantity === 0) {
    // If quantity is 0, delete the item
    await db.query(`DELETE FROM cart_items WHERE id = $1`, [cartItemId]);
    return res.json({ message: "Item removed from cart" });
  }

  // Update
  const total_price = variant.price * quantity;

  const updateRes = await db.query(
    `UPDATE cart_items
       SET quantity = $1, total_price = $2, added_at = NOW()
       WHERE id = $3
       RETURNING *`,
    [quantity, total_price, cartItemId]
  );

  res.json(updateRes.rows[0]);
});

module.exports = {
  addItemToCart,
  getCart,
  removeItemFromCart,
  updateCartItemQuantity,
};

/*
The active cart is created or fetched if it doesn't exist.

If the same product variant exists, the quantity is increased.

If a new product is added, a new row is created.

Cart data is retrieved from the /api/cart endpoint.
*/
