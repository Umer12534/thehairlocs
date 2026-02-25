import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faCog, faShop, faShoppingCart, faSignOutAlt, faTachometerAlt, faTag, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";

export default function AdminSidebar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } finally {
            navigate("/login");
        }
    };

    return (
        <aside className="asidebar">
            <div className="sidebar-logo">
                <img src="/logo192.png" alt="logo" />
                <h2 className="sidebar-title">Admin Panel</h2>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end className="sidebar-link">
                    <FontAwesomeIcon icon={faShop}/>
                    <span>Shop</span>
                </NavLink>

                <NavLink to="/admin/dashboard" end className="sidebar-link">
                    <FontAwesomeIcon icon={faTachometerAlt}/>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/mange-products" className="sidebar-link">
                    <FontAwesomeIcon icon={faBoxOpen}/>
                    <span>Products</span>
                </NavLink>

                <NavLink to="/admin/orders" className="sidebar-link">
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <span>Orders</span>
                </NavLink>

                <NavLink to="/admin/mange-categories" className="sidebar-link">
                    <FontAwesomeIcon icon={faTag}/>
                    <span>Categories</span>
                </NavLink>

                <NavLink to="/admin/users" className="sidebar-link">
                    <FontAwesomeIcon icon={faUser}/>
                    <span>Users</span>
                </NavLink>

                <NavLink to="/admin/settings" className="sidebar-link">
                    <FontAwesomeIcon icon={faCog}/>
                    <span>Settings</span>
                </NavLink>

                <button type="button" className="sidebar-link logout-link sidebar-button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                    <span>LogOut</span>
                </button>
            </nav>
            
            <div className="sidebar-footer">
                <div className="user-info">
                    <FontAwesomeIcon icon={faUserShield}/>
                    <span>Admin User</span>
                </div>
            </div>
        </aside>
    );
}
