// src/components/Header.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categorySlice";
import CategoryModal from "./CategoryModal";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const [selectedParent, setSelectedParent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

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
    <header className="bg-white shadow p-4 flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-5xl px-4 mb-4">
        <div style={{ width: "100px" }}></div>
        <Link to="/" className="text-2xl font-bold px-3 py-1">
          Selen’s Greenery
        </Link>
        <div className="flex items-center gap-4 text-gray-700 text-xl cursor-pointer">
          <FiSearch title="Search" className="hover:text-green-700" />

          {userInfo ? (
            <Link to="/me">
              <FiUser title="User" className="hover:text-green-700" />
            </Link>
          ) : (
            <>
              <Link to="/login">
                {" "}
                <FiUser title="User" className="hover:text-green-700" />
              </Link>
            </>
          )}
          <Link to="/shoppingCart">
            <FiShoppingCart title="Cart" className="hover:text-green-700" />
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {parentCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => openModal(cat)}
            className="font-medium hover:text-green-700"
          >
            {cat.name}
          </button>
        ))}
      </div>

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
