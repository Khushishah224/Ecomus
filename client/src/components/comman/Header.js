import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaPinterest } from 'react-icons/fa6';
import { MdArrowOutward } from 'react-icons/md';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState, useEffect } from 'react';
import '../../styles/Header.css';

function Header() {

   const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <section id="header" className={`header ${isScrolled ? 'scrolled' : 'bg-white'} py-1`}>
      <nav className="navbar bg-white py-1 ">
        <div className="header-left container-fluid d-flex flex-wrap justify-content-between align-items-center px-3 px-md-5">

          {/* Social Media Icons */}
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

          {/* Center Message */}
          <div className="header-center fw-bold text-center mx-auto mb-2 mb-lg-0">
            <p className="desktop-text fw-bold text-center mx-auto mb-2 mb-lg-0">
            Spring Fashion Sale.{' '}
            <a href="/footer" className="text-danger fw-normal text-decoration-none">
              Shop now <MdArrowOutward />
            </a>
            </p>
            <p className="tablet-text fw-bold text-center mx-auto mb-2 mb-lg-0">
            Summer Sale Discount Off $70
          </p>
          <p className="mobile-text fw-bold text-center mx-auto mb-2 mb-lg-0">
            Time to refresh your wardrobe
          </p>
          </div>

          {/* Country and Language Dropdown */}
          <div className=" d-flex gap-4 justify-content-end align-items-center mb-2 mb-lg-0">

            {/* Country Dropdown */}
            <Dropdown className='header-right'>
              <Dropdown.Toggle variant="white" className="fw-bold p-0 border-0 d-flex align-items-center">
                <img src="https://flagcdn.com/w40/us.png" alt="US Flag" width="20" className="me-1" />
                USD 
                <span className="ms-2">
                  {/* <RiArrowDropDownLine className='icons'/> */}
                  </span> {/* Custom down arrow icon */}
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
                English <span className="ms-2">
                  {/* <RiArrowDropDownLine className='icons' /> */}
                  </span> 
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
      </nav>
    </section>
  );
}

export default Header;
