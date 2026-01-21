import React, { useState, useEffect, useRef } from 'react';
import './AdminNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Shop');

    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileMenuBtnRef = useRef(null);
    const userBtnRef = useRef(null);

    const tabs = [
        { id: 'shop', name: 'Shop', path: '/' },
        { id: 'Admin', name: 'Admin', path: '/admin/dashboard' }
    ];

    const dropdownItems = [
        { id: 'profile', name: 'Profile', path: '/account/profile' },
        { id: 'settings', name: 'Settings', path: '/account/settings' },
        { id: 'logout', name: 'Logout', path: '/logout', isLogout: true }
    ];

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const handleDropdownToggle = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMobileMenuToggle = (e) => {
        e.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            userBtnRef.current &&
            !userBtnRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }

        if (
            mobileMenuRef.current &&
            !mobileMenuRef.current.contains(event.target) &&
            mobileMenuBtnRef.current &&
            !mobileMenuBtnRef.current.contains(event.target)
        ) {
            setIsMobileMenuOpen(false);
        }
        };

        const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
            setIsDropdownOpen(false);
            setIsMobileMenuOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <nav className="navbar">

        {/* Mobile Menu Button */}
        <button
            ref={mobileMenuBtnRef}
            className="mobile-menu-btn"
            onClick={handleMobileMenuToggle}
        >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            <span>{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
        </button>

        {/* Mobile Tabs */}
        <div
            ref={mobileMenuRef}
            className={`mobile-tabs ${isMobileMenuOpen ? 'active' : ''}`}
        >
            {tabs.map(tab => (
            <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => handleTabClick(tab.name)}
            >
                {tab.name}
            </NavLink>
            ))}
        </div>

        {/* Desktop Tabs */}
        <div className="nav-left">
            {tabs.map(tab => (
            <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => handleTabClick(tab.name)}
            >
                {tab.name}
            </NavLink>
            ))}
        </div>

        {/* Center Logo */}
        <div className="nav-center">
            <img src="/logo192.png" alt="Logo" />
        </div>

        {/* User Dropdown */}
        <div className="nav-right">
            <div className="user-dropdown">
            <button
                ref={userBtnRef}
                className={`user-btn ${isDropdownOpen ? 'active' : ''}`}
                onClick={handleDropdownToggle}
            >
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon
                icon={faChevronDown}
                className={`downarrow ${isDropdownOpen ? 'active' : ''}`}
                />
            </button>

            <div
                ref={dropdownRef}
                className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}
            >
                {dropdownItems.map(item => (
                <NavLink
                    key={item.id}
                    to={item.path}
                    className={item.isLogout ? 'logout' : ''}
                    onClick={() => setIsDropdownOpen(false)}
                >
                    {item.name}
                </NavLink>
                ))}
            </div>
            </div>
        </div>

        {isDropdownOpen && (
            <div
            className="dropdown-overlay"
            onClick={() => setIsDropdownOpen(false)}
            />
        )}

        </nav>
    );
};

export default AdminNavbar;
