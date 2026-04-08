import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowTrendDown,
  faArrowTrendUp,
  faBell,
  faBox,
  faCartShopping,
  faChartLine,
  faCircleCheck,
  faEllipsisVertical,
  faExclamationTriangle,
  faLayerGroup,
  faTags,
  faUsers,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { db } from "../config/firebase";
import "../styles/admin.css";
import "../styles/Dashboard.css";

const CATEGORY_COLORS = ["#3498db", "#2ecc71", "#e67e22", "#2c3e50", "#e74c3c"];
const LOW_STOCK_THRESHOLD = 5;

// ── Stock status config ───────────────────────────────────────────────────────
// Thresholds for the color-coded status badge in the Top Products table.
// Change these numbers to adjust the breakpoints.
//   >= 100       → "In Stock"  (green)
//   50–99        → "Moderate"  (yellow)
//   15–49        → "Low"       (orange)
//   < 15         → "Critical"  (red)
const getStockStatus = (stock) => {
  if (stock >= 100) return { label: "In Stock",  color: "#2ecc71", cls: "good" };
  if (stock >= 50)  return { label: "Moderate",  color: "#f1c40f", cls: "moderate" };
  if (stock >= 15)  return { label: "Low",       color: "#e67e22", cls: "warn" };
  return             { label: "Critical",  color: "#e74c3c", cls: "danger" };
};
// ─────────────────────────────────────────────────────────────────────────────

const Skeleton = ({ className = "" }) => (
  <span className={`skeleton skeleton-value ${className}`} />
);

const formatCurrency = (value) => `$${Number(value || 0).toLocaleString()}`;

