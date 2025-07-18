import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, changePassword } from "../features/user/userSlice";
import { FaEdit } from "react-icons/fa";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userInfo, updateStatus, updateError, passwordStatus, passwordError } =
    useSelector((state) => state.user);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (userInfo) {
      setProfileData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (updateStatus === "succeeded") {
      alert("Profile updated successfully");
      setShowProfileModal(false);
    }
  }, [updateStatus]);

  useEffect(() => {
    if (passwordStatus === "succeeded") {
      alert("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setShowPasswordModal(false);
    }
  }, [passwordStatus]);

  const onProfileChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const onPasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    dispatch(
      changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
    );
  };

  if (!userInfo) return <p>Please log in to view your profile.</p>;

  return (
    <div className="space-y-10">
      {/* User Info */}
      <div className="relative p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-primary mb-4 flex items-center justify-between">
          Account settings
        </h2>
        <p className="text-xs">{userInfo.name}</p>
        <p className="text-xs">{userInfo.email}</p>
        <p className="text-xs">{userInfo.phone || "-"}</p>
        <p className="text-xs">{userInfo.address || "-"}</p>

        <button
          onClick={() => setShowProfileModal(true)}
          className="text-gray-600 hover:text-black border-b my-6"
        >
          EDIT MY DETAILS
        </button>
        <div className="flex-grow h-px bg-gray-300" />
        <button
          onClick={() => setShowPasswordModal(true)}
          className="text-gray-600 hover:text-black border-b my-6"
        >
          CHANGE PASSWORD
        </button>
        <div className="flex-grow h-px bg-gray-300" />
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full relative">
            <h2 className="text-xl font-bold mb-4">Edit profile</h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-sm font-medium">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={onProfileChange}
                    required
                    className="mt-1 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={onProfileChange}
                    required
                    className="mt-1 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                  />
                </label>

                <label className="block text-sm font-medium sm:col-span-1">
                  Phone
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={onProfileChange}
                    className="mt-1 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                  />
                </label>

                <label className="block text-sm font-medium sm:col-span-1">
                  Address
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={onProfileChange}
                    className="mt-1 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                  />
                </label>
              </div>

              {updateError && (
                <p className="text-red-600 mt-4">{updateError}</p>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 border-b border-green-900 text-green-800 hover:scale-105 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateStatus === "loading"}
                  className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
                >
                  {updateStatus === "loading" ? "Updating..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <label className="block mb-2">
                Current Password
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={onPasswordChange}
                  required
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                />
              </label>

              <label className="block mb-2">
                New Password
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={onPasswordChange}
                  required
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                />
              </label>

              <label className="block mb-4">
                Confirm New Password
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={onPasswordChange}
                  required
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                />
              </label>

              {passwordError && (
                <p className="text-red-600 mb-4">{passwordError}</p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 border-b border-green-900 text-green-800 hover:scale-105 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordStatus === "loading"}
                  className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
                >
                  {passwordStatus === "loading" ? "Changing..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
