import React, { useState, useEffect } from "react";
import { Dropdown } from 'react-bootstrap';
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaPinterest } from 'react-icons/fa6';
import logo from '../../assets/IMAGES/logo.svg';
import visa from '../../assets/IMAGES/visa.png';
import paypal from '../../assets/IMAGES/paypal.png';
import mastercard from '../../assets/IMAGES/img-2.png';
import americanExpress from '../../assets/IMAGES/img-3.png';
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { CiCircleChevUp } from "react-icons/ci";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import Sidebar from "./ShopingCartSidebar.jsx";
import Popup from "./Popup.js";
import { ShopSideBar } from "../modals/ShopSideBar.js";
import SearchSidebar from "./SearchSidebar.jsx";
import "../../styles/Footer.css";
import Whishlist from "./Whishlist.js";
const Footer = () => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [showSearchSidebar, setShowSearchSidebar] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showShopSideBar, setShowShopSideBar] = useState(false);
  const [showWhishlist, setShowWhishlist] = useState(false);


    return (
        <section id="footer">
            <footer className="footer">
                <div className="container py-3">
                    <div className="row">
                        {/* Logo Section */}
                        <div className="col-lg-3 col-md-6 footer-section address">
                            <h2 className="footer-logo py-2"><img src={logo} alt="Logo" className="logo me-2" /></h2>
                            <p className='footer-address '>Address: 1234 Fashion Street, Suite 567,
                                New York, NY 10001</p>
                            <p className='footer-mail'>Email: <a href="mailto:info@fashionshop.com">info@fashionshop.com</a></p>
                            <p>Phone: <a href="tel:+12125551234">(212) 555-1234</a></p>
                            <a href="https://flagcdn.com/w40/in.png" className="get-direction">Get direction ↗</a>
                            <div className="d-flex gap-2 justify-content-start mb-2 mb-lg-0">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaFacebookF />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaXTwitter />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaInstagram />
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaTiktok />
                                </a>
                                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaPinterest />
                                </a>
                            </div>
                        </div>

                        {/* Help Section */}
                        <div className="col-lg-3 col-md-6 footer-section help">
                            <h3 onClick={() => setIsHelpOpen(!isHelpOpen)}>
                                Help {!isLargeScreen && <LuPlus className="toggle-icon" />}
                            </h3>
                            {(isHelpOpen || isLargeScreen) && (
                                <ul>
                                    <li><a href="https://flagcdn.com/w40/in.png">Privacy Policy</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">Returns + Exchanges</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">Shipping</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">Terms & Conditions</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">FAQ's</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">Compare</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">My Wishlist</a></li>
                                </ul>
                            )}
                        </div>

                        {/* About Us Section */}
                        <div className="col-lg-3 col-md-6 footer-section about">
                            <h3 onClick={() => setIsAboutOpen(!isAboutOpen)}>
                                About Us {!isLargeScreen && <LuPlus className="toggle-icon" />}
                            </h3>
                            {(isAboutOpen || isLargeScreen) && (
                                <ul>
                                    <li><a href="https://flagcdn.com/w40/in.pnghttps://flagcdn.com/w40/in.png">Our Story</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">Visit Our Store</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">Contact Us</a></li>
                                    <li><a href="https://flagcdn.com/w40/in.png">Account</a></li>
                                </ul>
                            )}
                        </div>

                        {/* Signup Section */}
                        <div className="col-lg-3 col-md-6 footer-section signup">
                            <h3 onClick={() => setIsSignupOpen(!isSignupOpen)}>
                                Sign Up for Email {!isLargeScreen && <LuPlus className="toggle-icon" />}
                            </h3>
                            {(isSignupOpen || isLargeScreen) && (
                                <>
                                    <p>Sign up to get first dibs on new arrivals, sales, exclusive content, events, and more!</p>
                                    <form className='signup-form'>
                                        <input type="email" placeholder="Enter your email..." />
                                        <button type="submit">Subscribe ↗</button>
                                    </form>
                                </>
                            )}
                            {/* Country and Language Dropdown */}
                            <div className=" d-flex gap-4 justify-content-end align-items-center mb-2 mb-lg-0">

                                {/* Country Dropdown */}
                                <Dropdown className='header-right'>
                                    <Dropdown.Toggle variant="white" className="fw-bold p-0 border-0 d-flex align-items-center">
                                        <img src="https://flagcdn.com/w40/us.png" alt="US Flag" width="20" className="me-1" />
                                        USD <span className="ms-2"><RiArrowDropDownLine className='icons' /></span> {/* Custom down arrow icon */}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">
                                            <img src="https://flagcdn.com/w40/us.png" alt="US Flag" width="20" className="me-2" />
                                            United States
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <img src="https://flagcdn.com/w40/gb.png" alt="UK Flag" width="20" className="me-2" />
                                            United Kingdom
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <img src="https://flagcdn.com/w40/in.png" alt="India Flag" width="20" className="me-2" />
                                            India
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <img src="https://flagcdn.com/w40/ca.png" alt="Canada Flag" width="20" className="me-2" />
                                            Canada
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                {/* Language Dropdown */}
                                <Dropdown className='header-right'>
                                    <Dropdown.Toggle variant="white" className="fw-bold p-3 border-0 ">
                                        English <span className="ms-2"><RiArrowDropDownLine className='icons' /></span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">English</Dropdown.Item>
                                        <Dropdown.Item href="#">Spanish</Dropdown.Item>
                                        <Dropdown.Item href="#">French</Dropdown.Item>
                                        <Dropdown.Item href="#">German</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                        </div>

                    </div>
                    <button className="scroll-top" onClick={() => window.scrollTo(0, 0)}><span><CiCircleChevUp /></span></button>
                </div>

            </footer>
            <div className="footer-bottom row">
                <div className="col-md-6">
                    <p>© 2024 Ecomus Store. All Rights Reserved</p>
                </div>
                <div className="col-md-6">
                    <div className="payment-icons ">
                        <img src={visa} alt="Visa" />
                        <img src={paypal} alt="PayPal" />
                        <img src={mastercard} alt="MasterCard" />
                        <img src={americanExpress} alt="American Express" />
                    </div>
                </div>
            </div>

            {/* for medium and mobile screen  */}
            <div className='footer-bar shadow-lg'>
                    <button className="footer-bar-icon h-100 d-flex flex-column justify-content-center align-items-center fs-3 bg-white border-0"  onClick={() => setShowShopSideBar(true)} >
                        <FaTableCellsLarge />
                        <span className="footer-bar-label mt-1">Shop </span>
                    </button>

                    <button className="footer-bar-icon h-100 d-flex flex-column justify-content-center align-items-center fs-3 bg-white border-0" onClick={() => setShowSearchSidebar(true)}>
                        <IoSearch />
                        <span className="footer-bar-label mt-1">Search</span>
                    </button>

                    <div className="footer-bar-icon h-100 d-flex flex-column justify-content-center align-items-center fs-3" onClick={() => setShowPopup(true)}>
                        <FiUser />
                        <span className="footer-bar-label mt-1">Account</span>
                    </div>

                    <div className="footer-bar-icon h-100 d-flex flex-column justify-content-center align-items-center fs-3" onClick={()=>setShowWhishlist(true)}>
                        <FaRegHeart />
                        <span className="footer-bar-label mt-1" >Wishlist</span>
                        <span className='footer-bar-badge'>0</span>
                    </div>

                    <button className="footer-bar-icon h-100 d-flex flex-column justify-content-center align-items-center fs-3 bg-white border-0" onClick={() => setShowSidebar(true)}>
                        <CgShoppingBag />
                        <span className="footer-bar-label mt-1">Cart</span>
                        <span className='footer-bar-badge'>0</span>
                    </button>
                </div>
                <SearchSidebar show={showSearchSidebar} onClose={() => setShowSearchSidebar(false)} />
                    {/* shopping cart */}
                    <Whishlist show={showWhishlist} onClose={() => setShowWhishlist(false)} />
                <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
                <Popup show={showPopup} onClose={() => setShowPopup(false)} />
                <ShopSideBar show={showShopSideBar} onClose={() => setShowShopSideBar(false)} />
        </section>
    );
};

export default Footer;
