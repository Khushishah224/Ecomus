import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaShoppingCart, 
  FaBox, 
  FaChartLine, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt,
  FaUserCircle,
  FaGlobe,
  FaChevronDown,
  FaBars
} from 'react-icons/fa';
import '../styles/sidebar.css';
import {logout} from '../../api.js';

const Sidebar = () => {
  const [isFrontendOpen, setIsFrontendOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-header">
        <h1 className="admin-brand">ecomus</h1>
        <button className="admin-sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        <Link to="/admin/dashboard" className="admin-sidebar-link">
          <FaHome className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Dashboard</span>
        </Link>

        <div className="admin-sidebar-dropdown">
          <button 
            className="admin-sidebar-link"
            onClick={() => setIsFrontendOpen(!isFrontendOpen)}
          >
            <FaGlobe className="admin-sidebar-icon" />
            <span className="admin-sidebar-text">Frontend</span>
            <FaChevronDown className={`admin-dropdown-icon ${isFrontendOpen ? 'open' : ''}`} />
          </button>
          
          {isFrontendOpen && (
            <div className="admin-dropdown-menu">
              <Link to="/admin/banner" className="admin-dropdown-item">Hero Section</Link>
              <Link to="/admin/marquee" className="admin-dropdown-item">Marquee</Link>
              <Link to="/admin/categories" className="admin-dropdown-item">Shop by Categories</Link>
              <Link to="/admin/bestseller" className="admin-dropdown-item">Best Seller</Link>
              <Link to="/admin/shop-look" className="admin-dropdown-item">Shop the Look</Link>
              <Link to="/admin/shopgram" className="admin-dropdown-item">Shop gram</Link>
            </div>
          )}
        </div>

        <Link to="/admin/orders" className="admin-sidebar-link">
          <FaShoppingCart className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Orders</span>
        </Link>

        <Link to="/admin/products" className="admin-sidebar-link">
          <FaBox className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Products</span>
        </Link>

        <Link to="/admin/sales" className="admin-sidebar-link">
          <FaChartLine className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Sales</span>
        </Link>

        <Link to="/admin/users" className="admin-sidebar-link">
          <FaUsers className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Users</span>
        </Link>

        <Link to="/admin/profile" className="admin-sidebar-link">
          <FaUserCircle className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Profile</span>
        </Link>

        <Link to="/admin/settings" className="admin-sidebar-link">
          <FaCog className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Settings</span>
        </Link>

        <button onClick={handleLogout} className="admin-sidebar-link admin-logout-btn">
          <FaSignOutAlt className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Logout</span>
        </button>
      </nav>
    </div>
  );
};


export default Sidebar;