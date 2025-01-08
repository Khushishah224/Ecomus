import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/Carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { Pagination } from "swiper/modules";
import api from "../../api.js";

// Yellow Banner Component (Remains Unchanged)
const YellowBanner = () => {
  const [bannerData, setBannerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await api.get('/api/users/get_taglines');
        setBannerData(response.data); // Assume response.data is an array
      } catch (err) {
        console.error(err);
        setError('Failed to fetch banner data.');
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="custom-yellow-banner">
      {error ? (
        <p className="custom-error-message">{error}</p>
      ) : bannerData ? (
        <div className="marquee-wrapper">
          {bannerData.map((item, index) => (
            <p key={index}>
              <span>
                <BsFillLightningChargeFill />
              </span>{' '}
              {item.text}{' '}
            </p>
          ))}
        </div>
      ) : (
        <p className="custom-loading-text">Loading...</p>
      )}
    </div>
  );
};

function Carousel_item() {
  const [banners, setBanners] = useState([]); // Store fetched banners
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get('/banners/');
        const activeBanners = response.data.filter(banner => banner.active); // Only show active banners
        setBanners(activeBanners);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch banners.');
      }
    };

    fetchBanners();
  }, []);

  return (
    <section id="carousel_item">
      {error ? (
        <p className="custom-error-message">{error}</p>
      ) : banners.length > 0 ? (
        <Swiper
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} custom-pagination-bullet"></span>`,
          }}
          grabCursor={true}
          allowTouchMove={true}
          modules={[Pagination]}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="slide-container">
                <img src={`http://localhost:5000${banner.image}`} alt={`Banner ${index + 1}`} className="slide-image" />
                <div className="slide-content">
                  <h5>{banner.caption}</h5>
                  <p>{banner.text}</p>
                  <button className="btn btn-dark d-flex align-items-center">
                    Shop Collection
                    <IoIosArrowForward className="ms-2" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="custom-loading-text">Loading banners...</p>
      )}

      {/* Yellow Banner (Remains Unchanged) */}
      <YellowBanner />
    </section>
  );
}

export default Carousel_item;
