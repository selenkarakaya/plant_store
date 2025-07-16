import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../features/products/productSlice";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ExpandableText from "../utils/ExpandableText";

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

  const displayProducts = categoryId
    ? products
    : [...products].sort(() => Math.random() * 10);

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
    <div>
      <div className="flex flex-col mx-auto my-5 justify-center items-center w-1/2">
        <h2 className="text-xl font-bold mb-4">
          {selectedCategory && selectedCategory.name}
        </h2>
        <ExpandableText text={selectedCategory?.description} limit={120} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
