import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import UserInfo from "../components/UserInfo";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded">
      <button onClick={handleLogout} className="text-red-600">
        Logout
      </button>
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <UserInfo />
    </div>
  );
};

export default ProfilePage;
