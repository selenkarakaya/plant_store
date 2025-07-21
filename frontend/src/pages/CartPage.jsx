import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCartItemQuantity,
  removeItemFromCart,
  setShippingMethod,
} from "../features/carts/cartSlice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import CouponSection from "../components/CouponSection";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, cart_items, status } = useSelector((state) => state.cart);
  const shippingMethod = useSelector((state) => state.cart.shippingMethod);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const subtotal = cart_items.reduce(
    (sum, item) => sum + Number(item.total_price),
    0
  );

  const discount = Number(cart?.discount_amount || 0);
  let shippingFee = 0;

  if (shippingMethod === "standard") {
    shippingFee = subtotal >= 60 ? 0 : 5.99;
  } else if (shippingMethod === "express") {
    shippingFee = subtotal >= 60 ? 5.99 : 7.99;
  }

  const total = subtotal - discount + shippingFee;

  if (status === "loading") return <p>Loading cart...</p>;

  return (
    <>
      <header className="flex items-center justify-around w-1/2 mx-auto my-4 gap-x-6">
        <div className="w-[20%] h-[10rem] bg-cover bg-[url('https://res.cloudinary.com/de4kodlhk/image/upload/v1753103676/Blue_and_Yellow_Creative_Delivery_Service_Sticker_1_muytbo.png')]" />
        <div>
          <h1 className="text-xl font-semibold">Summer Savings! 🌞</h1>
          <p>
            Spend £60+ for free delivery and get 10% off with code{" "}
            <strong>SUMMER10</strong>!
          </p>
        </div>
      </header>

      <hr className="h-px bg-gray-300" />

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <section className="md:col-span-2" aria-label="Cart items section">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

          {subtotal < 60 && (
            <p className="text-sm text-gray-600 mt-2">
              Spend another{" "}
              <span className="font-semibold">
                £{(60 - subtotal).toFixed(2)}
              </span>{" "}
              for free delivery.
            </p>
          )}

          {cart_items.length === 0 ? (
            <p className="text-gray-500">Your cart is currently empty.</p>
          ) : (
            cart_items.map((item) => (
              <article
                key={item.id}
                className="flex justify-between items-center p-4 mb-4 border rounded"
              >
                <Link to={`/products/${item.product_id}`}>
                  <img
                    src={item.product_image_url}
                    alt={`Image of ${item.product_name}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                </Link>

                <div className="flex flex-col flex-grow ml-4">
                  <h3 className="font-semibold">{item.product_name}</h3>
                  <p className="text-gray-600 text-sm">
                    Size: {item.internal_pot_diameter || item.variant_name}
                  </p>

                  <div className="flex items-center gap-6 my-2">
                    <div className="flex gap-x-4 bg-gray-100 py-2 px-4 rounded-4xl">
                      <button
                        aria-label="Increase quantity"
                        onClick={() => {
                          dispatch(
                            updateCartItemQuantity({
                              cartItemId: item.id,
                              quantity: item.quantity + 1,
                            })
                          );
                          toast.success("Product quantity updated!");
                        }}
                        className="text-gray-700 hover:text-black"
                        disabled={item.quantity >= item.stock}
                      >
                        <FaChevronUp />
                      </button>

                      <span className="font-medium py-1">{item.quantity}</span>

                      <button
                        aria-label="Decrease quantity"
                        onClick={() => {
                          dispatch(
                            updateCartItemQuantity({
                              cartItemId: item.id,
                              quantity: item.quantity - 1,
                            })
                          );
                          toast.success("Product quantity updated!");
                        }}
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

                <div className="flex flex-col items-end ml-4 gap-2">
                  <p className="font-bold text-lg">
                    £{Number(item.total_price).toFixed(2)}
                  </p>

                  <button
                    onClick={() => {
                      dispatch(removeItemFromCart(item.id));
                      toast.success("Product removed from cart!");
                    }}
                    className="text-red-600 hover:text-red-800"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        {/* RIGHT SIDE */}
        <aside
          className="border rounded p-6 bg-gray-50 shadow-sm"
          aria-label="Order summary"
        >
          <h2 className="text-lg font-bold mb-6">Order Summary</h2>
          <hr className="h-px bg-gray-300 mb-2" />

          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping:</span>
            <span>
              {shippingFee === 0 ? (
                <span className="text-green-800 font-semibold">Free</span>
              ) : (
                `£${shippingFee.toFixed(2)}`
              )}
            </span>
          </div>

          <hr className="h-px bg-gray-300" />

          <CouponSection />

          {cart?.coupon_code && (
            <div className="flex justify-between text-green-700 font-semibold mt-2">
              <span>Coupon ({cart.coupon_code}):</span>
              <span>-£{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="shippingMethod"
              className="block mb-1 font-semibold"
            >
              Shipping Method
            </label>
            <select
              id="shippingMethod"
              value={shippingMethod}
              onChange={(e) => dispatch(setShippingMethod(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              <option value="standard">Standard Delivery</option>
              <option value="express">Express Delivery</option>
            </select>
          </div>

          <div className="flex justify-between mt-4">
            <p className="font-bold text-lg">
              Order total{" "}
              <span className="text-sm font-extralight">(VAT included)</span>
            </p>
            <span>£{total.toFixed(2)}</span>
          </div>
        </aside>

        {/* CONTINUE BUTTON */}
        <div className="md:col-span-1">
          {cart_items.length === 0 ? (
            <Link
              to="/category/6"
              className="block bg-primary py-6 text-center text-white rounded-3xl hover:bg-green-800"
            >
              CONTINUE SHOPPING
            </Link>
          ) : (
            <Link
              to="/checkout"
              className="block bg-primary py-6 text-center text-white rounded-3xl hover:bg-green-800"
            >
              CONTINUE TO CHECKOUT
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default CartPage;
