import { Link } from "react-router-dom";

const ProductCard = ({ product, isPopular }) => {
  return (
    <article
      className="relative border border-terracotta rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
      tabIndex={0} // Keyboard erişimi için (isteğe bağlı)
    >
      {isPopular && (
        <span
          className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold text-white px-2 py-1 rounded shadow-md z-10"
          aria-label="Popular product badge"
          role="note"
        >
          Popular
        </span>
      )}
      <Link
        to={`/products/${product.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-green-600 rounded"
      >
        <img
          src={product.image_url}
          alt={`Image of ${product.name}`}
          className="w-full h-48 object-cover rounded"
          loading="lazy"
        />
        <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-500">{product.family}</p>
        <p className="font-semibold mt-1">
          From £{parseFloat(product.min_price)?.toFixed(2) || "N/A"}
        </p>
      </Link>
    </article>
  );
};

export default ProductCard;
