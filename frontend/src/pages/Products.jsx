import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

function Products() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  console.log(items[0]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((product) => (
        <div key={product.id} className="border p-4">
          <h2>{product.name}</h2>
          <p>£{product.price}</p>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default Products;
