import React, { useState, useEffect, useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSearch, FaUser, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { CgMenuLeft } from 'react-icons/cg';
import '../../styles/MainNavBar.css';
import logo from '../../assets/IMAGES/logo.svg';
import Popup from './Popup.js';
import { RiShoppingBag2Line } from "react-icons/ri";
import 'swiper/swiper-bundle.css';

import { IoSearch } from 'react-icons/io5';
import HomeSection from './HomeSection.js';
import ShopSection from './ShopSection.js';
import Whishlist from './Whishlist.js';
import { toast, Toaster } from 'react-hot-toast'; // Importing toast and Toaster
import Sidebar from './ShopingCartSidebar.jsx';
import SearchSidebar from './SearchSidebar.jsx';








// MainNavbar Component
function MainNavbar() {
  const [isScrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showHoverSection, setShowHoverSection] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const [showWhishlist, setShowWhishlist] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="navbar-id">
      <Toaster/>
      <Navbar expand="lg" className={`navbar ${isScrolled ? 'scrolled bg-white shadow-sm' : 'bg-transparent'} py-2`} id="navbar">
        <div className="d-lg-none">
          <Nav.Link onClick={() => document.getElementById('main_icon_navbar').classList.toggle('show')}>
            <CgMenuLeft className="toggle-icon" />
          </Nav.Link>
        </div>
        <Navbar.Brand href="#home" className="fw-bold fs-3 mx-auto px-4">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Collapse id="main_icon_navbar" className="justify-content-between">
          {/* Navigation Links */}
          <Nav className="mx-auto">

            <NavDropdown title={<span>Home <RiArrowDropDownLine className="dropdown-icon " /></span>} id="nav-home">
              <div className="hover-section-container-home" href="#action/1.1"
                onMouseEnter={() => setShowHoverSection({ ...showHoverSection, "Home": true })}
                onMouseLeave={() => setShowHoverSection({ ...showHoverSection, "Home": false })}>
                <HomeSection />
              </div>

            </NavDropdown>

            <NavDropdown title={<span>Shop <RiArrowDropDownLine className="dropdown-icon" /></span>} id="nav-shop">
              <div className="hover-section-container-home" href="#action/2.1"
                onMouseEnter={() => setShowHoverSection({ ...showHoverSection, "Home": true })}
                onMouseLeave={() => setShowHoverSection({ ...showHoverSection, "Home": false })}>
                <ShopSection />
              </div>
            </NavDropdown>

            <NavDropdown title={<span>Products <RiArrowDropDownLine className="dropdown-icon" /></span>} id="nav-products">
              <NavDropdown.Item href="#action/3.1">New Arrivals</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Best Sellers</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<span>Pages <RiArrowDropDownLine className="dropdown-icon" /></span>} id="nav-pages">
              <NavDropdown.Item href="#action/4.1">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#action/4.2">Contact</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<span>Blog <RiArrowDropDownLine className="dropdown-icon" /></span>} id="nav-blog">
              <NavDropdown.Item href="#action/5.1">Latest News</NavDropdown.Item>
              <NavDropdown.Item href="#action/5.2">Trends</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#buynow" className="fw-bold">Buy now</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Right Icons */}
        <div className="d-flex align-items-center icon_set">
          <a className="nav-link hd_icon px-2" onClick={() => setShowSearchSidebar(true)}><FaSearch /></a>

          <a className="nav-link hd_icon  px-2" onClick={() => setShowPopup(true)}>
            <FaUser />
          </a>
          <a className="nav-link hd_icon px-2" href="#favorites" onClick={() => setShowWhishlist(true)}>
            <FaRegHeart />
          </a>
          <a
            className="nav-link hd_icon px-2 me-4"
            onClick={() => setShowSidebar(true)}
          >
            <RiShoppingBag2Line />
            <span className="position-absolute translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </a>

        </div>
      </Navbar>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      <SearchSidebar show={showSearchSidebar} onClose={() => setShowSearchSidebar(false)} />
      <Whishlist show={showWhishlist} onClose={() => setShowWhishlist(false)} />
    </div>
  );
}

export default MainNavbar;
export {Whishlist};