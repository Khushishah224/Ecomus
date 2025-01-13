import React, { useState, useEffect, useRef } from 'react';
import { RiTruckLine, RiGiftLine, RiShoppingBagLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoEyeOutline } from "react-icons/io5";
import { Pagination } from 'swiper/modules';
import img1 from '../../assets/IMAGES/white-1.jpg';
import img2 from '../../assets/IMAGES/white-2.jpg';
import img3 from '../../assets/IMAGES/white-3.jpg';
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
  export default Sidebar;