import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularProducts } from "../features/products/popularSlice";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { paginate } from "../utils/pagination";

const PopularProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.popularProducts
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const currentItems = paginate(items, currentPage, itemsPerPage);

  useEffect(() => {
    dispatch(fetchPopularProducts());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <section
        aria-live="assertive"
        className="text-red-600 text-center mt-4 px-4"
        role="alert"
      >
        Error loading popular products: {error}
      </section>
    );

  return (
    <section
      className="my-8 max-w-screen-xl mx-auto px-4"
      aria-labelledby="popular-products-heading"
    >
      <header className="max-w-3xl mx-auto text-center my-6 px-2">
        <h1
          id="popular-products-heading"
          className="text-2xl sm:text-3xl font-bold mb-4"
        >
          Popular Houseplants & Indoor Plants
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Discover an amazing selection of vibrant houseplants and indoor
          greens, all in stock and ready for fast UK delivery! Bring life,
          freshness, and a splash of nature into your home today 🌿✨
        </p>
      </header>

      <ul
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        role="list"
      >
        {currentItems.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} isPopular={true} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <nav
        aria-label="Popular products pagination"
        className="flex justify-center space-x-3 mt-8"
      >
        {[...Array(Math.ceil(items.length / itemsPerPage))].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            aria-current={currentPage === idx ? "page" : undefined}
            className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${
              currentPage === idx
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </nav>
    </section>
  );
};

export default PopularProducts;
