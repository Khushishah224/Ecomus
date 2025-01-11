import React, { useState, useEffect, useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSearch, FaUser, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { CgMenuLeft } from 'react-icons/cg';
import '../../styles/MainNavBar.css';
import logo from '../../assets/IMAGES/logo.svg';
import { RiTruckLine, RiGiftLine, RiShoppingBagLine } from "react-icons/ri";
import { RiShoppingBag2Line } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { IoEyeOutline } from "react-icons/io5";
import { Pagination } from 'swiper/modules';
import { IoSearch } from 'react-icons/io5';
import HomeSection from './HomeSection.js';
import ShopSection from './ShopSection.js';
import api from "../../api.js"
import img1 from '../../assets/IMAGES/white-1.jpg';
import img2 from '../../assets/IMAGES/white-2.jpg';
import img3 from '../../assets/IMAGES/white-3.jpg';
import { toast, Toaster } from 'react-hot-toast'; // Importing toast and Toaster



const Sidebar = ({ show, onClose }) => {

  const [screenSize, setScreenSize] = useState('desktop');
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setScreenSize('mobile');
      } else if (width < 992) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  const [progress, setProgress] = useState(25); // Initial progress (in percentage)
  const progressBarRef = useRef(null); // Reference to the progress bar

  const handleDrag = (event) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left; // Calculate the drag position relative to the progress bar
    const newProgress = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100); // Clamp progress between 0% and 100%
    setProgress(newProgress);
  };

  const handleMouseMove = (event) => {
    handleDrag(event);
  };

  const handleMouseDown = (event) => {
    handleDrag(event);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  if (!show) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div
        className="sidebar-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside
      >
        <button className="sidebar-close-button" onClick={onClose}>
          &times;
        </button>
        <h3 className="sidebar-title">Shopping cart</h3>

        {/* Free Shipping Progress */}
        <div className="free-shipping-section">
          <div
            className="progress-bar-container"
            ref={progressBarRef}
          >
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}% ` }}></div>
            </div>
            <div
              className="progress-icon truck-icon"
              style={{ left: ` ${progress}% ` }}
              onMouseDown={handleMouseDown}
            >
              <RiTruckLine size={24} />
            </div>
          </div>
          <p className="free-shipping-text">
            Buy <strong>${(75 - (progress * 75) / 100).toFixed(2)}</strong> more to enjoy{" "}
            <strong>Free Shipping</strong>
          </p>
        </div>
        {/* Cart Items */}
        <div className="cart-items">
          {[
            {
              img: img1,
              title: "T-shirt",
              color: "Light gray",
              price: 25.0,
              quantity: 1,
            },
            {
              img: img2,
              title: "Oversized Motif T-shirt",
              color: "",
              price: 25.0,
              quantity: 1,
            },
          ].map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.img} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-title">{item.title}</p>
                {item.color && <p className="cart-item-color">{item.color}</p>}
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="cart-item-actions">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                  <button className="remove-item">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='swipper-class'>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", top: "5%", left: "5%", fontWeight: "bold" }}>
              You May Also Like This
            </span>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              grabCursor={true}
              modules={[Pagination]}
              className="addToCart-swiper rounded-2 pb-5"
              style={{ width: "95%", marginBottom: "20px" }}
              allowTouchMove={true}
            >
              <SwiperSlide>
                <div className="d-flex my-4">
                  <div>
                    <img src={img1} alt="Loose fit sweatshirt" height={100} width={80} />
                  </div>
                  <div className="d-flex flex-column mx-3 justify-content-center align-content-center">
                    <span>Loose fit sweatshirt</span>
                    <span>
                      <b>$25.00</b>
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "80%",
                    }}
                  >
                    <button
                      className="d-flex justify-content-center align-content-center"
                      style={{
                        borderRadius: "50%",
                        height: "30px",
                        paddingTop: "5px",
                      }}
                    >
                      <IoEyeOutline />
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="d-flex my-4">
                  <div>
                    <img src={img1} alt="Loose fit sweatshirt" height={100} width={80} />
                  </div>
                  <div className="d-flex flex-column mx-3 justify-content-center align-content-center">
                    <span>Loose fit sweatshirt</span>
                    <span>
                      <b>$25.00</b>
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "80%",
                    }}
                  >
                    <button
                      className="d-flex justify-content-center align-content-center"
                      style={{
                        borderRadius: "50%",
                        height: "30px",
                        paddingTop: "5px",
                      }}
                    >
                      <IoEyeOutline />
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="d-flex my-4">
                  <div>
                    <img src={img1} alt="Loose fit sweatshirt" height={100} width={80} />
                  </div>
                  <div className="d-flex flex-column mx-3 justify-content-center align-content-center">
                    <span>Loose fit sweatshirt</span>
                    <span>
                      <b>$25.00</b>
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "40%",
                      left: "80%",
                    }}
                  >
                    <button
                      className="d-flex justify-content-center align-content-center"
                      style={{
                        borderRadius: "50%",
                        height: "30px",
                        paddingTop: "5px",
                      }}
                    >
                      <IoEyeOutline />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>


        {/* Action Icons */}
        <div className="sidebar-icons">
          <div className='sidebar-icons-btn'>
            <RiGiftLine size={24} />
          </div>
          <div className='sidebar-icons-btn'>
            <RiShoppingBagLine size={24} />
          </div>
          <div className='sidebar-icons-btn'>
            <RiTruckLine size={24} />
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <p className="subtotal">
            Subtotal: <strong>$49.99 USD</strong>
          </p>
          <p className="taxes">
            Taxes and <a href="#shipping">shipping</a> calculated at checkout
          </p>
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree with the <a href="#terms">terms and conditions</a>
            </label>
          </div>
          <button className="view-cart-button">View cart</button>
          <button className="checkout-button">Check out</button>
        </div>
      </div>
    </div>
  );
};

const SearchSidebar = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div
        className="sidebar-container search-sidebar"
        onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside
      >
        <button className="sidebar-close-button" onClick={onClose}>
          &times;
        </button>
        <h3 className="sidebar-title">Search our site</h3>
        {/* Search Input */}
        <div className='search-bottom'>
          <div
            className="d-flex gap-2 search-input-container"
            style={{
              border: "1px solid #ddd",
              alignItems: "center", // Center items vertically
              padding: "5px", // Add padding for better spacing
            }}
          >
            <IoSearch
              style={{
                marginLeft: "5px",
                fontSize: "1.3rem", // Adjust icon size
                // color: "gray", // Optional: Add a color for better visibility
              }}
            />
            <input
              style={{
                border: "none",
                outline: "none", // Remove the default input focus outline
                flex: "1",
                // Allow the input to take the remaining space
              }}
              type="text"
              placeholder="Search"
              className="search-input fw-bold"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <h4>Quick links</h4>
          <ul>
            <li><a href="#fashion">Fashion</a></li>
            <li><a href="#men">Men</a></li>
            <li><a href="#women">Women</a></li>
            <li><a href="#accessories">Accessories</a></li>
          </ul>
        </div>

        {/* Need Some Inspiration */}
        <div className="inspiration-section">
          <h4>Need some inspiration?</h4>
          <div className="inspiration-item">
            <img src={img1} alt="Cotton jersey top" />
            <div>
              <p>Cotton jersey top</p>
              <p><s>$10.00</s> <strong>$8.00</strong></p>
            </div>
          </div>
          <div className="inspiration-item">
            <img src={img2} alt="Mini crossbody bag" />
            <div>
              <p>Mini crossbody bag</p>
              <p className='fw-bold'>$13.00</p>
            </div>
          </div>
          <div className="inspiration-item">
            <img src={img3} alt="Mini crossbody bag" />
            <div>
              <p>Mini crossbody bag</p>
              <p className='fw-bold'>$13.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Popup Component
const Popup = ({ show, onClose }) => {
  const [currentForm, setCurrentForm] = useState('register');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes for both forms
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/users/register', formData);
      console.log(response);

      const { token } = response.data;
      console.log(token)
      if (token) {
        localStorage.setItem('jwtToken', token);
      }
      else{
        console.log("token is not stored")
      }

      toast.success('Registration successful!'); // Using toast for success message
      setCurrentForm('login');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.'); // Using toast for error message
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/users/login', loginData); // Your backend login endpoint
      console.log(response);

      const { token } = response.data;
      console.log(token)
      if (token) {
        localStorage.setItem('jwtToken', token);
      }

      toast.success('Login successful!'); // Using toast for success message
      onClose(); // Close the popup after successful login
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.'); // Using toast for error message
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'register':
        return (
          <>
            <h3 className="mb-3">Register</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fname"
                placeholder="First name"
                className="popup-input"
                value={formData.fname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lname"
                placeholder="Last name"
                className="popup-input"
                value={formData.lname}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className="popup-input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password *"
                className="popup-input"
                value={formData.password}
                onChange={handleChange}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className='d-flex justify-content-between'>
             
                <button type="submit" className="popup-submit-button">Register</button>
              
         
                <p className="text-div text-decoration-underline fw-semibold mt-3 pt-1">
                  Already have an account?{' '}
                  <a href="#login" className="text-black" onClick={() => setCurrentForm('login')}>
                    Login here
                  </a>.
                </p>
              </div>
            </form>
          </>
        );
      case 'login':
        return (
          <>
            <h3 className="mb-3">Log in</h3>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className="popup-input"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password *"
                className="popup-input"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <p className="mt-2" style={{ marginBottom: '0.5rem' }}>
                <a href="#forgot-password" className="text-black" onClick={() => setCurrentForm('forgotPassword')}>
                  Forgot your password?
                </a>
              </p>
              <div className="form-content d-flex justify-content-between">
                <button type="submit" className="popup-submit-button">Login</button>
                <div className="text-div text-decoration-underline fw-semibold mt-3 pt-1">
                  <p>
                    Don’t have an account?{' '}
                    <a href="#register" className="text-black" onClick={() => setCurrentForm('register')}>
                      Register now
                    </a>.
                  </p>
                </div>
              </div>
            </form>
          </>
        );
      case 'forgotPassword':
        return (
          <>
            <h3 className="mb-3">Reset Your Password</h3>
            <p>Sign up for early Sale access plus tailored new arrivals, trends, and promotions.</p>
            <form>
              <input type="email" placeholder="Enter your email *" className="popup-input" />
              <p>
                <a href="#login" className="text-black" onClick={() => setCurrentForm('login')}>Cancel</a>
              </p>
              <button type="submit" className="popup-reset-button">
                Reset Password
              </button>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-button" onClick={onClose}>&times;</button>
        {renderForm()}
        <Toaster /> {/* Render the Toaster component here */}
      </div>
    </div>
  );
};
const Whishlist = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="whishlist-popup" onClick={onClose}>
      <div
        className="whishlist-popup-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing sidebar when clicking inside
      >
        <div className="whishlist-popup-header d-flex justify-content-between align-content-center align-items-center">
          <button className="sidebar-close-button" onClick={onClose}>
            &times;
          </button>

        </div>
        <div className="text-center mt-5 d-flex justify-content-center align-items-center flex-column"> 
          <div className="whishlist-header-banner d-flex justify-content-center align-items-center">
          <h3 className="whishlist-header-title">Your WhishList</h3>
          </div>
          <div className="whishlist-body-content mt-5 p-5 text-center">
          <p className="fw-semibold fs-3">
            Wishlist is empty.
          </p>
          <p>
            You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop page".
          </p>
          </div>
        </div>

        <div>

        </div>
      </div>
    </div>
  )
}

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
export { SearchSidebar, Sidebar, Popup ,Whishlist};