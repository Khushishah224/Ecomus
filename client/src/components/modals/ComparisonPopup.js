import React from "react";
import "../../styles/modals/ComparisonPopup.css"; // Add styles for the popup

const ComparisonPopup = ({ product, onClose }) => {
  return (
    <div className="comparison-popup-overlay">
      <div className="comparison-popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Compare Products</h3>
        <div className="product-details">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
        <button className="compare-btn">Compare</button>
      </div>
    </div>
  );
};

export default ComparisonPopup;
