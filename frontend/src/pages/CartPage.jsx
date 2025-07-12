import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from "../features/carts/cartSlice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, cart_items, status } = useSelector((state) => state.cart);

  const [selectedShipping, setSelectedShipping] = useState("standard");

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const subtotal = cart_items.reduce(
    (sum, item) => sum + Number(item.total_price),
    0
  );
  const discount = Number(cart?.discount_amount || 0);
  const shippingFee = selectedShipping === "express" ? 9.99 : 4.99;
  const total = subtotal - discount + shippingFee;

  if (status === "loading") return <p>Loading cart...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* LEFT: Cart Items */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart_items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart_items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 mb-4 border rounded"
            >
              {/* Solda ürün resmi */}
              <img
                src={item.product_image_url}
                alt={item.product_name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Ürün bilgileri ve quantity kontrolü */}
              <div className="flex flex-col flex-grow ml-4">
                <h3 className="font-semibold">{item.product_name}</h3>
                <p className="text-gray-600">
                  Size: {item.internal_pot_diameter || item.variant_name}
                </p>

                <div className="flex items-center gap-6 my-2">
                  {/* Quantity control */}
                  <div className="flex flex-col items-center border rounded p-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateCartItemQuantity({
                            cartItemId: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="text-gray-700 hover:text-black"
                      disabled={item.quantity >= item.stock}
                    >
                      <FaChevronUp />
                    </button>

                    <span className="font-medium py-1">{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          updateCartItemQuantity({
                            cartItemId: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className="text-gray-700 hover:text-black"
                      disabled={item.quantity <= 1}
                    >
                      <FaChevronDown />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    Unit Price: £{Number(item.unit_price).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Sağda toplam fiyat ve silme butonu */}
              <div className="flex flex-col items-end ml-4 gap-2">
                <p className="font-bold text-lg">
                  £{Number(item.total_price).toFixed(2)}
                </p>

                <button
                  onClick={() => dispatch(removeItemFromCart(item.id))}
                  className="text-red-600 hover:text-red-800"
                  title="Remove item"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT: Summary */}
      <div className="border rounded p-6 bg-gray-50 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>-£{discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>£{shippingFee.toFixed(2)}</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>£{total.toFixed(2)}</span>
        </div>

        {/* Coupon Code Input (disabled for now) */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <input
            type="text"
            placeholder="Enter code"
            className="w-full px-3 py-2 border rounded"
            disabled
          />
        </div>

        {/* Shipping Method Selection */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Shipping Method
          </label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={selectedShipping}
            onChange={(e) => setSelectedShipping(e.target.value)}
          >
            <option value="standard">Standard (£4.99)</option>
            <option value="express">Express (£9.99)</option>
          </select>
        </div>
      </div>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
};

export default CartPage;
