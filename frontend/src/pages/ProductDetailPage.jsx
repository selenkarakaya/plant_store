import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../features/products/productSlice";
import { addToCart } from "../features/carts/cartSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import CareInfoAccordion from "../components/CareInfoAccordion";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const { selectedProduct, status, error } = useSelector(
    (state) => state.products
  );

  // Fetch product by id when component mounts or id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    // Clear selected product on component unmount
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  // Find the selected variant object from product variants
  const selectedVariant = selectedProduct?.product_variants?.find(
    (variant) => variant.id === selectedVariantId
  );

  // Extract plant details for display
  const selectedDetails = selectedProduct?.plant_details;

  // Handle loading, error, and not found states
  if (status === "loading") return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  if (!selectedProduct) return <p>Product not found.</p>;

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <article className="flex flex-col md:flex-row gap-6">
        {/* Product image */}
        <figure className="md:w-2/3 sticky top-20 self-start">
          <img
            src={selectedProduct.image_url}
            alt={selectedProduct.name}
            className="w-full h-[36rem] rounded mb-4"
          />
        </figure>

        {/* Product details section */}
        <section className="md:w-2/3" aria-labelledby="product-title">
          <header className="mb-4">
            {/* Product name */}
            <h1
              id="product-title"
              className="text-2xl font-bold text-green-800"
            >
              {selectedProduct.name}
            </h1>
            {/* Product family */}
            <p className="text-sm text-gray-500">{selectedProduct.family}</p>
          </header>

          {/* Product description */}
          <p className="mb-4">{selectedProduct.description}</p>
          {/* Show rare plant badge if category id 42 exists */}
          {selectedProduct?.product_categories?.some(
            (cat) => cat.category_id === 42
          ) && (
            <aside
              className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full mb-4"
              aria-label="Rare Plant Badge"
            >
              <p>🌟 RARE PLANT</p>
              <p>You're lucky you found me!</p>
            </aside>
          )}

          {/* Variants selection section */}
          <section aria-labelledby="variant-heading" className="mb-6">
            <h2 id="variant-heading" className="text-lg font-semibold mb-2">
              Plant height & pot size
            </h2>

            {/* List all product variants as buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedProduct.product_variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`text-left border-2 rounded-lg p-4 shadow-sm transition hover:shadow-md ${
                    selectedVariantId === variant.id
                      ? "border-primary bg-secondary"
                      : "border-gray-300"
                  }`}
                  aria-pressed={selectedVariantId === variant.id}
                >
                  <h3 className="font-semibold">{variant.variant_name}</h3>
                  <p className="text-sm text-gray-600">
                    {variant.internal_pot_diameter || "N/A"}
                  </p>
                  <p className="text-lg font-bold mt-2">£{variant.price}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Stock status message */}
          {selectedVariant && (
            <p
              className={`mb-4 text-sm text-gray-700 px-4 py-2 rounded text-center ${
                selectedVariant.stock >= 15
                  ? "bg-primary text-green-100"
                  : "bg-brown text-red-50"
              }`}
              role="status"
            >
              {selectedVariant.stock <= 5
                ? "Almost sold out! 🚨 | EXPRESS DELIVERY"
                : selectedVariant.stock <= 10
                ? "Selling fast! ⏳ | EXPRESS DELIVERY"
                : selectedVariant.stock >= 15
                ? "IN STOCK - 1-2 DAY EXPRESS DELIVERY 🌿"
                : "Limited stock available!"}
            </p>
          )}

          {/* Additional plant information */}
          <aside
            className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-800 rounded"
            aria-label="Additional plant information"
          >
            <p>{selectedDetails?.additional_info}</p>
          </aside>

          {/* Botanical details section */}
          <section
            className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto mt-8"
            aria-labelledby="botanical-info-heading"
          >
            <p className="font-medium text-gray-800 my-4">
              Botanical Names:{" "}
              <span className="italic text-gray-600 mb-4">
                {selectedDetails?.botanical_names}
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Light requirements */}
              <div className="flex items-start gap-3">
                🌞
                <div>
                  <p className="font-medium text-gray-800">Light</p>
                  <p className="text-sm text-gray-600">
                    {selectedDetails?.light_requirements}
                  </p>
                </div>
              </div>

              {/* Water requirements */}
              <div className="flex items-start gap-3">
                💧
                <div>
                  <p className="font-medium text-gray-800">Water</p>
                  <p className="text-sm text-gray-600">
                    {selectedDetails?.water_requirements}
                  </p>
                </div>
              </div>

              {/* Pet friendliness */}
              <div className="flex items-start gap-3">
                🐾
                <div>
                  <p className="font-medium text-gray-800">Pet Friendly</p>
                  <p className="text-sm text-gray-600">
                    {selectedDetails?.pet_friendly}
                  </p>
                </div>
              </div>

              {/* Air purifying */}
              <div className="flex items-start gap-3">
                🌬️
                <div>
                  <p className="font-medium text-gray-800">Air Purifying</p>
                  <p className="text-sm text-gray-600">
                    {selectedDetails?.air_purifying}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Add to cart button */}
          <button
            onClick={() => {
              if (selectedVariantId) {
                dispatch(
                  addToCart({
                    product_variant_id: selectedVariantId,
                    quantity: 1,
                  })
                );
              } else {
                alert("Please select a variant first");
              }
            }}
            disabled={!selectedVariantId}
            className={`px-6 py-3 my-6 w-full text-center rounded text-white font-semibold transition ${
              selectedVariantId
                ? "bg-primary hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
          <CareInfoAccordion />
        </section>
      </article>
    </main>
  );
};

export default ProductDetailPage;
