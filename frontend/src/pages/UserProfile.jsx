import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import UserInfo from "../components/UserInfo";
import UserOrders from "../components/UserOrders";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("orders"); // 'profile' | 'orders'

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <main
      className="flex justify-between items-center max-w-3/4 mx-auto mt-10 p-6 gap-x-4 shadow rounded"
      role="main"
    >
      <nav
        className="flex flex-col gap-4 font-semibold "
        aria-label="User tabs"
      >
        <button
          onClick={() => setSelectedTab("profile")}
          aria-current={selectedTab === "profile" ? "page" : undefined}
          className={`px-2 py-2 rounded-md cursor-pointer ${
            selectedTab === "profile"
              ? "bg-terracotta text-white"
              : "bg-gray-200 text-gray-700 border border-terracotta"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setSelectedTab("orders")}
          aria-current={selectedTab === "orders" ? "page" : undefined}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            selectedTab === "orders"
              ? "bg-terracotta text-white"
              : "bg-gray-200 text-gray-700 border border-terracotta"
          }`}
        >
          Orders
        </button>
        <button
          onClick={handleLogout}
          className="text-terracotta font-bold border-b border-terracotta px-4 py-2 hover:scale-105 cursor-pointer"
        >
          Logout
        </button>
      </nav>

      <section aria-labelledby="profile-heading" className="w-3/4">
        {selectedTab === "profile" && <UserInfo />}
        {selectedTab === "orders" && <UserOrders />}
      </section>
    </main>
  );
};

export default ProfilePage;
