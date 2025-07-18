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
    navigate(`/category/${cat.id}`);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
      tabIndex={-1}
      className="fixed inset-0 flex justify-center items-start z-50  bg-opacity-30"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-xl p-6 mt-24 w-[90%] max-w-xl shadow-xl"
        role="document"
      >
        <header className="flex justify-between items-center mb-4">
          <h2 id="category-modal-title" className="text-xl font-bold">
            {parent.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close category modal"
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </header>
        <nav aria-label={`Subcategories of ${parent.name}`}>
          <ul className="grid grid-cols-2 gap-4 list-none p-0 m-0">
            {childCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => handleClick(cat)}
                  className="text-green-700 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CategoryModal;
