import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, resetCheckoutStatus } from "../features/orders/orderSlice";
import { getCart } from "../features/carts/cartSlice"; // Sepet verisini almak için

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart, cart_items } = useSelector((state) => state.cart);
  const { checkoutStatus, checkoutError } = useSelector(
    (state) => state.orders
  );
  const userInfo = useSelector((state) => state.user.userInfo);
  const [address, setAddress] = useState(userInfo?.address || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("mock_card");
  const [couponCode, setCouponCode] = useState("");
  const shippingMethod = useSelector((state) => state.cart.shippingMethod);

  useEffect(() => {
    // Sepeti sayfa yüklenince çek
    dispatch(getCart());
    dispatch(resetCheckoutStatus());
  }, [dispatch]);

  const subtotal = cart_items?.reduce(
    (sum, item) => sum + Number(item.total_price),
    0
  );
  const discount = Number(cart?.discount_amount || 0);

  let shippingFee = 0;
  if (shippingMethod === "express") {
    shippingFee = subtotal >= 60 ? 5.99 : 7.99;
  } else if (shippingMethod === "standard") {
    shippingFee = subtotal >= 60 ? 0 : 5.99;
  } else {
    shippingFee = 0;
  }
  console.log("subtotal:", subtotal);
  console.log("shippingMethod:", shippingMethod);
  // 💰 Toplam Tutar:
  const totalAmount = subtotal + shippingFee - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter your shipping address");
      return;
    }
    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }
    const orderData = {
      shipping_address: address,
      shipping_method: shippingMethod,
      payment_method: paymentMethod,
      coupon_code: couponCode.trim() || null,
    };

    dispatch(checkout(orderData));
  };

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      {/* Left side: User info & form */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4">Shipping & Payment Details</h2>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            readOnly
            value={userInfo?.email || ""}
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Shipping Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="mock_card">Credit Card (Mock)</option>
            {/* Gelecekte PayPal, Stripe vb. eklenebilir */}
          </select>
        </div>

        <button
          type="submit"
          disabled={checkoutStatus === "loading"}
          className="bg-primary text-white px-6 py-3 rounded-3xl hover:bg-green-800"
        >
          {checkoutStatus === "loading" ? "Processing..." : "Place Order"}
        </button>

        {checkoutStatus === "failed" && (
          <p className="text-red-600 mt-2">{checkoutError}</p>
        )}

        {checkoutStatus === "succeeded" && (
          <p className="text-green-600 mt-2">
            Order placed successfully! Thank you.
          </p>
        )}
      </form>

      {/* Right side: Order summary */}
      <div className="w-96 bg-gray-50 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {/* Sipariş ürünleri */}
        <div className="max-h-56 overflow-y-auto space-y-4 mb-4">
          {cart_items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <img
                src={item.product_image_url || "/placeholder.png"} // Backend'den image_url gelmeli
                alt={item.variant_name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.variant_name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600 truncate max-w-xs">
                  {item.product_description || ""}
                </p>
              </div>
              <p className="font-bold">
                £{Number(item.total_price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Cost summary */}
        <div className="space-y-2 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span>Subtotal · {cart_items.length} items</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <p> £{shippingFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            {discount > 0 && (
              <>
                <span>Discount</span>
                <span>-£{discount.toFixed(2)}</span>
              </>
            )}
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>£{totalAmount.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500">This includes 20% VAT</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
