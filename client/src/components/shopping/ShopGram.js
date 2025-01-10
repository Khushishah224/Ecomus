import React, { useState } from 'react';
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
import ShoppingBagPopup from '../modals/ShoppingBagPopup';// Import your popup component

import '../../styles/ShopGram.css';

function ShopGram() {
    const images = [
        { image: img1, name: "Product 1", price: "$25.00", colors: ["red", "blue"], size: ["S", "M", "L"] },
        { image: img2, name: "Product 2", price: "$30.00", colors: ["green", "black"], size: ["M", "L"] },
        { image: img3, name: "Product 3", price: "$20.00", colors: ["yellow", "white"], size: ["S", "M"] },
        { image: img4, name: "Product 4", price: "$15.00", colors: ["blue", "black"], size: ["M"] },
        { image: img5, name: "Product 5", price: "$40.00", colors: ["pink", "gray"], size: ["L", "XL"] },
    ];

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenPopup = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedProduct(null);
    };

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
                        768: {
                            slidesPerView: 3, // 3 images in a row
                        },
                        0: {
                            slidesPerView: 2, // 2 images in a row
                        },
                    }}
                    modules={[Pagination]} // Include the Pagination module
                    className="mySwiper"
                >
                    {images.map((product, index) => (
                        <SwiperSlide key={index}>
                            <div className="shop-image-icon">
                                <img src={product.image} alt={`Gallery ${index + 1}`} className="gallery-image" />
                                <div
                                    className="shop-icon"
                                    onClick={() => handleOpenPopup(product)} // Open popup with product details
                                >
                                    <RiShoppingBag2Line />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Render the popup if it's open */}
            {isPopupOpen && (
                <ShoppingBagPopup product={selectedProduct} onClose={handleClosePopup} />
            )}
        </section>
    );
}

export default ShopGram;
