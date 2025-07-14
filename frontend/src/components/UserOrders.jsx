import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyOrders,
  fetchOrderDetails,
  clearOrderDetails,
} from "../features/orders/orderSlice";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import OrderDetails from "./OrderDetails";

function UserOrders() {
  const dispatch = useDispatch();
  const { orders, orderDetails, detailStatus } = useSelector(
    (state) => state.orders
  );

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleToggleDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      dispatch(clearOrderDetails());
    } else {
      dispatch(fetchOrderDetails(orderId));
      setExpandedOrderId(orderId);
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {orders.map((order) => {
        const isOpen = expandedOrderId === order.id;

        return (
          <div key={order.id} className="border rounded-lg shadow p-4 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>
                <p>Status: {order.status}</p>
                <p>Shipping: {order.shipping_method}</p>
              </div>

              <button
                onClick={() => handleToggleDetails(order.id)}
                className="flex items-center text-blue-600 hover:underline"
              >
                {isOpen ? "Hide Items" : "Display Items"}
                <span className="ml-2">
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
            </div>

            {/* Dropdown Details with transition */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-[500px] mt-4" : "max-h-0"
              }`}
            >
              {isOpen && (
                <>
                  {detailStatus === "loading" ? (
                    <p className="text-gray-500">Loading...</p>
                  ) : orderDetails ? (
                    <OrderDetails order={orderDetails} />
                  ) : (
                    <p className="text-red-500">No details available.</p>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserOrders;
