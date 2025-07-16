import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularProducts } from "../features/products/popularSlice";
import ProductCard from "./ProductCard"; // ayni klasordeyse ./ ile
import LoadingSpinner from "./LoadingSpinner"; // varsa kullan, yoksa kaldır

const PopularProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.popularProducts
  );

  useEffect(() => {
    dispatch(fetchPopularProducts());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading popular products: {error}
      </div>
    );

  return (
    <div className="my-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col w-1/2 justify-center items-center mx-auto my-4">
        <h1 className="text-xl font-bold mb-4">
          Popular Houseplants & Indoor Plants
        </h1>
        <p>
          Discover an amazing selection of vibrant houseplants and indoor
          greens, all in stock and ready for fast UK delivery! Bring life,
          freshness, and a splash of nature into your home today 🌿✨
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} isPopular={true} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
