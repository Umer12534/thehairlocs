import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faFacebookF, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const NavTabs = ({ navOpen, onClose }) => {
  return (
    <ul className={`nav-tabs ${navOpen ? "active" : ""}`}>

      <div className="nav-header">
        <li>
          <h2>
            Menu 
          </h2>
        </li>
        {/* Close Button */}
        <li className="nav-close" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </li>
      </div>
      

      {/* Home */}
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}
          onClick={onClose}
        >
          Home
        </NavLink>
      </li>

      {/* Product */}
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}
          onClick={onClose}
        >
          Product
        </NavLink>
      </li>

      {/* Categories */}
      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}

          onClick={onClose}
        >
          Categories
        </NavLink>
      </li>

      {/* Sale */}
      <li>
        <NavLink
          to="/sale"
          className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}
          onClick={onClose}
        >
          Sale
        </NavLink>
      </li>

      {/* Contact */}
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}
          onClick={onClose}
        >
          Contact
        </NavLink>
      </li>

      {/* Side Icons */}
      <div className="side-nav-icon">
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
        <FontAwesomeIcon icon={faInstagram} size="lg" />
        <FontAwesomeIcon icon={faFacebook} size="lg" />
        {/* <FontAwesomeIcon icon={faUser} size="lg" /> */}
      </div>


    </ul>

  );
};

export default NavTabs;
