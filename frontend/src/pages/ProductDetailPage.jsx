// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductById,
//   clearSelectedProduct,
// } from "../features/products/productSlice";
// import { addToCart } from "../features/carts/cartSlice";

// const ProductDetailPage = () => {
//   const { id } = useParams(); // URL'den id parametresini alıyoruz
//   const dispatch = useDispatch();

//   const { selectedProduct, status, error } = useSelector(
//     (state) => state.products
//   );
//   const [selectedVariantId, setSelectedVariantId] = useState(null);
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductById(id));
//     }

//     return () => {
//       dispatch(clearSelectedProduct());
//     };
//   }, [dispatch, id]);
//   console.log(selectedProduct);

//   if (status === "loading") return <p>Loading product details...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!selectedProduct) return <p>Product not found.</p>;

//   return (
//     <div>
//       <h1>{selectedProduct.name}</h1>
//       <img
//         src={selectedProduct.image_url}
//         alt={selectedProduct.name}
//         className="w-1/4"
//       />
//       <p>{selectedProduct.description}</p>
//       <button
//         onClick={() =>
//           dispatch(addToCart({ product_variant_id: variant.id, quantity: 1 }))
//         }
//         className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
//       >
//         Add to Cart
//       </button>
//       {selectedProduct.product_variants.map((variant) => (
//         <div className="border-2">
//           <p>{variant.variant_name}</p>
//           <p>{variant.internal_pot_diameter}</p>
//           <p>{variant.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductDetailPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../features/products/productSlice";
import { addToCart } from "../features/carts/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const { selectedProduct, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedProduct) return <p>Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
      <img
        src={selectedProduct.image_url}
        alt={selectedProduct.name}
        className="w-1/3 rounded mb-6"
      />
      <p className="mb-6">{selectedProduct.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {selectedProduct.product_variants.map((variant) => (
          <div
            key={variant.id}
            onClick={() => setSelectedVariantId(variant.id)}
            className={`cursor-pointer border-2 rounded-lg p-4 shadow-sm transition hover:shadow-md ${
              selectedVariantId === variant.id
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            <h3 className="font-semibold">{variant.variant_name}</h3>
            <p className="text-sm text-gray-600">
              Pot diameter: {variant.internal_pot_diameter || "N/A"}
            </p>
            <p className="text-lg font-bold mt-2">£{variant.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          if (selectedVariantId) {
            dispatch(
              addToCart({ product_variant_id: selectedVariantId, quantity: 1 })
            );
          } else {
            alert("Please select a variant first");
          }
        }}
        disabled={!selectedVariantId}
        className={`px-6 py-3 rounded text-white font-semibold transition ${
          selectedVariantId
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
