function OrderDetails({ order }) {
  if (!order || !order.items) return null;

  return (
    <div className="space-y-2">
      {order.items.map((item) => (
        <div key={item.order_item_id} className="border p-2 rounded">
          <p>Product: {item.product_name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: £{item.unit_price}</p>
          <p>Total Price: £{item.total_price}</p>
          <p>created date : {order.order.created_at}</p>
          <img
            src={item.image_url}
            className="w-20 h-20 object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
