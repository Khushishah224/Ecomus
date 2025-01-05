import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import img1 from '../../assets/IMAGES/gallery-7.jpg';
import img2 from '../../assets/IMAGES/gallery-3.jpg';
import img3 from '../../assets/IMAGES/gallery-5.jpg';
import img4 from '../../assets/IMAGES/gallery-8.jpg';
import img5 from '../../assets/IMAGES/gallery-6.jpg';

import { RiShoppingBag2Line } from "react-icons/ri";

import '../../styles/ShopGram.css';

function ShopGram() {
    const images = [img1, img2, img3, img4, img5];
    return (
        <section id="shop-gram">
            <div className="shop-gram-header text-center my-5">
                <h1>Shop Gram</h1>
                <p>Inspire and let yourself be inspired, from one unique fashion to another.</p>
            </div>
            <div className="shop-gram-slider">
                {/* Swiper component for responsive images */}
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{

                        1024: {
                            slidesPerView: 5, // 5 images in a row
                        },
                        // when window width is >= 768px (medium screens)
                        768: {
                            slidesPerView: 3, // 3 images in a row
                        },
                        // when window width is < 768px (mobile screens)
                        0: {
                            slidesPerView: 2, // 2 images in a row
                        },
                    }}
                    modules={[Pagination]} // Include the Pagination module
                    className="mySwiper"
                >

                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="shop-image-icon">
                                <img src={image} alt={`Gallery ${index + 1}`} className="gallery-image" />
                                <div className="shop-icon"><RiShoppingBag2Line /></div>
                            </div>
                        </SwiperSlide>
                    ))}


                </Swiper>
            </div>
        </section>
    );
}

export default ShopGram;
