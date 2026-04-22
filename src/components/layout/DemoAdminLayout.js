import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../sections/adminSidebar/AdminSidebar";
import DemoAdminContext from "../../contaxt/DemoAdminContext";
import "./AdminLayout.css";
import "./DemoAdminLayout.css";

const DemoAdminLayout = () => {
    const [popupDismissed, setPopupDismissed] = useState(false);
    const navigate = useNavigate();

    return (
        <DemoAdminContext.Provider value={true}>
            {/* Demo Mode Popup */}
            {!popupDismissed && (
                <div className="demo-popup-overlay">
                    <div className="demo-popup">
                        <div className="demo-popup-icon">👁️</div>
                        <h2 className="demo-popup-title">Demo Admin Panel</h2>
                        <p className="demo-popup-message">
                            You are viewing the Admin Panel in <strong>read-only demo mode</strong>.
                            You can browse all pages and see the data, but you <strong>cannot add, edit, or delete</strong> anything.
                        </p>
                        <div className="demo-popup-actions">
                            <button
                                className="demo-popup-btn demo-popup-btn--primary"
                                onClick={() => setPopupDismissed(true)}
                            >
                                Got it, let me explore!
                            </button>
                            <button
                                className="demo-popup-btn demo-popup-btn--secondary"
                                onClick={() => navigate("/")}
                            >
                                Go back to Shop
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-layout">
                {/* Sidebar */}
                <div className="admin-sidebar">
                    <AdminSidebar isDemo={true} />
                </div>

                {/* Page Content */}
                <main className="admin-main">
                    {/* Demo mode top banner */}
                    <div className="demo-top-banner">
                        <span className="demo-top-banner-icon">🔒</span>
                        <span>
                            <strong>Demo Mode</strong> — You can only view data. Add, edit, and delete actions are disabled.
                        </span>
                    </div>
                    <Outlet />
                </main>
            </div>
        </DemoAdminContext.Provider>
    );
};

export default DemoAdminLayout;
