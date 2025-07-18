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
      className="max-w-3/4 mx-auto mt-10 p-6 border border-terracotta rounded"
      role="main"
    >
      <header className="flex justify-between items-center mb-6">
        <nav className="flex gap-4 font-semibold" aria-label="User tabs">
          <button
            onClick={() => setSelectedTab("profile")}
            aria-current={selectedTab === "profile" ? "page" : undefined}
            className={`px-4 py-2 rounded-md cursor-pointer ${
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
        </nav>
        <button
          onClick={handleLogout}
          className="text-terracotta font-bold border border-terracotta px-4 py-2 hover:scale-105 cursor-pointer"
        >
          Logout
        </button>
      </header>

      <section aria-labelledby="profile-heading">
        {selectedTab === "profile" && <UserInfo />}
        {selectedTab === "orders" && <UserOrders />}
      </section>
    </main>
  );
};

export default ProfilePage;
