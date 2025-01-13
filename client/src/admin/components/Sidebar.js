import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaShoppingCart, FaBox, FaChartLine, FaUsers, FaCog, 
  FaSignOutAlt, FaUserCircle, FaGlobe, FaChevronDown, FaBars 
} from 'react-icons/fa';
import '../styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 992 && window.innerWidth > 576);
  const [isOpen, setIsOpen] = useState(false);
  
  const [dropdowns, setDropdowns] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarDropdowns")) || {
      frontend: false,
      products: false,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 576);
      setIsTablet(width <= 992 && width > 576);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarDropdowns", JSON.stringify(dropdowns));
  }, [dropdowns]);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const deviceClass = isMobile ? 'mobile' : isTablet ? 'tablet' : '';

  return (
    <div className={`admin-sidebar ${deviceClass} ${isOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-header">
        {/* Show brand for all screens */}
        <h1 className="admin-brand">
          <span className="brand-text">Ecomus</span>
        </h1>
        {/* Show toggle for both mobile and tablet */}
        {(isMobile || isTablet) && (
          <button className="admin-sidebar-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
        )}
      </div>

      <nav className={`admin-sidebar-nav ${isOpen ? 'show' : ''}`}>
        <Link to="/admin/dashboard" className="admin-sidebar-link" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>
          <FaHome className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Dashboard</span>
        </Link>

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
              <Link to="/admin/Header" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Header</Link>
              <Link to="/admin/banner" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Hero Section</Link>
              <Link to="/admin/marquee" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Marquee</Link>
              <Link to="/admin/shopcategories" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Shop by Categories</Link>
              <Link to="/admin/shopthelook" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Shop the Look</Link>
              <Link to="/admin/shopgram" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Shop Gram</Link>
            </div>
          )}
        </div>

        <Link to="/admin/orders" className="admin-sidebar-link" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>
          <FaShoppingCart className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Orders</span>
        </Link>

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
              <Link to="/admin/color-picker" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Color Picker</Link>
              <Link to="/admin/size-picker" className="admin-dropdown-item" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>Size Picker</Link>
            </div>
          )}
        </div>

        <Link to="/admin/sales" className="admin-sidebar-link" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>
          <FaChartLine className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Sales</span>
        </Link>

        <Link to="/admin/users" className="admin-sidebar-link" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>
          <FaUsers className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Users</span>
        </Link>

        <Link to="/admin/profile" className="admin-sidebar-link" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>
          <FaUserCircle className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Profile</span>
        </Link>

        <Link to="/admin/settings" className="admin-sidebar-link" onClick={() => (isMobile || isTablet) && setIsOpen(false)}>
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