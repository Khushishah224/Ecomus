import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/HappyClient.css';

// Product Images
import image1 from '../../assets/IMAGES/img-p2.png';
import image2 from '../../assets/IMAGES/img-p3.png';
import image3 from '../../assets/IMAGES/img-p4.png';
import image4 from '../../assets/IMAGES/img-p5.png';
import image5 from '../../assets/IMAGES/img-p2.png';

//Brand Images
import brand1 from '../../assets/IMAGES/brand-01.png';
import brand2 from '../../assets/IMAGES/brand-02.png';
import brand3 from '../../assets/IMAGES/brand-03.png';
import brand4 from '../../assets/IMAGES/brand-04.png';
import brand5 from '../../assets/IMAGES/brand-05.png';
import brand6 from '../../assets/IMAGES/brand-06.png';

const HappyClient = () => {
    const [testimonialSwiperInstance, setTestimonialSwiperInstance] = useState(null);
    const [brandSwiperInstance, setBrandSwiperInstance] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
    const [activeBrandIndex, setActiveBrandIndex] = useState(0);
    const [screenSize, setScreenSize] = useState('desktop');

    const testimonials = [
        {
            id: 1,
            rating: 5,
            title: "Best Online Fashion Site",
            comment: "I finally found a web fashion site with stylish and flattering options in my size.",
            name: "Robert Smith",
            location: "USA",
            product: "Jersey thong body",
            price: "$105.95",
            image: image1
        },
        {
            id: 2,
            rating: 5,
            title: "Great Selection and Quality",
            comment: "I love the variety of styles and the high-quality clothing on this web fashion site.",
            name: "Allen Lyn",
            location: "France",
            product: "Cotton jersey top",
            price: "$7.95",
            image: image2,
        },
        {
            id: 3,
            rating: 5,
            title: "Best Customer Service",
            comment: "I finally found a web fashion site with stylish and flattering options in my size.",
            name: "Peter Rope",
            location: "USA",
            product: "Ribbed modal T-shirt",
            price: "From $18.95",
            image: image3,
        },
        {
            id: 4,
            rating: 5,
            title: "Best Customer Service",
            comment: "I finally found a web fashion site with stylish and flattering options in my size.",
            name: "Peter Rope",
            location: "USA",
            product: "Ribbed modal T-shirt",
            price: "From $18.95",
            image: image4,
        },
        {
            id: 5,
            rating: 5,
            title: "Best Customer Service",
            comment: "I finally found a web fashion site with stylish and flattering options in my size.",
            name: "Peter Rope",
            location: "USA",
            product: "Ribbed modal T-shirt",
            price: "From $18.95",
            image: image5,
        },
    ];

    const brands = [
        { id: 1, image: brand1 },
        { id: 2, image: brand2 },
        { id: 3, image: brand3 },
        { id: 4, image: brand4 },
        { id: 5, image: brand5 },
        { id: 6, image: brand6 },
    ];

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width < 576) {
                setScreenSize('mobile');
            } else if (width < 992) {
                setScreenSize('tablet');
            } else {
                setScreenSize('desktop');
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleTestimonialNext = () => {
        if (testimonialSwiperInstance) testimonialSwiperInstance.slideNext();
    };

    const handleTestimonialPrev = () => {
        if (testimonialSwiperInstance) testimonialSwiperInstance.slidePrev();
    };

    const handleTestimonialSlideChange = () => {
        if (testimonialSwiperInstance) {
            setIsBeginning(testimonialSwiperInstance.isBeginning);
            setIsEnd(testimonialSwiperInstance.isEnd);
            setActiveTestimonialIndex(testimonialSwiperInstance.activeIndex);
        }
    };

    const handleBrandSlideChange = () => {
        if (brandSwiperInstance) {
            setActiveBrandIndex(brandSwiperInstance.activeIndex);
        }
    };

    const handleTestimonialDotClick = (index) => {
        if (testimonialSwiperInstance) {
            testimonialSwiperInstance.slideTo(index);
        }
    };

    const handleBrandDotClick = (index) => {
        if (brandSwiperInstance) {
            brandSwiperInstance.slideTo(index);
        }
    };

    const renderStars = (rating) => {
        return [...Array(rating)].map((_, index) => (
            <span key={index} className="star">★</span>
        ));
    };

    const renderTestimonialDots = () => {
        if (screenSize !== 'mobile') return null;
        
        return (
            <div className="dot-navigation">
                {testimonials.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === activeTestimonialIndex ? 'active' : ''}`}
                        onClick={() => handleTestimonialDotClick(index)}
                    />
                ))}
            </div>
        );
    };

    const renderBrandDots = () => {
        if (screenSize === 'desktop') return null;

        const totalSlides = screenSize === 'mobile' 
            ? Math.ceil(brands.length / 2)
            : Math.ceil(brands.length / 3);

        return (
            <div className="dot-navigation">
                {[...Array(totalSlides)].map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === activeBrandIndex ? 'active' : ''}`}
                        onClick={() => handleBrandDotClick(index)}
                    />
                ))}
            </div>
        );
    };

    const testimonialSlidesPerView = screenSize === 'desktop' ? 3 : screenSize === 'tablet' ? 2 : 1;
    const brandSlidesPerView = screenSize === 'desktop' ? 6 : screenSize === 'tablet' ? 3 : 2;

    return (
        <div className="client-feedback-container">
            <div className="feedback-header">
                <h2 className="feedback-title">Happy Clients</h2>
                <p className="feedback-subtitle">Hear what they say about us</p>
                {screenSize !== 'mobile' && (
                    <div className="testimonial-navigation-group">
                        <button
                            className="testimonial-nav-button"
                            onClick={handleTestimonialPrev}
                            disabled={isBeginning}
                        >
                            <IoIosArrowBack size={20} />
                        </button>
                        <button
                            className="testimonial-nav-button"
                            onClick={handleTestimonialNext}
                            disabled={isEnd}
                        >
                            <IoIosArrowForward size={20} />
                        </button>
                    </div>
                )}
            </div>

            <div className="feedback-slider">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={testimonialSlidesPerView}
                    spaceBetween={20}
                    onSwiper={setTestimonialSwiperInstance}
                    onSlideChange={handleTestimonialSlideChange}
                    className="swiper-container"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="testimonial-card">
                                <div className="testimonial-content">
                                    <div className="rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <h3 className="testimonial-title">{testimonial.title}</h3>
                                    <p className="testimonial-comment">"{testimonial.comment}"</p>
                                    <div className="customer-info">
                                        <span className="customer-name">{testimonial.name}</span>
                                        <span className="customer-location">Customer from {testimonial.location}</span>
                                    </div>
                                </div>
                                <div className="product-section">
                                    <div className="product-image">
                                        <img src={testimonial.image} alt={testimonial.product} />
                                    </div>
                                    <div className="product-info">
                                        <h4 className="product-title">{testimonial.product}</h4>
                                        <span className="product-price">{testimonial.price}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {renderTestimonialDots()}
            </div>
        </div>
    );
};

export default HappyClient;


