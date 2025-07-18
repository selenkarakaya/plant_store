import { Link } from "react-router-dom";

const ProductCard = ({ product, isPopular }) => {
  return (
    <article className="relative border border-terracotta rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
      {isPopular && (
        <span
          className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold text-white px-2 py-1 rounded shadow-md z-10"
          aria-label="Popular product"
          role="note"
        >
          Popular
        </span>
      )}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.family}</p>
        <p>From £{parseFloat(product.min_price)?.toFixed(2) || "N/A"}</p>
      </Link>
    </article>
  );
};

export default ProductCard;
