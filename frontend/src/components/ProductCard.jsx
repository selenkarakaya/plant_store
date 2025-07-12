import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
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
    </div>
  );
};

export default ProductCard;
