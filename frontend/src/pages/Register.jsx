import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  const { userInfo, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-6">Register</h2>

      {/* Hata mesajı */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={onSubmit}>
        <label className="block mb-2">
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-4">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-700 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
