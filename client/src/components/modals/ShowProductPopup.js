import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../../styles/modals/ShowProductPopup.css";
import { FaRegHeart } from "react-icons/fa";
import { TbArrowsCross } from "react-icons/tb";
import paypal from "../../assets/IMAGES/paypal.png";

function ShowProductPopup({ product, onClose }) {
  const price = product.price ? product.price : 0;
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.size?.[0]);
  const [quantity, setQuantity] = useState(1);
  const priceValue = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));

  useEffect(() => {
    if (product) {
      // Reset color and size when the product changes
      setSelectedColor(product.colors?.[0]);
      setSelectedSize(product.size?.[0]);
      setQuantity(1);
    }
  }, [product]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return null; // or a loading state
  }

  return (
    <div className="show-product-popup-overlay">
      <div className="show-product-popup-container">
        <div className="show-product-popup-content">
          <button className="show-product-close-btn" onClick={onClose}>
            ×
          </button>
          {/* Left Section: Image Slider */}
          <div className="show-product-image-slider">
            <Swiper
              navigation
              modules={[Navigation]}
              className="show-product-swiper-container"
            >
              {product.subimage ? (
                <>
                <SwiperSlide>
                <img src={product.image} alt={product.name} />
              </SwiperSlide>
                  <SwiperSlide>
                    <img src={product.subimage} alt={`${product.name} `} />
                  </SwiperSlide>
                  </>
              ) : (
                <SwiperSlide>
                  <img src={product.image} alt={product.name} />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          {/* Right Section: Product Details */}
          <div className="show-product-details">
            <h2 className="show-product-title">{product.name}</h2>
            <div className="show-product-availability">
              <button className="show-product-instock">BEST SELLER</button>
              <p className="show-product-instock-detail">Selling fast! 48 people have this in their carts.</p>
            </div>
            <div className="show-product-price">{price}</div>

            <p className="show-product-description">
              Nunc arcu faucibus a et lorem eu a mauris adipiscing conubia ac
              aptent ligula facilisis a auctor habitant parturient a a. Interdum
              fermentum.
            </p>

            {/* Color Options */}
            <div className="show-product-color-options">
              <p>
                Color: <span className="fw-semibold">{String(selectedColor).charAt(0).toUpperCase() + String(selectedColor).slice(1)}</span>
              </p>
              {product.colors.length > 0 ? (
                product.colors?.map((color, index) => (
                  <button
                    key={index}
                    className={`show-product-color-btn ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))
              ) : (
                <p>No colors available</p>
              )}
            </div>

            {/* Size Options */}
            <div className="show-product-size-options">
              <p>
                Size: <span className="fw-semibold">{selectedSize}</span>
              </p>
              {product.size.length > 0 ? (
                product.size?.map((size, index) => (
                  <button
                    key={index}
                    className={`show-product-size-btn ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>

            {/* Quantity */}
            <div className="show-product-quantity-selector">
              <p className="fw-semibold mb-1">Quantity</p>
              <div className="show-product-quantity-selector-container">
                <button className="show-product-quantity-btn" onClick={handleDecrease}>-</button>
                <span className="show-product-quantity-btn">{quantity}</span>
                <button className="show-product-quantity-btn" onClick={handleIncrease}>+</button>
              </div>
            </div>

            {/* Add to Cart and PayPal Buttons */}
            <div className="show-product-action-buttons">
              <button className="show-product-add-to-cart-btn">
                Add to cart - ${(priceValue * quantity).toFixed(2)}
              </button>
              <button className="show-product-popup-wishlist-btn">
                <span>
                  <FaRegHeart />
                </span>
              </button>
              <button className="show-product-popup-compare-btn">
                <span>
                  <TbArrowsCross />
                </span>
              </button>
            </div>
            <button className="show-product-paypal-btn">
              <span style={{ color: "#052c65", fontSize: "0.9rem" }}>Buy with </span>
              <span>
                <img src={paypal} alt="Paypal"></img>
              </span>
            </button>
            <p className="show-product-more-payment-options">More payment options</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProductPopup;
