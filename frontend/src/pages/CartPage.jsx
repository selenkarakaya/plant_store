import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from "../features/carts/cartSlice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, cart_items, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const subtotal = cart_items.reduce(
    (sum, item) => sum + Number(item.total_price),
    0
  );

  const discount = Number(cart?.discount_amount || 0);
  const shippingFee = subtotal >= 60 ? 0 : 5.99;
  const total = subtotal - discount + shippingFee;

  if (status === "loading") return <p>Loading cart...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* LEFT: Cart Items */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-4">Shopping cart</h2>

        {subtotal < 60 && (
          <p className="text-sm text-gray-600 mt-2">
            Spend another
            <span className="font-semibold">£{(60 - subtotal).toFixed(2)}</span>
            for free delivery.
          </p>
        )}
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

                <div className="flex items-center gap-6 my-2 ">
                  {/* Quantity control */}
                  <div className="flex gap-x-4 rounded-4xl bg-gray-100 py-2 px-4">
                    <button
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

              {/* Sağda toplam fiyat ve silme butonu */}
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
        <h2 className="text-lg font-bold mb-6">Order Summary</h2>
        <div className="h-px bg-gray-300" />

        <div className="flex justify-between my-2">
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

        <div className="h-px bg-gray-300" />
        <div className="flex justify-between">
          <p className="font-bold text-lg">
            Order total{" "}
            <span className="text-sm font-extralight">(VAT included)</span>
          </p>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
};

export default CartPage;
