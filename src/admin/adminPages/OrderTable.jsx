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

const getStatusClassName = (status) => {
  const statusMap = {
    Pending: "pending",
    Processing: "processing",
    Shipped: "shipped",
    Delivered: "delivered",
    Cancelled: "cancelled",
  };

  return `status-badge ${statusMap[status] || "pending"}`;
};

export default function OrderTable({ orders, statusOptions, onViewOrder, onStatusChange, isDemo = false }) {
  return (
    <div className="order-table-wrapper">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id.slice(0, 8)}</td>
              <td>{order.customerName || "-"}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{formatAmount(order.totalAmount)}</td>
              <td>{order.paymentStatus || "-"}</td>
              <td>
                <span className={getStatusClassName(order.orderStatus)}>{order.orderStatus || "Pending"}</span>
              </td>
              <td>
                <div className="table-actions">
                  <button type="button" className="view-btn" onClick={() => onViewOrder(order)}>
                    View
                  </button>
                  <select
                    value={order.orderStatus || "Pending"}
                    onChange={(event) => onStatusChange(order.id, event.target.value)}
                    disabled={isDemo}
                    title={isDemo ? "Disabled in demo mode" : ""}
                    style={isDemo ? { opacity: 0.4, cursor: "not-allowed" } : {}}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" className="empty-state">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
