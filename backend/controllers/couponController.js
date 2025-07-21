const asyncHandler = require("express-async-handler");
const db = require("../db");

const applyCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;

  // Kuponu getir
  const couponResult = await db.query(
    "SELECT * FROM coupons WHERE code = $1 AND is_active = true",
    [code]
  );
  const coupon = couponResult.rows[0];

  if (!coupon) {
    res.status(400);
    throw new Error("Invalid or expired coupon.");
  }

  // Kullanıcının daha önce kullandığı kupon var mı?
  const usedResult = await db.query(
    "SELECT * FROM user_coupons WHERE user_id = $1 AND coupon_id = $2",
    [userId, coupon.id]
  );
  const used = usedResult.rows[0];

  if (used) {
    res.status(400);
    throw new Error("Coupon already used.");
  }

  // Aktif sepeti al
  const cartResult = await db.query(
    "SELECT * FROM carts WHERE user_id = $1 AND status = 'active'",
    [userId]
  );
  const cart = cartResult.rows[0];

  if (!cart) {
    res.status(400);
    throw new Error("Active cart not found.");
  }

  // İndirimi hesapla
  const cartItemsRes = await db.query(
    "SELECT SUM(total_price) AS subtotal FROM cart_items WHERE cart_id = $1",
    [cart.id]
  );
  const subtotal = parseFloat(cartItemsRes.rows[0].subtotal) || 0;

  // 2. İndirimi hesapla
  let discountAmount;
  if (coupon.type === "percentage") {
    discountAmount = (subtotal * coupon.value) / 100;
  } else {
    discountAmount = coupon.value;
  }

  // Sepeti güncelle
  await db.query(
    "UPDATE carts SET coupon_code = $1, discount_amount = $2 WHERE id = $3",
    [code, discountAmount, cart.id]
  );

  // Kullanıcı-kupon kaydını ekle
  await db.query(
    "INSERT INTO user_coupons (user_id, coupon_id) VALUES ($1, $2)",
    [userId, coupon.id]
  );

  res.json({ success: true, discountAmount });
});

module.exports = { applyCoupon };
