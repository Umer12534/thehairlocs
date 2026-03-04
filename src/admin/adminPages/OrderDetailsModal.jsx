const formatDate = (value) => {
  if (!value) return "-";
  const date = value.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};

const formatAmount = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(
    Number(value || 0)
  );

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(event) => event.stopPropagation()}>
        <div className="order-modal-header">
          <h2>Order #{order.id.slice(0, 8)}</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="order-modal-content">
          <section>
            <h3>Customer Info</h3>
            <p>
              <strong>Name:</strong> {order.customerName || "-"}
            </p>
            <p>
              <strong>Email:</strong> {order.email || "-"}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone || "-"}
            </p>
            <p>
              <strong>Shipping Address:</strong> {order.shippingAddress || "-"}
            </p>
          </section>

          <section>
            <h3>Products</h3>
            <div className="modal-products">
              {(order.items || []).map((item, index) => (
                <article key={`${item.productId || item.title}-${index}`} className="modal-product">
                  <img src={item.image} alt={item.title || "Product"} />
                  <div>
                    <p>{item.title || "-"}</p>
                    <p>Qty: {item.quantity || 0}</p>
                    <p>Price: {formatAmount(item.price)}</p>
                    <p>Subtotal: {formatAmount((item.price || 0) * (item.quantity || 0))}</p>
                  </div>
                </article>
              ))}
              {(order.items || []).length === 0 && <p>No products found for this order.</p>}
            </div>
          </section>

          <section>
            <h3>Order Info</h3>
            <p>
              <strong>Total Amount:</strong> {formatAmount(order.totalAmount)}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod || "-"}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus || "-"}
            </p>
            <p>
              <strong>Order Status:</strong> {order.orderStatus || "-"}
            </p>
            <p>
              <strong>Order Date:</strong> {formatDate(order.createdAt)}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
