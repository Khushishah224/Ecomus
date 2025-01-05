

import React, { useState, useEffect } from 'react';
import banner from '../../assets/IMAGES/banner-newleter.jpg';
import '../../styles/modals/BannerPopUp.css';

const BannerPopUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show popup when the component loads
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle close action
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup">
          <button className="popup-close-button" onClick={handleClose}>
            &times;
          </button>
          <img
            src={banner}
            alt="Fashion"
            className="popup-banner"
          />
          <div className="popup-content">
            <h2>Don't miss out</h2>
            <p>Be the first one to get the new product at early bird prices.</p>
            <input
              type="email"
              placeholder="Email *"
              className="popup-input"
            />
            <button className="popup-keep-updated">Keep me updated</button>
            <button className="popup-not-interested" onClick={handleClose}>
              Not interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default BannerPopUp;
