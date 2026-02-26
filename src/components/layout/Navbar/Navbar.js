import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faBagShopping,
  faBars
} from "@fortawesome/free-solid-svg-icons";

import CartSiderbar from "../CartSidebar/CartSidebar";
import Overlay from "../../ui/overlay/OverLay";
import NavTabs from "./Navtabs";
import BottomMobileNav from "./BottomMobileNav";
import SearchBar from "../../ui/searchBar/SearchBar";
import { useCart } from "../../../contaxt/CartContaxt";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../../config/firebase";
import { resolveAndSyncUserRole } from "../../../utils/userRole";

const sale = "We are running a sale - Get 20% off on all products!";
const auth = getAuth(app);

const SaleBanner = () => (
  <div className="sale-banner">
    <p>{sale}</p>
  </div>
);

export default function Navbar() {

  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAccountMenuOpen(false);

      if (!user) {
        setIsAdmin(false);
        return;
      }

      const role = await resolveAndSyncUserRole(user);
      setIsAdmin(role === "admin");
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Redirect to login or open account menu
  const handleAccount = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setIsAccountMenuOpen((prev) => !prev);
  };

  const handleAccountMenuNavigate = (path) => {
    setIsAccountMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAccountMenuOpen(false);
    navigate("/login");
  };

  const handleSearch = (value) => {
    const trimmedValue = value.trim();
    const targetPath = trimmedValue
      ? `/products?search=${encodeURIComponent(trimmedValue)}`
      : "/products";

    navigate(targetPath);
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <Overlay isOpen={navOpen} onClose={() => setNavOpen(false)} position="left" >
        <NavTabs navOpen={navOpen} onClose={() => setNavOpen(false)} />
      </Overlay>

      <div className="StickyTop">
        <SaleBanner />

        <div className="nav-bar">
          <div className="nav-container">

            {/* Hamburger */}
            <div className="nav-toggle">
              <FontAwesomeIcon
                icon={faBars}
                className="Nav-Toggle-Btn"
                onClick={() => setNavOpen(true)}
              />
            </div>

            {/* Nav Tabs Component */}
            <NavTabs navOpen={navOpen} onClose={() => setNavOpen(false)} />

            {/* Logo */}
            <div className="logo-container">
              <Link to="/" className="NavLink">
                <img src="/logo192.png" alt="logo" className="logo" />
              </Link>
            </div>

            {/* Right Icons */}
            <div className="nav-icons">

              <button
                className="NavLink search-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              <div className="account-menu-container" ref={accountMenuRef}>
                <button className="NavLink account-btn" onClick={handleAccount} aria-label="Account menu">
                  <FontAwesomeIcon icon={faUser} />
                  {/* {currentUser && <FontAwesomeIcon icon={faChevronDown} className="account-chevron" />} */}
                </button>

                {currentUser && isAccountMenuOpen && (
                  <div className="account-dropdown">
                    <button type="button" onClick={() => handleAccountMenuNavigate("/account/profile")}>
                      Profile
                    </button>
                    {isAdmin && (
                      <button type="button" onClick={() => handleAccountMenuNavigate("/admin/dashboard")}>
                        Admin Panel
                      </button>
                    )}
                    <button type="button" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                )}
              </div>


              <div className="cart-link NavLink">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  onClick={() => setIsCartOpen(true)}
                />
                {cartCount > 0 && (
                  <span className="cart-count">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <Overlay position="search" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
        <SearchBar
          autoFocus
          onSearch={handleSearch}
          onClose={() => setIsSearchOpen(false)}
        />
      </Overlay>

      {/* Bottom Mobile Navigation */}
      <BottomMobileNav onCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />

      {/* Cart Sidebar */}
      <Overlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} position="right" >
        <CartSiderbar
        isCartOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        />  
      </Overlay>
    </>
  );
}

