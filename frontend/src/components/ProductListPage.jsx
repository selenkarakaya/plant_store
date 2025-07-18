import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../features/products/productSlice";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ExpandableText from "../utils/ExpandableText";
import { paginate } from "../utils/pagination";

const ProductListPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

  const selectedCategory = categories.find(
    (cat) => cat.id.toString() === categoryId
  );
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, categoryId]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const currentItems = paginate(products, currentPage, itemsPerPage);

  // Scroll to top when the page changes
  const handlePageChange = (idx) => {
    setCurrentPage(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  if (products.length === 0)
    return (
      <div className="text-center text-gray-600 mt-10">
        <p className="text-xl mb-2">😞 Oops! No plants to show right now.</p>
        <p>Try checking back later or explore other categories 🌿</p>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-6"
        role="alert"
      >
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">Something went wrong: {error}</span>
      </div>
    );

  return (
    <div className="my-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col mx-auto my-5 justify-center items-center w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {selectedCategory && selectedCategory.name}
        </h2>
        <ExpandableText text={selectedCategory?.description} limit={120} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Page numbers */}
      {Math.ceil(products.length / itemsPerPage) > 1 && (
        <div className="flex justify-center space-x-3 mt-6">
          {[...Array(Math.ceil(products.length / itemsPerPage))].map(
            (_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {idx + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
