import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { getCart } from "../features/carts/cartSlice"; // sepete tekrar fetch yapan action

const CouponSection = () => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    console.log(`${import.meta.env.VITE_API_URL}/coupon/apply-coupon`);

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/coupon/apply-coupon`,
        { code: couponCode },
        { withCredentials: true }
      );

      toast.success("Coupon applied successfully!");
      dispatch(getCart()); // indirimi güncellemek için sepeti tekrar getir
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to apply coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <label className="block mb-1 font-medium">Have a coupon?</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="border rounded px-3 py-2 w-full"
          disabled={loading}
        />
        <button
          onClick={applyCoupon}
          className="bg-black text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default CouponSection;
