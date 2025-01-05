import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

// Import brand logos
import brand1 from '../../assets/IMAGES/brand-01.png';
import brand2 from '../../assets/IMAGES/brand-02.png';
import brand3 from '../../assets/IMAGES/brand-03.png';
import brand4 from '../../assets/IMAGES/brand-04.png';
import brand5 from '../../assets/IMAGES/brand-05.png';
import brand6 from '../../assets/IMAGES/brand-06.png';

// Styles for the section
import '../../styles/BrandNameLogos.css';

function BrandNameLogos() {
  return (
    <section id="brand-name-logos" style={{ backgroundColor: 'white' }} className='mx-1'>
      
      <Swiper
        pagination={{
          clickable: true, 
        }}
        breakpoints={{
          // when window width is >= 1024px (large screens)
          1024: {
            slidesPerView: 6, // 6 logos in a row
          },
          // when window width is >= 768px (medium screens)
          768: {
            slidesPerView: 3, // 3 logos in a row
          },
          // when window width is < 768px (mobile screens)
          0: {
            slidesPerView: 2, // 2 logos in a row
          },
        }}
        modules={[Pagination]} // Include the Pagination module
        className="mySwiper"
      >
        {[brand1, brand2, brand3, brand4, brand5, brand6].map((brand, index) => (
          <SwiperSlide key={index}>
            
              <div className="logo-container-image">
              <img src={brand} alt={`Brand ${index + 1}`} className="brand-logo" />
              </div>
           
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default BrandNameLogos;