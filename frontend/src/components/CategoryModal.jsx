// src/components/CategoryModal.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedCategoryId,
  fetchProductsByCategory,
} from "../features/products/productSlice";

const CategoryModal = ({ parent, categories, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const childCategories = categories.filter(
    (cat) => cat.parent_id === parent.id
  );

  const handleClick = (cat) => {
    dispatch(setSelectedCategoryId(cat.id));
    dispatch(fetchProductsByCategory(cat.id));
    onClose();
    navigate(`/category/${cat.id}`); // Ürünleri gösterecek sayfaya yönlendir
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-start z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl p-6 mt-24 w-[90%] max-w-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{parent.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {childCategories.map((cat) => (
            <li
              key={cat.id}
              className="text-green-700 hover:underline cursor-pointer"
              onClick={() => handleClick(cat)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryModal;
