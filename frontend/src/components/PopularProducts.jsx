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
        className="text-red-500 text-center mt-4"
        role="alert"
      >
        Error loading popular products: {error}
      </section>
    );

  return (
    <section
      className="my-8 max-w-screen-xl mx-auto"
      aria-labelledby="popular-products-heading"
    >
      <header className="flex flex-col w-1/2 justify-center items-center mx-auto my-4">
        <h1 id="popular-products-heading" className="text-xl font-bold mb-4">
          Popular Houseplants & Indoor Plants
        </h1>
        <p>
          Discover an amazing selection of vibrant houseplants and indoor
          greens, all in stock and ready for fast UK delivery! Bring life,
          freshness, and a splash of nature into your home today 🌿✨
        </p>
      </header>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list">
        {currentItems.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} isPopular={true} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <nav
        aria-label="Popular products pagination"
        className="flex justify-center space-x-3 mt-6"
      >
        {[...Array(Math.ceil(items.length / itemsPerPage))].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            aria-current={currentPage === idx ? "page" : undefined}
            className={`px-3 py-1 rounded ${
              currentPage === idx
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
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
