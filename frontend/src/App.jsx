import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, setUserInfo } from "./features/user/userSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ProductDetailPage from "./pages/ProductDetailPage";
import PrivateRoute from "./utils/PrivateRoute";
import ProductListPage from "./pages/ProductListPage";
import Products from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await dispatch(fetchUserProfile()).unwrap();
        dispatch(setUserInfo(result)); // store the user in redux
      } catch (err) {
        console.log("Session not found:", err.message);
      }
    };

    if (!userInfo) {
      checkAuth();
    }
  }, [dispatch, userInfo]);

  // useEffect(() => {
  //   if (userInfo) {
  //     alert("Session started successfully!");
  //   }
  // }, [userInfo]);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/me" element={<UserProfile />} />
          </Route>

          <Route path="/shoppingCart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:categoryId" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
