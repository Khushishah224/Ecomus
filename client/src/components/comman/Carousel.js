// import Carousel from 'react-bootstrap/Carousel';

// import FashionSlide1 from '../../assets/IMAGES/fashion-slideshow-01.jpg';
// import FashionSlide2 from '../../assets/IMAGES/fashion-slideshow-02.jpg';
// import FashionSlide3 from '../../assets/IMAGES/fashion-slideshow-03.jpg';
// import '../../styles/Carousel.css';
// import { FaArrowRight } from 'react-icons/fa'; // FontAwesome right arrow icon

// function Carousel_item() {
//   return (
//     <div>
//     <Carousel >
//       {/* First Slide */}
//       <Carousel.Item >
//         <img
//           className="d-block w-100"
//           src={FashionSlide1}
//           alt="First slide"
//         />
//         <Carousel.Caption className="carousel-caption-left justify-content-left">
//           <h1>Glamorous<br /> Glam</h1>
//           <p>From casual to Formal, We have got you covered</p>
//           <button className="btn btn-lg btn-dark d-flex align-items-center">
//             Shop Collection <FaArrowRight className="ms-2" />
//           </button>
//         </Carousel.Caption>
//       </Carousel.Item>

//       {/* Second Slide */}
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src={FashionSlide2}
//           alt="Second slide"
//         />
//         <Carousel.Caption className="carousel-caption-left ">
//           <h1>Glamorous<br /> Glam</h1>
//           <p>From casual to Formal, We have got you covered</p>
//           <button className="btn btn-lg btn-dark d-flex align-items-center">
//             Shop Collection <FaArrowRight className="ms-2" />
//           </button>
//         </Carousel.Caption>
//       </Carousel.Item>

//       {/* Third Slide */}
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src={FashionSlide3}
//           alt="Third slide"
//         />
//         <Carousel.Caption className="carousel-caption-left">
//           <h1>Glamorous<br /> Glam</h1>
//           <p>From casual to Formal, We have got you covered</p>
//           <button className="btn btn-lg btn-dark d-flex align-items-center">
//             Shop Collection <FaArrowRight className="ms-2" />
//           </button>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
    
//      {/* Yellow Banner */}
//      <div className="yellow-banner">
//         <p>
//           ⚡ Spring Clearance Event: Save Up to 70% ⚡ Spring Clearance Event: Save Up to 70% ⚡
//         </p>
//       </div>

//     </div>
//   );
// }

// export default Carousel_item;


import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsFillLightningChargeFill } from "react-icons/bs"; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import fashionSlideshow01 from '../../assets/IMAGES/fashion-slideshow-01.jpg';
import fashionSlideshow02 from '../../assets/IMAGES/fashion-slideshow-02.jpg';
import fashionSlideshow03 from '../../assets/IMAGES/fashion-slideshow-03.jpg';

import '../../styles/Carousel.css';
import { IoIosArrowForward } from "react-icons/io";

// import required modules
import { Pagination } from 'swiper/modules';

export default function Carousel_item() {
  return ( 
    <section id='carousel_item'>
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
        <SwiperSlide>
          <div className="slide-container">
            <img src={fashionSlideshow01} alt="Img01" className="slide-image" />
            <div className="slide-content">
              <h5>Glamorous</h5>
              <h5>Glam</h5>
              <p>From casual to formal, we've got you covered</p>
              <button className="btn btn-dark d-flex align-items-center">
                Shop Collection
                <IoIosArrowForward className="ms-2" />
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <img src={fashionSlideshow02} alt="Img02" className="slide-image" />
            <div className="slide-content">
              <h5>Summer Style</h5>
              <h5>Sensations</h5>
              <p>From casual to formal, we've got you covered</p>
              <button className="btn btn-dark d-flex align-items-center">
                Shop Collection
                <IoIosArrowForward className="ms-2" />
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <img src={fashionSlideshow03} alt="Img03" className="slide-image" />
            <div className="slide-content">
              <h5>Elegance</h5>
              <p>From casual to formal, we've got you covered</p>
              <button className="btn btn-dark d-flex align-items-center">
                Shop Collection
                <IoIosArrowForward className="ms-2" />
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Yellow Banner */}
      <div className="yellow-banner">
        <p>
          <span><BsFillLightningChargeFill/></span> Spring Clearance Event: Save Up to 70% <span><BsFillLightningChargeFill/></span> Spring Clearance Event: Save Up to 70% <span><BsFillLightningChargeFill/></span>
        </p>
      </div>
    </section>
  );
}