const StatCard = ({
  icon, label, value, trend, trendValue, accent, loading, to, helper,
}) => (
  <Link to={to} className={`stat-card ${accent || ""}`}>
    <div className="stat-card-header">
      <span className="stat-icon"><FontAwesomeIcon icon={icon} /></span>
      {trendValue !== undefined && !loading && (
        <span className={`trend-badge ${trend === "up" ? "trend-up" : "trend-down"}`}>
          <FontAwesomeIcon icon={trend === "up" ? faArrowTrendUp : faArrowTrendDown} />
          {trendValue}%
        </span>
      )}
    </div>
    {loading ? <Skeleton /> : <p className="value">{value}</p>}
    <h3>{label}</h3>
    <div className="stat-card-footer">
      <span>{helper}</span>
      <span className="stat-card-link">Open <FontAwesomeIcon icon={faArrowRight} /></span>
    </div>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStock: 0,
    orders: 0,
    users: 0,
    revenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [activeTab, setActiveTab] = useState("revenue");
  const [orderChartDataMonthly, setOrderChartDataMonthly] = useState([]);
  const [revenueChartData, setRevenueChartData] = useState([]);

  // ── ADDED: category stock table data ─────────────────────────────────────
  // Each entry: { category, totalStock } — one row per category from Firebase
  const [categoryStockData, setCategoryStockData] = useState([]);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsSnapshot, ordersSnapshot, usersSnapshot] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "users")),
        ]);

        const productData = productsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const orderData = ordersSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const userData = usersSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));


        // ── Category grouping for pie chart ───────────────────────────────
        const catMap = {};
        productData.forEach((product) => {
          const categoryName = product.category || "Uncategorized";
          catMap[categoryName] = (catMap[categoryName] || 0) + 1;
        });
        setCategoryData(
          Object.entries(catMap).map(([name, value]) => ({ name, value }))
        );

        // ── ADDED: category stock table ───────────────────────────────────
        // Groups ALL products by category and sums every size variant stock.
        // Result: one row per category with its total combined stock.
        // All categories stored in Firebase are included — none are skipped.
        const catStockMap = {};

        productData.forEach((product) => {
          const categoryName = product.category || "Uncategorized";
          const sizes = product.sizes || {};

          // Sum stock across all sizes (50ml + 100ml + 150ml) for this product
          const productStock = Object.values(sizes).reduce(
            (sum, sizeData) => sum + Number(sizeData?.stock || 0), 0
          );

          if (!catStockMap[categoryName]) {
            catStockMap[categoryName] = 0;
          }
          catStockMap[categoryName] += productStock;
        });

        // Convert to array and sort by highest stock first
        const catStockArray = Object.entries(catStockMap)
          .map(([category, totalStock]) => ({ category, totalStock }))
          .sort((a, b) => b.totalStock - a.totalStock);

        setCategoryStockData(catStockArray);
        // ── END ADDED category stock table ────────────────────────────────

        // ── Low Stock Alerts ──────────────────────────────────────────────
        const lowStock = productData
          .flatMap((product) => {
            const sizes = product.sizes || {};
            return Object.entries(sizes)
              .filter(([, sizeData]) => {
                const stock = Number(sizeData?.stock ?? 0);
                return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
              })
              .map(([size, sizeData]) => ({
                id: product.id,
                name: product.name || "Unnamed Product",
                category: product.category || "—",
                size,
                stock: Number(sizeData.stock),
                price: Number(sizeData.price ?? 0),
              }));
          })
          .sort((a, b) => a.stock - b.stock)
          .slice(0, 6);

        setLowStockItems(lowStock);

        // ── Monthly order bar chart ───────────────────────────────────────
        const monthLabels = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        const monthCounts = {
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
          Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
        };

        orderData.forEach((order) => {
          const raw = order.createdAt;
          let date = null;
          if (raw?.toDate)       date = raw.toDate();
          else if (raw?.seconds) date = new Date(raw.seconds * 1000);
          else if (raw)          date = new Date(raw);
          if (date && !isNaN(date.getTime())) {
            monthCounts[monthLabels[date.getMonth()]] += 1;
          }
        });

        setOrderChartDataMonthly(
          monthLabels.map((month) => ({ month, orders: monthCounts[month] }))
        );

        // ── Monthly revenue line chart ────────────────────────────────────
        const monthRevenue = {
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
          Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
        };

        orderData.forEach((order) => {
          if (order.orderStatus !== "Delivered") return;
          const raw = order.createdAt;
          let date = null;
          if (raw?.toDate)       date = raw.toDate();
          else if (raw?.seconds) date = new Date(raw.seconds * 1000);
          else if (raw)          date = new Date(raw);
          if (date && !isNaN(date.getTime())) {
            monthRevenue[monthLabels[date.getMonth()]] += Number(order.totalAmount || 0);
          }
        });

        setRevenueChartData(
          monthLabels.map((month) => ({ month, revenue: monthRevenue[month] }))
        );

        // ── Stats totals ──────────────────────────────────────────────────
        const deliveredOrders = orderData.filter((o) => o.orderStatus === "Delivered");
        const pendingOrders   = orderData.filter((o) => o.orderStatus === "Pending");
        const totalRevenue    = deliveredOrders.reduce(
          (sum, o) => sum + Number(o.totalAmount || 0), 0
        );
        const totalStock = productData.reduce((sum, product) => {
          const sizes = product.sizes || {};
          return sum + Object.values(sizes).reduce(
            (s, sizeData) => s + Number(sizeData?.stock || 0), 0
          );
        }, 0);

        setStats({
          totalProducts: productData.length,
          totalCategories: Object.keys(catMap).length,
          totalStock,
          orders: orderData.length,
          users: userData.length,
          revenue: totalRevenue,
          pendingOrders: pendingOrders.length,
          deliveredOrders: deliveredOrders.length,
        });

      } catch (loadError) {
        console.error(loadError);
        setError("Dashboard data could not be loaded completely.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const statCards = useMemo(
    () => [
      {
        icon: faBox, label: "Total Products", value: stats.totalProducts,
        trend: "up", trendValue: 12, accent: "", to: "/admin/mange-products", helper: "Manage inventory",
      },
      {
        icon: faTags, label: "Categories", value: stats.totalCategories,
        trend: "up", trendValue: 5, accent: "blue", to: "/admin/mange-categories", helper: "Organize catalog",
      },
      {
        icon: faWarehouse, label: "Total Stock", value: stats.totalStock.toLocaleString(),
        trend: "down", trendValue: 3, accent: "orange", to: "/admin/mange-products", helper: "Review stock levels",
      },
      {
        icon: faChartLine, label: "Revenue", value: formatCurrency(stats.revenue),
        trend: "up", trendValue: 22, accent: "green", to: "/admin/orders", helper: "Open revenue orders",
      },
    ],
    [stats]
  );

  const quickActions = [
    { title: "Revenue", description: "Open delivered orders and track the income driving this month.", to: "/admin/orders" },
    { title: "Orders",  description: "Review order flow, payment status, and pending shipments.",      to: "/admin/orders" },
    { title: "Users",   description: "Check registered accounts, roles, and recent signups.",          to: "/admin/users" },
    { title: "Products",description: "Update catalog items, stock counts, and category placement.",    to: "/admin/mange-products" },
  ];

  const dashboardHealth = [
    { label: "Pending orders",   value: loading ? "..." : stats.pendingOrders },
    { label: "Delivered orders", value: loading ? "..." : stats.deliveredOrders },
    { label: "Registered users", value: loading ? "..." : stats.users },
  ];

  const adminLinks = [
    { label: "Open orders",     to: "/admin/orders",           icon: faCartShopping },
    { label: "Open users",      to: "/admin/users",            icon: faUsers },
    { label: "Open categories", to: "/admin/mange-categories", icon: faLayerGroup },
  ];

  const activityItems = [
    { text: `${stats.orders} orders currently tracked`,             time: "Live from orders collection",    dot: "green" },
    { text: `${stats.users} registered users in the database`,      time: "Live from users collection",     dot: "blue" },
    { text: `${lowStockItems.length} low-stock variants need attention`, time: "Live inventory signal",     dot: "orange" },
    { text: `${stats.totalCategories} categories are active`,       time: "Built from products collection", dot: "purple" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-hero">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            A cleaner overview for revenue, inventory, customer accounts, and the
            operational areas you need most often.
          </p>
          <div className="dashboard-hero-stats">
            <div className="dashboard-hero-stat">
              <span>Total Revenue</span>
              <strong>{loading ? "..." : formatCurrency(stats.revenue)}</strong>
            </div>
            <div className="dashboard-hero-stat">
              <span>Orders</span>
              <strong>{loading ? "..." : stats.orders}</strong>
            </div>
            <div className="dashboard-hero-stat">
              <span>Users</span>
              <strong>{loading ? "..." : stats.users}</strong>
            </div>
          </div>
        </div>

        <aside className="dashboard-side-panel">
          <p className="dashboard-panel-label">Today</p>
          <p className="dashboard-panel-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric",
            })}
          </p>
          <ul className="dashboard-health-list">
            {dashboardHealth.map((item) => (
              <li key={item.label}>
                <span className="dashboard-health-label">{item.label}</span>
                <span className="dashboard-health-value">{item.value}</span>
              </li>
            ))}
          </ul>
          <ul className="dashboard-link-list">
            {adminLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>
                  <span><FontAwesomeIcon icon={item.icon} /> {item.label}</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {error && (
        <div className="users-summary-card" style={{ marginBottom: 24 }}>
          <span>{error}</span>
          <strong><FontAwesomeIcon icon={faBell} /></strong>
        </div>
      )}

      <div className="stats-cards">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} loading={loading} />
        ))}
      </div>

      <div className="dashboard-actions-grid">
        {quickActions.map((action) => (
          <div key={action.title} className="dashboard-action-card">
            <h3>{action.title}</h3>
            <p>{action.description}</p>
            <Link to={action.to} className="dashboard-action-link">
              Go to {action.title.toLowerCase()} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card wide">
          <div className="chart-card-header">
            <div>
              <div className="chart-tabs">
                {["revenue", "orders"].map((tab) => (
                  <button
                    key={tab} type="button"
                    className={`chart-tab ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <p className="chart-card-note">
                Switch between revenue growth and order volume without leaving the dashboard.
              </p>
            </div>
            <button className="icon-btn sm" type="button" aria-label="More chart options">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>

          {loading ? (
            <div className="chart-skeleton skeleton" />
          ) : activeTab === "revenue" ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 152, 219, 0.12)" />
                <XAxis dataKey="month" tick={{ fill: "#718096", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#718096", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, color: "#2c3e50" }} />
                <Line type="monotone" dataKey="revenue" stroke="#3498db" strokeWidth={3} dot={{ r: 4, fill: "#3498db" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={orderChartDataMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 152, 219, 0.12)" />
                <XAxis dataKey="month" tick={{ fill: "#718096", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#718096", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, color: "#2c3e50" }} />
                <Bar dataKey="orders" fill="#3498db" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3>By Category</h3>
              <p className="chart-card-note">Products grouped by active category.</p>
            </div>
          </div>
          {loading ? (
            <div className="chart-skeleton skeleton" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, color: "#2c3e50" }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#718096" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bottom-row">

        {/*
        ── Stock by Category table ───────────────────────────────────────────
        Shows every category from Firebase.
        Stock = total of all products × all size variants in that category.
        Status badge color rules:
          green  → stock >= 100  "In Stock"
          yellow → stock 50–99   "Moderate"
          orange → stock 15–49   "Low"
          red    → stock < 15    "Critical"
        ─────────────────────────────────────────────────────────────────────
        */}
        <div className="table-card">
          <div className="chart-card-header">
            <div>
              <h3>Stock by Category</h3>
              <p className="chart-card-note">
                Total stock across all products and sizes per category.
              </p>
            </div>
            <Link to="/admin/mange-categories" className="dashboard-action-link">
              View categories <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {loading ? (
            <ul>
              {[...Array(5)].map((_, index) => (
                <li key={index} className="skeleton-text small skeleton" style={{ marginBottom: 10 }} />
              ))}
            </ul>
          ) : categoryStockData.length === 0 ? (
            <div className="empty-state">
              <FontAwesomeIcon icon={faBox} />
              <p>No categories found.</p>
            </div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {categoryStockData.map((row, index) => {
                  const status = getStockStatus(row.totalStock);
                  return (
                    <tr key={row.category}>
                      <td className="rank">{index + 1}</td>
                      <td>
                        <span className="category-chip">{row.category}</span>
                      </td>
                      <td className="stock-val">{row.totalStock.toLocaleString()}</td>
                      <td>
                        {/*
                          Status badge — color comes from getStockStatus():
                          >= 100  green   "In Stock"
                          50-99   yellow  "Moderate"
                          15-49   orange  "Low"
                          < 15    red     "Critical"
                        */}
                        <span
                          className={`status-badge ${status.cls}`}
                          style={{ color: status.color, borderColor: status.color }}
                        >
                          <FontAwesomeIcon
                            icon={status.cls === "good" || status.cls === "moderate"
                              ? faCircleCheck
                              : faExclamationTriangle}
                          />
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Low Stock Alerts ─────────────────────────────────────────────
            Individual size variants where stock > 0 and stock <= 5.
            Sorted by lowest stock first (most critical at top).
        ──────────────────────────────────────────────────────────────────── */}
        <div className="alerts-card">
          <div className="chart-card-header">
            <h3>
              <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: "#e67e22", marginRight: 6 }} />
              Low Stock Alerts
            </h3>
            <span className="alert-count">{lowStockItems.length}</span>
          </div>
          {loading ? (
            <ul>
              {[...Array(4)].map((_, index) => (
                <li key={index} className="skeleton-text small skeleton" style={{ marginBottom: 10 }} />
              ))}
            </ul>
          ) : lowStockItems.length === 0 ? (
            <div className="empty-state">
              <FontAwesomeIcon icon={faCircleCheck} />
              <p>All items are well stocked.</p>
            </div>
          ) : (
            <ul className="alert-list">
              {lowStockItems.map((item, index) => (
                <li key={`${item.id}-${item.size}-${index}`} className="alert-item">
                  <div className="alert-info">
                    <span className="alert-name">{item.name}</span>
                    <span className="alert-size">
                      {item.size}{item.price > 0 ? ` · ${formatCurrency(item.price)}` : ""}
                    </span>
                  </div>
                  <span className={`stock-pill ${item.stock <= 2 ? "danger" : "warn"}`}>
                    {item.stock} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="activity-card">
          <div className="chart-card-header">
            <div>
              <h3>Operational Highlights</h3>
              <p className="chart-card-note">
                Key admin fields linked from current collection totals.
              </p>
            </div>
          </div>
          {loading ? (
            <ul>
              {[...Array(4)].map((_, index) => (
                <li key={index} className="skeleton-text small skeleton" style={{ marginBottom: 10 }} />
              ))}
            </ul>
          ) : (
            <ul className="activity-list">
              {activityItems.map((item, index) => (
                <li key={index} className="activity-item">
                  <span className={`activity-dot ${item.dot}`} />
                  <div>
                    <p className="activity-text">{item.text}</p>
                    <span className="activity-time">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
