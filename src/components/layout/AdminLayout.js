import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../sections/adminSidebar/AdminSidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
    return (
        <>
        <div className="admin-layout">

            {/* Sidebar */}
            <div className="admin-sidebar">
                <AdminSidebar />    
            </div>

            {/* Page Content */}
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
        </>
    );
};

export default AdminLayout;
