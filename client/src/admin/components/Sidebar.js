import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, FaShoppingCart, FaBox, FaChartLine, FaUsers, FaCog, 
  FaSignOutAlt, FaUserCircle, FaGlobe, FaChevronDown, FaBars 
} from 'react-icons/fa';
import '../styles/sidebar.css';
import ShopGram from '../../components/shopping/ShopGram.js';
import { logout } from '../../api.js';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load dropdown states from localStorage or default to closed
  const [dropdowns, setDropdowns] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarDropdowns")) || {
      frontend: false,
      products: false,
    };
  });

  useEffect(() => {
    // Save dropdown state to localStorage
    localStorage.setItem("sidebarDropdowns", JSON.stringify(dropdowns));
  }, [dropdowns]);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h1 className="admin-brand">ecomus</h1>
        <button className="admin-sidebar-toggle">
          <FaBars />
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        <Link to="/admin/dashboard" className="admin-sidebar-link">
          <FaHome className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Dashboard</span>
        </Link>

        {/* Frontend Dropdown */}
        <div className="admin-sidebar-dropdown">
          <button 
            className="admin-sidebar-link"
            onClick={() => toggleDropdown("frontend")}
          >
            <FaGlobe className="admin-sidebar-icon" />
            <span className="admin-sidebar-text">Frontend</span>
            <FaChevronDown className={`admin-dropdown-icon ${dropdowns.frontend ? 'open' : ''}`} />
          </button>
          
          {dropdowns.frontend && (
            <div className="admin-dropdown-menu">
               <Link to="/admin/Header" className="admin-dropdown-item">Header</Link>
              <Link to="/admin/banner" className="admin-dropdown-item">Hero Section</Link>
              <Link to="/admin/marquee" className="admin-dropdown-item">Marquee</Link>
              <Link to="/admin/color-master" className="admin-dropdown-item">Color Master</Link>
              <Link to="/admin/size-master" className="admin-dropdown-item">size Master</Link>
              <Link to="/admin/shopcategories" className="admin-dropdown-item">Shop by Categories</Link>
              {/* <Link to="/admin/bestseller" className="admin-dropdown-item">Best Seller</Link> */}
              <Link to="/admin/shopthelook" className="admin-dropdown-item">Shop the Look</Link>
              <Link to="/admin/shopgram" className="admin-dropdown-item">Shop Gram</Link>
            </div>
          )}
        </div>

        {/* Orders Link */}
        <Link to="/admin/orders" className="admin-sidebar-link">
          <FaShoppingCart className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Orders</span>
        </Link>

            {/* Products Dropdown */}
            <div className="admin-sidebar-dropdown">
          <button 
            className="admin-sidebar-link"
            onClick={() => toggleDropdown("products")}
          >
            <FaBox className="admin-sidebar-icon" />
            <span className="admin-sidebar-text">Products</span>
            <FaChevronDown className={`admin-dropdown-icon ${dropdowns.products ? 'open' : ''}`} />
          </button>

          {dropdowns.products && (
            <div className="admin-dropdown-menu">
              <Link to="/admin/color-picker" className="admin-dropdown-item">Color Picker</Link>
              <Link to="/admin/size-picker" className="admin-dropdown-item">Size Picker</Link>
              <Link to="/admin/manageproducts" className="admin-dropdown-item">Manage Products</Link>

            </div>
          )}
        </div>


        {/* Other Links */}
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
