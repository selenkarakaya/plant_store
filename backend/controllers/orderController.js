const asyncHandler = require("express-async-handler");
const db = require("../db");

const checkoutOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {
    shipping_address,
    shipping_method = "standard",
    payment_method = "mock_card",
  } = req.body;

  // Get active cart
  const cartRes = await db.query(
    `SELECT * FROM carts WHERE user_id = $1 AND status = 'active'`,
    [userId]
  );
  const cart = cartRes.rows[0];

  if (!cart) {
    res.status(400);
    throw new Error("No active cart found");
  }

  // Get cart contents
  const itemsRes = await db.query(
    `SELECT * FROM cart_items WHERE cart_id = $1`,
    [cart.id]
  );
  const cartItems = itemsRes.rows;

  if (cartItems.length === 0) {
    res.status(400);
    throw new Error("Your cart is empty");
  }

  // Mock payment → successful
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.total_price),
    0
  );
  const shippingFee = shipping_method === "express" ? 50 : 20;
  const discount = cart.discount_amount || 0;
  const totalAmount = subtotal + shippingFee - discount;

  // Create the order
  const orderRes = await db.query(
    `INSERT INTO orders 
       (user_id, status, shipping_method, shipping_fee, coupon_code, discount_amount, total_amount, shipping_address, payment_method, created_at, updated_at)
       VALUES ($1, 'paid', $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING *`,
    [
      userId,
      shipping_method,
      shippingFee,
      cart.coupon_code,
      discount,
      totalAmount,
      shipping_address,
      payment_method,
    ]
  );
  const order = orderRes.rows[0];

  // Save order items
  for (const item of cartItems) {
    await db.query(
      `INSERT INTO order_items 
        (order_id, product_variant_id, quantity, unit_price, total_price)
        VALUES ($1, $2, $3, $4, $5)`,
      [
        order.id,
        item.product_variant_id,
        item.quantity,
        item.unit_price,
        item.total_price,
      ]
    );
  }

  // Close the cart
  await db.query(
    `UPDATE carts SET status = 'completed', updated_at = NOW() WHERE id = $1`,
    [cart.id]
  );

  res.status(201).json({
    message: "Payment successful, order placed",
    order_id: order.id,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const ordersRes = await db.query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  res.json(ordersRes.rows);
});

const getOrderDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  // Get the order and check if it belongs to this user
  const orderRes = await db.query(`SELECT * FROM orders WHERE id = $1`, [
    orderId,
  ]);
  const order = orderRes.rows[0];

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.user_id !== userId) {
    res.status(403);
    throw new Error("You are not authorized to view this order");
  }

  // order\_items + product details
  const itemsRes = await db.query(
    `
      SELECT 
        oi.id AS order_item_id,
        oi.quantity,
        oi.unit_price,
        oi.total_price,
        pv.id AS variant_id,
        pv.variant_name,
        p.name AS product_name,
        p.image_url
      FROM order_items oi
      JOIN product_variants pv ON oi.product_variant_id = pv.id
      JOIN products p ON pv.product_id = p.id
      WHERE oi.order_id = $1
      `,
    [orderId]
  );

  res.json({
    order,
    items: itemsRes.rows,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const ordersRes = await db.query(`
    SELECT o.*, u.name AS user_name, u.email AS user_email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `);

  res.json(ordersRes.rows);
});

module.exports = { checkoutOrder, getMyOrders, getOrderDetails, getAllOrders };

/*
✅ Results:

- Order is created from the active cart after verifying the cart and its items.
- Products in the order are saved as order_items with detailed variant and pricing info.
- The cart status is updated to 'completed' (closed).
- The user receives the newly created order_id upon successful checkout.
- Users can retrieve their order history sorted by most recent orders.
- Users can get detailed order information including related order_items and product details.
- Access control ensures users can only view their own orders.

---

Next steps:

- Admin order management (e.g., update order status: shipped, delivered, etc.)
- Frontend implementation for detailed order pages combining order and item data.
- Implement real payment integration instead of mock payment.
*/
