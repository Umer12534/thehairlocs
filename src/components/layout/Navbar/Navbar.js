import { useState } from "react";
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
import { getAuth } from "firebase/auth";
import { app } from "../../../firebase";

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
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Redirect to login or account page
  const handleAccount=()=>{
    if(auth.currentUser){
      navigate("/account");
    }
    else
      navigate("/login");
  }

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
                <img src="./logo192.png" alt="logo" className="logo" />
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

              <button className="NavLink account-btn" onClick={handleAccount}>
                <FontAwesomeIcon icon={faUser} />
              </button>


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

      <Overlay position="search" isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} children={SearchBar}>
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}/>
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
      {isSearchOpen && (
        <SearchBar
          autoFocus
          onSearch={(value) => console.log("Searching:", value)}
          className="navbar-search"
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}
