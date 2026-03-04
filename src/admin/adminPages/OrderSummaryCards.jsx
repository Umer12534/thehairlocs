const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(
    Number(amount || 0)
  );

export default function OrderSummaryCards({ summary }) {
  const cards = [
    { label: "Total Orders", value: summary.totalOrders },
    { label: "Pending Orders", value: summary.pendingOrders },
    { label: "Delivered Orders", value: summary.deliveredOrders },
    { label: "Total Revenue", value: formatCurrency(summary.totalRevenue) },
  ];

  return (
    <div className="order-summary-grid">
      {cards.map((card) => (
        <article key={card.label} className="order-summary-card">
          <span className="summary-label">{card.label}</span>
          <strong className="summary-value">{card.value}</strong>
        </article>
      ))}
    </div>
  );
}
