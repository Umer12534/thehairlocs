import { useEffect, useRef, useState } from "react";
import "./AccountNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faChevronDown,
    faBars,
    faUserCircle,
    faCog,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

function AccountNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth > 576) {
            setIsMobileMenuOpen(false);
        }
        setIsDropdownOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleAction = (type) => {
        setIsDropdownOpen(false);
        if (type === "profile") alert("Opening profile page...");
        if (type === "settings") alert("Opening settings page...");
        if (type === "logout") alert("Signing out...");
    };

    return (
        <nav className="navbar">
        <div className="nav-container">
            {/* Left */}
            <div className="nav-left">
            <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className={`nav-tabs ${isMobileMenuOpen ? "open" : ""}`}>
                <a href="#" className="tab">Shop</a>
                <a href="#" className="tab">Orders</a>
            </div>
            </div>

            {/* Center */}
            <div className="nav-center">
                <img src="/logo192.png" alt="logo" />
            </div>

            {/* Right */}
            <div className="nav-right" ref={dropdownRef}>
            <div
                className="account-dropdown"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className="user-icon">
                <FontAwesomeIcon icon={faUser} />
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
            </div>

            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <div className="dropdown-header">
                <div className="user-icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="user-email">user@example.com</div>
                </div>

                <div className="dropdown-divider" />

                <button
                className="dropdown-item"
                onClick={() => handleAction("profile")}
                >
                <FontAwesomeIcon icon={faUserCircle} />
                <span>Profile</span>
                </button>

                <button
                className="dropdown-item"
                onClick={() => handleAction("settings")}
                >
                <FontAwesomeIcon icon={faCog} />
                <span>Settings</span>
                </button>

                <div className="dropdown-divider" />

                <button
                className="dropdown-item sign-out"
                onClick={() => handleAction("logout")}
                >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Sign Out</span>
                </button>
            </div>
            </div>
        </div>
        </nav>
    );
}

export default AccountNavbar;
