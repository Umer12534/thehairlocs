import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faCog, faShop, faShoppingCart, faSignOut, faSignOutAlt, faTachometer, faTachometerAlt, faTag, faUser, faUserCircle, faUserShield } from "@fortawesome/free-solid-svg-icons";

export default function AdminSidebar() {
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

                <NavLink to="/logout" className="sidebar-link logout-link">
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                    <span>LogOut</span>
                </NavLink>
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