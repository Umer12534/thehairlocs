import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NavTabs = ({ navOpen, onClose }) => {
  return (
    <ul className={`nav-tabs ${navOpen ? "active" : ""}`}>
      <li className="nav-close" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </li>

      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/product" className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}>
          Product
        </NavLink>
      </li>

      <li>
        <NavLink to="/Categories" className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}>
          Categories
        </NavLink>
      </li>

      <li>
        <NavLink to="/Sale" className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}>
          Sale
        </NavLink>
      </li>

      <li>
        <NavLink to="/Contact" className={({ isActive }) => isActive ? "NavLink Active" : "NavLink"}>
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default NavTabs;
