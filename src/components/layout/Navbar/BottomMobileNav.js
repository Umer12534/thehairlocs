import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTags,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./Navbar.css";

const BottomMobileNav = ({ onCartOpen, isCartOpen }) => {
  return (
    <div className="mobile-bottom-nav">
      <Link to="/" className="nav-item">
        <FontAwesomeIcon icon={faHouse} className="iCon" />
        <span>Home</span>
      </Link>

      <Link to="/sale" className="nav-item">
        <FontAwesomeIcon icon={faTags} className="iCon" />
        <span>Sale</span>
      </Link>

      <Link to="/" className="nav-item">
        <FontAwesomeIcon icon={faWhatsapp} className="iCon whatsapp" />
        <span>Chat</span>
      </Link>

      <button className="nav-item cart-btn" onClick={()=>{
        isCartOpen? onCartOpen(false) : onCartOpen(true)
        }} >
        <FontAwesomeIcon icon={faCartShopping} className="iCon" />
        <span>Cart</span>
      </button>
    </div>
  );
};

export default BottomMobileNav;
