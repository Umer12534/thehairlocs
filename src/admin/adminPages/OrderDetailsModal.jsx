import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const formatDate = (value) => {
  if (!value) return "-";
  const date = value.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatAmount = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const InfoRow = ({ label, value }) => (
  <div className="order-modal-info-row">
    <span className="order-modal-info-label">{label}</span>
    <span className="order-modal-info-value">{value || "—"}</span>
  </div>
);

const SectionCard = ({ title, icon, children }) => (
  <div className="order-modal-section">
    <div className="order-modal-section-header">
      <span className="order-modal-section-icon">{icon}</span>
      <h3 className="order-modal-section-title">{title}</h3>
    </div>
    <div className="order-modal-section-body">{children}</div>
  </div>
);

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  const status = (order.orderStatus || "pending").toLowerCase();
  const subtotal = (order.items || []).reduce(
    (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
    0
  );

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="order-modal-header">
          <div className="order-modal-header-left">
            <span className="order-modal-id-badge">
              #{order.id?.slice(0, 8).toUpperCase() || "—"}
            </span>
            <div>
              <h2 className="order-modal-title">Order Details</h2>
              <p className="order-modal-date">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="order-modal-header-right">
            <span className={`modal-status-badge ${status}`}>
              {order.orderStatus || "Pending"}
            </span>
            <button type="button" className="close-btn" onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="order-modal-content">

          {/* Customer + Payment side by side */}
          <div className="order-modal-meta-grid">
            <SectionCard title="Customer" icon="👤">
              <InfoRow label="Name"    value={order.customerName} />
              <InfoRow label="Email"   value={order.email} />
              <InfoRow label="Phone"   value={order.phone} />
              <InfoRow label="Address" value={order.shippingAddress} />
            </SectionCard>

            <SectionCard title="Payment" icon="💳">
              <InfoRow label="Method"   value={order.paymentMethod} />
              <InfoRow label="Status"   value={order.paymentStatus} />
              <InfoRow label="Subtotal" value={formatAmount(subtotal)} />
              <InfoRow
                label="Total"
                value={
                  <span className="order-modal-total-value">
                    {formatAmount(order.totalAmount)}
                  </span>
                }
              />
            </SectionCard>
          </div>

          {/* Products */}
          <SectionCard title={`Items (${(order.items || []).length})`} icon="📦">
            {(order.items || []).length === 0 ? (
              <p className="modal-empty-products">
                No products found for this order.
              </p>
            ) : (
              <>
                <div className="modal-products">
                  {(order.items || []).map((item, index) => (
                    <article
                      key={`${item.productId || item.title}-${index}`}
                      className="modal-product"
                    >
                      <img src={item.image} alt={item.title || "Product"} />
                      <div>
                        <p className="modal-product-name">{item.title || "—"}</p>
                        <p className="modal-product-meta">
                          {formatAmount(item.price)} × {item.quantity || 0} units
                        </p>
                      </div>
                      <span className="modal-product-subtotal">
                        {formatAmount((item.price || 0) * (item.quantity || 0))}
                      </span>
                    </article>
                  ))}
                </div>

                <div className="modal-order-total">
                  <span className="modal-order-total-label">Order Total</span>
                  <span className="modal-order-total-amount">
                    {formatAmount(order.totalAmount)}
                  </span>
                </div>
              </>
            )}
          </SectionCard>

        </div>
      </div>
    </div>
  );
}