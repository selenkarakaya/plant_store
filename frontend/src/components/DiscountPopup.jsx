// src/components/DiscountPopup.jsx
import React, { useEffect, useState } from "react";

const DiscountPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("discountShown");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem("discountShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          UNLOCK AN EXTRA 10% OFF YOUR FIRST ORDER!
        </h2>
        <p className="mb-4 text-center">
          Enter your email to instantly claim your exclusive 10% discount code
          for your very first order.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-4"
        />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          GET MY 10% OFF NOW!
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Don’t worry, you can unsubscribe at any point.
        </p>
      </div>
    </div>
  );
};

export default DiscountPopup;
