import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import MainLayout from './MainLayout';
import './AdminLayout.css'; // Reuse admin layout styles, adapt for account

const AccountLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (isChecking) {
    return (
      <MainLayout>
        <div className="loading-container">Loading account...</div>
      </MainLayout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { path: '/account/profile', label: 'Profile', icon: 'faUser' },
    { path: '/account/orders', label: 'Orders', icon: 'faReceipt' },
    { path: '/account/settings', label: 'Settings', icon: 'faCog' },
  ];

  const activePath = location.pathname;

  return (
    <MainLayout>
      <div className="admin-container account-container">
        {/* Sidebar */}
        <div className="admin-sidebar account-sidebar">
          <div className="sidebar-header">
            <h3>My Account</h3>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${activePath === item.path ? 'active' : ''}`}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="admin-main account-main">
          <div className="page-header">
            <h1>Account Dashboard</h1>
          </div>
          <div className="admin-content account-content">
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountLayout;

