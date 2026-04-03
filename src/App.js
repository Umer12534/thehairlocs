import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { CartProvider } from "./contaxt/CartContaxt";
import { FavoritesProvider } from "./contaxt/FavoritesContext";

import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";

// Pages
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Sale from "./pages/Sale";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Favorites from "./pages/Favorites";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Faqs from "./pages/Faqs";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
// import AccountLayout from "./components/layout/AccountLayout";
import UserOrders from "./user/userPages/UserOrders";
import AccountDetails from "./pages/AccountDetails";
import AccountSettings from "./pages/AccountSettings";
import Cart from "./pages/Cart";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import MangeProducts from "./pages/MangeProducts";
import MangeCategories from "./pages/MangeCategories";
import CategoryProducts from "./pages/CategoryProducts";
import AddProduct from "./pages/AddProduct";
import Add from "./pages/add";                // Temp Add products/categorye
import { auth } from "./config/firebase";
import { resolveAndSyncUserRole } from "./utils/userRole";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import AdminOrders from "./admin/adminPages/AdminOrders";
import AccountLayout from "./components/layout/AccountLayout";

function RequireAuth({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (isChecking) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsChecking(false);
        return;
      }

      const role = await resolveAndSyncUserRole(user);
      setIsAuthenticated(true);
      setIsAdmin(role === "admin");
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (isChecking) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
            {/*  Pages With Navbar & Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/about" element={<About />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/user/orders" element={<UserOrders />} />
              <Route path="/account/orders" element={<UserOrders />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/add" element={<Add />} />

            </Route>
            <Route>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            </Route>
          {/* Auth Pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Route>

          {/* User Account Pages */}
          <Route element={
            <RequireAuth>
              <AccountLayout />
            </RequireAuth>
          }>
            <Route path="/account" element={<Navigate to="/account/profile" replace />} />
            <Route path="/account/profile" element={<AccountDetails />} />
            <Route path="/account/orders" element={<UserOrders />} />
            <Route path="/account/settings" element={<AccountSettings />} />
          </Route>

          {/* Admin Panel */}
          <Route
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/mange-products" element={<MangeProducts />} /> 
            <Route path="/admin/addproducts" element={<AddProduct />} /> 
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/mange-categories" element={<MangeCategories />} />
            <Route path="/admin/mange-categories/:categoryName" element={<CategoryProducts />} />

            {/* <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Route>
        </Routes>
      </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
