// src/components/Header.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categorySlice";
import CategoryModal from "./CategoryModal";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const [selectedParent, setSelectedParent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { cart_items } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");

  const itemCount = cart_items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const parentCategories = categories.filter((cat) => cat.parent_id === null);

  const openModal = (cat) => {
    setSelectedParent(cat);
    setIsModalOpen(true);
  };

  const handleChildCategoryClick = (childCategory) => {
    onCategorySelect(childCategory.id);
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="w-full md:w-auto flex justify-center md:justify-start items-center">
          <Link to="/" aria-label="Home">
            <img
              src="https://res.cloudinary.com/de4kodlhk/image/upload/v1752694807/2_ocfxq5.png"
              alt="Plant Store Logo"
              className="w-16 h-16 object-cover rounded-full"
            />
          </Link>
        </div>

        {/* Search bar and icons */}
        <nav className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="flex items-center gap-4 text-xl text-gray-700">
            {userInfo ? (
              <Link to="/me" aria-label="Profile">
                <FiUser className="hover:text-green-700" />
              </Link>
            ) : (
              <Link to="/login" aria-label="Login">
                <FiUser className="hover:text-green-700" />
              </Link>
            )}

            <Link to="/shoppingCart" aria-label="Cart" className="relative">
              <FiShoppingCart className="hover:text-green-700" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-800 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      {/* Category Navigation */}
      <nav className="mt-4 px-4">
        <ul className="flex flex-wrap justify-center gap-4">
          {parentCategories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => openModal(cat)}
                className="text-sm font-medium hover:text-green-700"
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal for child categories */}
      {isModalOpen && selectedParent && (
        <CategoryModal
          parent={selectedParent}
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          onChildSelect={handleChildCategoryClick}
        />
      )}
    </header>
  );
};

export default Header;
