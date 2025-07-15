import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={onSubmit}>
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
        <label className="block mb-4">
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
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {status === "loading" ? "Loading.." : "Login"}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-green-700 hover:underline">
          Register
        </Link>
      </p>
      <a href="http://localhost:5500/auth/google">
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Sign in with Google
        </button>
      </a>
    </div>
  );
};

export default Login;
