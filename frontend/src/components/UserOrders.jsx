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
    <section className="max-w-2xl mx-auto shadow rounded-lg p-4">
      {orders.length === 0 ? (
        <div className="text-center my-6">
          <p className="text-lg font-medium">No orders yet</p>
          <p className="text-sm text-gray-600">
            Go to store to place an order.
          </p>
        </div>
      ) : (
        <ul className="space-y-8">
          {orders.map((order) => {
            const isOpen = expandedOrderId === order.id;

            return (
              <li key={order.id} className="border-b pb-6">
                <article className="flex justify-between items-start">
                  <div>
                    <h2 className="text-sm font-medium">Order #{order.id}</h2>
                    <p className="font-semibold uppercase">{order.status}</p>
                    <time
                      dateTime={order.created_at}
                      className="text-sm text-gray-600"
                    >
                      {new Date(order.created_at).toLocaleDateString("en-GB")}
                    </time>
                    <p className="text-sm">Shipping: {order.shipping_method}</p>
                    <p className="font-semibold">£{order.total_amount}</p>
                  </div>

                  <button
                    onClick={() => handleToggleDetails(order.id)}
                    className="flex items-center text-green-950 hover:underline mt-1"
                    aria-expanded={isOpen}
                    aria-controls={`order-details-${order.id}`}
                  >
                    {isOpen ? "Hide Items" : "View Items"}
                    <span className="ml-2">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>
                </article>

                <div
                  id={`order-details-${order.id}`}
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
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default UserOrders;
