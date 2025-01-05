import React, { useState } from "react";
import "../../styles/modals/ShoppingbagPopup.css";
import { FaRegHeart } from "react-icons/fa";
import { TbArrowsCross } from "react-icons/tb";
import paypal from '../../assets/IMAGES/paypal.png'

function ShoppingBagPopup({ product = {}, onClose }) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
    const [selectedSize, setSelectedSize] = useState(product.size[0] || "");
    const [quantity, setQuantity] = useState(1);

    // Provide defaults for colors and sizes to prevent runtime errors
    const colors = product.colors;
    const sizes = product.size;
    const price = product.price ? product.price : 0;
    const priceValue = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
    // console.log(price); // Ensure price is a number

    const handleQuantityChange = (increment) => {
        setQuantity((prev) => Math.max(1, prev + increment));
    };

    return (
        <div className="shoppingbag-popup">
            <div className="shoppingbag-popup-container">
                <button className="shoppingbag-popup-close-btn" onClick={onClose}>
                    ×
                </button>
                <div className="shoppingbag-popup-header">
                    <img
                        src={product.image || "https://via.placeholder.com/150"}
                        alt={product.name || "Item"}
                        className="shoppingbag-popup-image"
                    />
                    <div className="shoppingbag-popup-details">
                        <h2 className="shoppingbag-popup-title">{product.name || "Item Name"}</h2>
                        <p className="shoppingbag-popup-price">
                            {price}
                        </p>
                    </div>
                </div>
                <div className="shoppingbag-popup-options">
                    <div className="shoppingbag-popup-color">
                        <p>Color: <span className='fw-semibold'> {String(selectedColor).charAt(0).toUpperCase()+String(selectedColor).slice(1)}</span></p>
                        <div className='d-flex shoppingbag-popup-color-container'>
                            {colors.length > 0 ? (
                                colors.map((color, index) => (
                                    <div className="shoppingbag-popup-color-btn-div " >
                                        <button
                                            key={index}
                                            className={`shoppingbag-popup-color-btn ${selectedColor === color ? "selected" : ""
                                                }`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setSelectedColor(color)}
                                            aria-label={`Select color ${color}`} // Added aria-label
                                        /></div>
                                ))
                            ) : (
                                <p>No colors available</p>
                            )}
                        </div>
                    </div>
                    <div className="shoppingbag-popup-size">
                        <p>Size: <span className='fw-semibold'> {selectedSize}</span></p>
                        {sizes.length > 0 ? (
                            sizes.map((size, index) => (
                                <button
                                    key={index}
                                    className={`shoppingbag-popup-size-btn ${selectedSize === size ? "selected" : ""
                                        }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))
                        ) : (
                            <p>No sizes available</p>
                        )}
                    </div>
                    <div className="shoppingbag-popup-quantity">
                        <p>Quantity</p>
                        <div className='shoppingbag-popup-quantity-container'>
                            <button
                                className="shoppingbag-popup-quantity-btn"
                                onClick={() => handleQuantityChange(-1)}
                            >
                                -
                            </button>
                            <span className="shoppingbag-popup-quantity-btn">{quantity}</span>
                            <button
                                className="shoppingbag-popup-quantity-btn"
                                onClick={() => handleQuantityChange(1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="shoppingbag-popup-actions">
                    <button className="shoppingbag-popup-addtocart-btn" disabled={!selectedColor || !selectedSize}>
                        Add to cart - ${(priceValue * quantity).toFixed(2)}
                    </button>
                    <button className="shoppingbag-popup-wishlist-btn"><span><FaRegHeart/></span></button>
                    <button className="shoppingbag-popup-compare-btn"><span><TbArrowsCross/></span></button>
                </div>
                <button className="shoppingbag-popup-paypal-btn">
                    <span style={{color:"#052c65" , fontSize:"0.9rem"}}>Buy with </span><span><img src={paypal} alt="Paypal"></img></span>
                </button>
                <p className="shoppingbag-popup-more-options">More payment options</p>
            </div>
        </div>
    );
}

export default ShoppingBagPopup;
