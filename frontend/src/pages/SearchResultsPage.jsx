// src/pages/SearchResultsPage.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const SearchResultsPage = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q")?.toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    const keywords = searchTerm.toLowerCase().split(" ");

    return products.filter((product) => {
      const text =
        `${product.name} ${product.description} ${product.family}`.toLowerCase();
      return keywords.every((word) => text.includes(word));
    });
  }, [products, searchTerm]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Search results for “{searchTerm}”
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products matched your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
