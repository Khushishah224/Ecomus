import React, { useState } from "react";
import "../../styles/modals/ComparisonPopup.css";

const ComparisonPopup = ({ product, onClose }) => {
  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleRemoveImage = () => {
    setIsImageVisible(false);
  };

  return (
    <div className="comparison-popup-overlay" onClick={onClose}>
      <div className="comparison-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Compare Products</h3>
        <div className="product-details">
          {isImageVisible && (
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              <button className="image-close-btn" onClick={handleRemoveImage}>
                &times;
              </button>
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="compare-btn">Compare</button>
            <div className="clear-btn">Clear All</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPopup;
