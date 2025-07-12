import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  // Eğer kullanıcı giriş yapmamışsa /login sayfasına yönlendir
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
