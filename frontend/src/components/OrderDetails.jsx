function OrderDetails({ order }) {
  if (!order || !order.items) return null;

  return (
    <section
      aria-label="Order items"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {order.items.map((item) => (
        <article
          key={item.order_item_id}
          className="flex gap-3 items-start p-3 border rounded-lg shadow-sm"
        >
          <img
            src={item.image_url}
            alt={item.product_name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="space-y-1">
            <h3 className="text-sm font-medium">{item.product_name}</h3>
            <p className="text-sm text-gray-700">
              Unit price: £{item.unit_price}
            </p>
            <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
            <p className="text-sm text-gray-900 font-semibold">
              Total: £{item.total_price}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default OrderDetails;
