import { useEffect, useMemo, useState } from "react";
import { collection, doc, getDoc, onSnapshot, orderBy, query, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ToastMessage from "../../components/ui/toastMessage/ToastMessage";
import OrderSummaryCards from "./OrderSummaryCards";
import OrderFilters from "./OrderFilters";
import OrderTable from "./OrderTable";
import OrderDetailsModal from "./OrderDetailsModal";
import "./AdminOrders.css";

const ORDER_STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const PAYMENT_STATUS_OPTIONS = ["Paid", "Unpaid"];

const normalizeOrder = (snapshotDoc) => ({
  id: snapshotDoc.id,
  ...snapshotDoc.data(),
});

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [toast, setToast] = useState({ type: "success", message: "" });

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const nextOrders = snapshot.docs.map(normalizeOrder);
        setOrders(nextOrders);
      },
      () => {
        setToast({ type: "error", message: "Failed to load orders." });
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const queryText = searchQuery.trim().toLowerCase();
    const nextFilteredOrders = orders.filter((order) => {
      const bySearch =
        queryText.length === 0 ||
        order.id.toLowerCase().includes(queryText) ||
        (order.customerName || "").toLowerCase().includes(queryText);
      const byStatus = statusFilter === "All" || order.orderStatus === statusFilter;
      const byPayment = paymentFilter === "All" || order.paymentStatus === paymentFilter;

      return bySearch && byStatus && byPayment;
    });

    setFilteredOrders(nextFilteredOrders);
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  const summary = useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((order) => order.orderStatus === "Pending").length;
    const deliveredOrders = orders.filter((order) => order.orderStatus === "Delivered").length;
    const totalRevenue = orders
      .filter((order) => order.orderStatus === "Delivered")
      .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

    return { totalOrders, pendingOrders, deliveredOrders, totalRevenue };
  }, [orders]);

  const handleStatusChange = async (orderId, nextStatus) => {
    try {
      // If cancelling, restore stock for each item in the order
      if (nextStatus === "Cancelled") {
        const orderSnap = await getDoc(doc(db, "orders", orderId));
        if (orderSnap.exists()) {
          const { items = [], orderStatus: currentStatus } = orderSnap.data();

          // Only restore stock if the order wasn't already cancelled
          if (currentStatus !== "Cancelled") {
            await Promise.all(
              items.map(async (item) => {
                if (!item.productId || !item.size) return;
                const productRef = doc(db, "products", item.productId);
                try {
                  await runTransaction(db, async (transaction) => {
                    const productSnap = await transaction.get(productRef);
                    if (!productSnap.exists()) return;
                    const sizes = productSnap.data().sizes || {};
                    const sizeData = sizes[item.size];
                    if (!sizeData) return;
                    const currentStock = Number(sizeData.stock) || 0;
                    const qty          = Number(item.quantity) || 1;
                    transaction.update(productRef, {
                      [`sizes.${item.size}.stock`]: currentStock + qty,
                    });
                  });
                } catch (stockErr) {
                  console.error(`Stock restore failed for product ${item.productId}:`, stockErr);
                }
              })
            );
          }
        }
      }

      await updateDoc(doc(db, "orders", orderId), { orderStatus: nextStatus });
      setToast({ type: "success", message: "Order status updated." });
    } catch (error) {
      setToast({ type: "error", message: "Failed to update status." });
    }
  };

  return (
    <section className="admin-orders-page">
      <div className="admin-orders-header">
        <h1>Admin Orders</h1>
      </div>

      <OrderSummaryCards summary={summary} />

      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        paymentFilter={paymentFilter}
        onPaymentFilterChange={setPaymentFilter}
        statusOptions={ORDER_STATUS_OPTIONS}
        paymentOptions={PAYMENT_STATUS_OPTIONS}
      />

      <OrderTable
        orders={filteredOrders}
        statusOptions={ORDER_STATUS_OPTIONS}
        onViewOrder={setSelectedOrder}
        onStatusChange={handleStatusChange}
      />

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />

      <ToastMessage
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, message: "" }))}
      />
    </section>
  );
}
