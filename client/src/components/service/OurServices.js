import React from 'react'

import { IoCubeOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

import "../../styles/OurServices.css";

function OurServices() {
    return (
        <section id="our-services">
            <div className='our-services-container'>

                {/* Mobile screen */}
                <div className="d-md-none text-center">
                    <Swiper
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className}" style="background-color: black; border-radius: 50%; width: 12px; height: 12px; display: inline-block; margin: 0 4px;"></span>`;
                            },
                        }}
                        className="mySwiper"
                        modules={[Pagination]} // Include Pagination module
                    >
                        <SwiperSlide>
                            <div className='service-card'>
                                <div className="service-icon">
                                    <IoCubeOutline />
                                </div>
                                <h5>Free Shipping</h5>
                                <p>Free shipping over order $120</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='service-card'>
                                <div className="service-icon">
                                    <MdOutlinePayment />
                                </div>
                                <h5>Flexible Payment</h5>
                                <p>Pay with Multiple Credit Cards</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='service-card'>
                                <div className="service-icon">
                                    <IoMdReturnLeft />
                                </div>
                                <h5>14 Day Returns</h5>
                                <p>Within 30 days for an exchanges</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='service-card'>
                                <div className="service-icon">
                                    <BiSupport />
                                </div>
                                <h5>Premium Support</h5>
                                <p>Outstanding premium support</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* For Medium and Large Screens */}
                <div className="d-none d-md-flex row g-4 justify-content-center align-items-center align-content-center text-center">
                    <div className="col-md-6 col-lg-3">
                        <div className='service-card'>
                            <div className="service-icon">
                                <IoCubeOutline />
                            </div>
                            <h5>Free Shipping</h5>
                            <p>Free shipping over order $120</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className='service-card'>
                            <div className="service-icon">
                                <MdOutlinePayment />
                            </div>
                            <h5>Flexible Payment</h5>
                            <p>Pay with Multiple Credit Cards</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className='service-card'>
                            <div className="service-icon">
                                <IoMdReturnLeft />
                            </div>
                            <h5>14 Day Returns</h5>
                            <p>Within 30 days for an exchanges</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className='service-card'>
                            <div className="service-icon">
                                <BiSupport />
                            </div>
                            <h5>Premium Support</h5>
                            <p>Outstanding premium support</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurServices;