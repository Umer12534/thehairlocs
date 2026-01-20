import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
    return (
        <aside className="asidebar">
            <div className="sidebar-logo">
                <img src="/logo192.png" alt="logo" />
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end className="sidebar-link">
                    Dashboard
                </NavLink>

                <NavLink to="/products" className="sidebar-link">
                    Products
                </NavLink>

                <NavLink to="/orders" className="sidebar-link">
                    Orders
                </NavLink>

                <NavLink to="/categories" className="sidebar-link">
                    Categories
                </NavLink>

                <NavLink to="/users" className="sidebar-link">
                    Users
                </NavLink>

                <NavLink to="/settings" className="sidebar-link">
                    Settings
                </NavLink>
            </nav>
        </aside>
    );
}
