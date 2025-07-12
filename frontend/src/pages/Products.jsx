import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
const Products = () => {
  const dispatch = useDispatch();

  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const shuffledProducts = useMemo(
    () => [...products].sort(() => Math.random() - 0.5),
    [products]
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

  if (products.length === 0)
    return (
      <div className="text-center text-gray-600 mt-10">
        <p className="text-xl mb-2">😞 Oops! No plants to show right now.</p>
        <p>Try checking back later or explore other categories 🌿</p>
      </div>
    );

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Random Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shuffledProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
