import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
    return (
        <aside className="asidebar">
            <div className="sidebar-logo">
                <img src="/logo192.png" alt="logo" />
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/admin/dashboard" end className="sidebar-link">
                    Dashboard
                </NavLink>

                <NavLink to="/admin/mange-products" className="sidebar-link">
                    Products
                </NavLink>

                <NavLink to="/admin/orders" className="sidebar-link">
                    Orders
                </NavLink>

                <NavLink to="/admin/mange-categories" className="sidebar-link">
                    Categories
                </NavLink>

                <NavLink to="/admin/users" className="sidebar-link">
                    Users
                </NavLink>

                <NavLink to="/settings" className="sidebar-link">
                    Settings
                </NavLink>
            </nav>
        </aside>
    );
}
