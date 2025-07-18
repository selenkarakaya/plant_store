import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, changePassword } from "../features/user/userSlice";

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
    <main className="space-y-10">
      {/* Account Section */}
      <section
        aria-labelledby="account-settings-heading"
        className="relative p-6 rounded-lg shadow"
      >
        <header className="mb-4 flex items-center justify-between">
          <h2
            id="account-settings-heading"
            className="text-xl font-semibold text-primary"
          >
            Account settings
          </h2>
        </header>

        <article className="text-xs space-y-1">
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.phone || "-"}</p>
          <p>{userInfo.address || "-"}</p>
        </article>

        <footer className="mt-6 space-y-6">
          <button
            onClick={() => setShowProfileModal(true)}
            className="text-gray-600 hover:text-black border-b"
          >
            EDIT MY DETAILS
          </button>
          <div className="h-px bg-gray-300" />
          <button
            onClick={() => setShowPasswordModal(true)}
            className="text-gray-600 hover:text-black border-b"
          >
            CHANGE PASSWORD
          </button>
          <div className="h-px bg-gray-300" />
        </footer>
      </section>

      {/* Profile Modal */}
      {showProfileModal && (
        <section
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow max-w-2xl w-full relative">
            <header>
              <h2 className="text-xl font-bold mb-4">Edit profile</h2>
            </header>

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
                    className="mt-1 w-full border p-2 rounded focus:ring-green-800"
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
                    className="mt-1 w-full border p-2 rounded focus:ring-green-800"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Phone
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={onProfileChange}
                    className="mt-1 w-full border p-2 rounded focus:ring-green-800"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Address
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={onProfileChange}
                    className="mt-1 w-full border p-2 rounded focus:ring-green-800"
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
                  className="px-4 border-b border-green-900 text-green-800"
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
        </section>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <section
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow max-w-md w-full relative">
            <header>
              <h2 className="text-xl font-bold mb-4">Change Password</h2>
            </header>

            <form onSubmit={handlePasswordSubmit}>
              <label className="block mb-2">
                Current Password
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={onPasswordChange}
                  required
                  className="w-full border p-2 rounded focus:ring-green-800"
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
                  className="w-full border p-2 rounded focus:ring-green-800"
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
                  className="w-full border p-2 rounded focus:ring-green-800"
                />
              </label>

              {passwordError && (
                <p className="text-red-600 mb-4">{passwordError}</p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 border-b border-green-900 text-green-800"
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
        </section>
      )}
    </main>
  );
};

export default UserInfo;
