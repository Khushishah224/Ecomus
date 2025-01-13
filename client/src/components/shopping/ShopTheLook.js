import React from "react";
import { useState } from "react";
import "../../styles/ShopTheLook.css";
import look1 from "../../assets/IMAGES/lookbook-3.jpg";
import look2 from "../../assets/IMAGES/lookbook-4.jpg";
import product1Image from "../../assets/IMAGES/brown-2.jpg"; 
import product2Image from "../../assets/IMAGES/img-p4.png";
import product3Image from "../../assets/IMAGES/img-p3.png";
import ShowProductPopup from "../modals/ShowProductPopup";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Tooltip from "react-bootstrap/Tooltip";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css"; // Import Swiper styles
import { Pagination } from 'swiper/modules'; // Import Swiper Pagination module

import { IoEyeOutline } from "react-icons/io5";

function ShopTheLook() {

  const [isShowProductPopupVisible, setIsShowProductPopupVisible] = useState(false); // New state for ShowProductPopup
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the selected product
  const product_item=[
    {
      id: 1,
      name: "Black Leather Jacket",
      price: "$120",
      image: product1Image,
      position: { top: "60%", left: "45%" },
    },
    {
      id: 2,
      name: "Classic Blue Jeans",
      price: "$80",
      image: product2Image,
      position: { top: "80%", left: "60%" },
    },
    {
      id: 3,
      name: "Elegant Red Heels",
      price: "$100",
      image: product3Image,
      position: { top: "18%", left: "60%" },
    }
  ]
  const products = {
    look1: [
      {
        id: 1,
        name: "Black Leather Jacket",
        price: "$120",
        image: product1Image,
        position: { top: "60%", left: "45%" },
      },
      {
        id: 2,
        name: "Classic Blue Jeans",
        price: "$80",
        image: product2Image,
        position: { top: "80%", left: "60%" },
      },
    ],
    look2: [
      {
        id: 3,
        name: "Elegant Red Heels",
        price: "$100",
        image: product3Image,
        position: { top: "18%", left: "60%" },
      },
    ],
  };

  const handleOpenShowProductPopup = (product) => {
    closeAllPopups();
    setSelectedProduct(product);
    setIsShowProductPopupVisible(true);
  };

  const closeAllPopups = () => {
    setIsShowProductPopupVisible(false);
    setSelectedProduct(null);
  };


  const renderTooltip = (product) => (
    <Tooltip id={`tooltip-${product.id}`} className="custom-tooltip">
      <div className="tooltip-card">
        <img
          src={product.image}
          alt={product.name}
          className="tooltip-product-image"
        />
        <div className="tooltip-product-details">
          <p className="tooltip-product-name">{product.name}</p>
          <p className="tooltip-product-price">{product.price}</p>
        </div>
        <div>
          <span
            className="show-product-detail-eye-icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing the tooltip on button click
              handleOpenShowProductPopup(product);
            }}
          >
            <IoEyeOutline />
          </span>
        </div>
      </div>
    </Tooltip>
  );
  

  return (
    <section id="shop-the-look">
      <div className="shop-look-container">
        <div className="shop-look-header text-center my-5">
          <h1>Shop the Look</h1>
          <p>
            Inspire and let yourself be inspired, from one unique fashion to
            another
          </p>
        </div>

        {/* Swiper for Mobile Screens */}
        <div className="d-md-none">
          <Swiper
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}" style="background-color: black; border-radius: 50%; width: 12px; height: 12px; display: inline-block; margin: 0 4px;"></span>`;
              },
            }}
            className="mySwiper"
            modules={[Pagination]} // Include Pagination module
          >
            <SwiperSlide>
              <img src={look1} alt="Look 1" className="look-image-content" />
              {products.look1.map((product) => (
                <OverlayTrigger
                key={product.id}
                trigger="click" // Show tooltip on click
                placement="top"
                overlay={renderTooltip(product)}
                rootClose // Close the tooltip when clicking outside
              >
                <div
                  className="dot"
                  style={{
                    top: product.position.top,
                    left: product.position.left,
                  }}
                ></div>
              </OverlayTrigger>
              ))}
            </SwiperSlide>
            <SwiperSlide>
              <img src={look2} alt="Look 2" className="look-image-content" />
              {products.look2.map((product) => (
                <OverlayTrigger
                key={product.id}
                trigger="click" // Show tooltip on click
                placement="top"
                overlay={renderTooltip(product)}
                rootClose // Close the tooltip when clicking outside
              >
                <div
                  className="dot"
                  style={{
                    top: product.position.top,
                    left: product.position.left,
                  }}
                ></div>
              </OverlayTrigger>
              ))}
            </SwiperSlide>
          </Swiper>
        </div>

        {/* For Medium and Large Screens */}
        <div className="d-none d-md-flex">
          <div className="look-image col-6">
            <img src={look1} alt="Look 1" className="look-image-content" />
            {products.look1.map((product) => (
              <OverlayTrigger
              key={product.id}
              trigger="click" // Show tooltip on click
              placement="top"
              overlay={renderTooltip(product)}
              rootClose // Close the tooltip when clicking outside
            >
              <div
                className="dot"
                style={{
                  top: product.position.top,
                  left: product.position.left,
                }}
              ></div>
            </OverlayTrigger>
            
            ))}
          </div>

          <div className="look-image col-6">
            <img src={look2} alt="Look 2" className="look-image-content" />
            {products.look2.map((product) => (
             <OverlayTrigger
             key={product.id}
             trigger="click" // Show tooltip on click
             placement="top"
             overlay={renderTooltip(product)}
             rootClose // Close the tooltip when clicking outside
           >
             <div
               className="dot"
               style={{
                 top: product.position.top,
                 left: product.position.left,
               }}
             ></div>
           </OverlayTrigger>
            ))}
          </div>
        </div>
      </div>

      {isShowProductPopupVisible && selectedProduct && (
        <ShowProductPopup products={products} initialProductIndex={selectedProduct.id} onClose={closeAllPopups} />
      )}
    </section>
    
  );
}

export default ShopTheLook;
