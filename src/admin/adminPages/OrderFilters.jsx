export default function OrderFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentFilter,
  onPaymentFilterChange,
  statusOptions,
  paymentOptions,
}) {
  return (
    <div className="order-filters">
      <input
        type="text"
        placeholder="Search by Order ID or customer name"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}>
        <option value="All">All Order Status</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select value={paymentFilter} onChange={(event) => onPaymentFilterChange(event.target.value)}>
        <option value="All">All Payment Status</option>
        {paymentOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
