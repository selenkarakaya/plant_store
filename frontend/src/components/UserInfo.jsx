// src/components/profile/UserInfo.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, changePassword } from "../features/user/userSlice";

const UserInfo = () => {
  const dispatch = useDispatch();

  const { userInfo, updateStatus, updateError, passwordStatus, passwordError } =
    useSelector((state) => state.user);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
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

  // Parola değiştirme formu state'i
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    // Profil güncelleme başarılıysa
    if (updateStatus === "succeeded") {
      alert("Profile updated successfully");
    }
  }, [updateStatus]);

  useEffect(() => {
    // Parola değiştirme başarılıysa formu sıfırla ve uyarı ver
    if (passwordStatus === "succeeded") {
      alert("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
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
    <div className="space-y-10 max-w-md mx-auto">
      {/* Profil Güncelleme Formu */}
      <form
        onSubmit={handleProfileSubmit}
        className="border p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>

        <label className="block mb-2">
          Name
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={onProfileChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Email
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={onProfileChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Phone
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={onProfileChange}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-4">
          Address
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={onProfileChange}
            className="w-full border p-2 rounded"
          />
        </label>

        {updateError && <p className="text-red-600 mb-4">{updateError}</p>}

        <button
          type="submit"
          disabled={updateStatus === "loading"}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 w-full"
        >
          {updateStatus === "loading" ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Parola Değiştirme Formu */}
      <form
        onSubmit={handlePasswordSubmit}
        className="border p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        <label className="block mb-2">
          Current Password
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={onPasswordChange}
            required
            className="w-full border p-2 rounded"
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
            className="w-full border p-2 rounded"
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
            className="w-full border p-2 rounded"
          />
        </label>

        {passwordError && <p className="text-red-600 mb-4">{passwordError}</p>}

        <button
          type="submit"
          disabled={passwordStatus === "loading"}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full"
        >
          {passwordStatus === "loading" ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default UserInfo;
