import React from 'react';
import '../../styles/HomeSection.css'; // Custom CSS for hover effects
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import img1 from "../../assets/IMAGES/home-01.jpg"
import img2 from "../../assets/IMAGES/home-02.jpg"
import img3 from "../../assets/IMAGES/home-03.jpg"
import img4 from "../../assets/IMAGES/home-04.jpg"
import img5 from "../../assets/IMAGES/home-05.jpg"
import img7 from "../../assets/IMAGES/home-07.jpg"
import img6 from "../../assets/IMAGES/home-06.jpg"
import img8 from "../../assets/IMAGES/home-08.jpg"
import img9 from "../../assets/IMAGES/home-accessories.jpg"
import img10 from "../../assets/IMAGES/home-activewear.jpg"
import img11 from "../../assets/IMAGES/home-baby.jpg"
import img12 from "../../assets/IMAGES/home-decor.jpg"
const HomeSection = () => {
    return (
        <div className="container pt-4" >
            <div className="row text-center ">
                <div className="col-md-2">
                    <div className="hover-card">

                        <img
                            src={img1}
                            alt="Home Fashion"
                            className="img-fluid rounded "
                            style={{ width: '180px' }}
                        />
                        <h5>Home Fashion 03</h5>
                        <div className="hover-overlay">
                            <Link to="/" className="btn btn-outline-info mt-2">Explore</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img2}
                            alt="Personalized Pod"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Personalized Pod</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img3}
                            alt="Pickleball"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Pickleball</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img4}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img5}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img6}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img7}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img8}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img9}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img10}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img11}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="hover-card">
                        <img
                            src={img12}
                            alt="Ceramic"
                            className="img-fluid rounded"
                            style={{ width: '180px' }}
                        />
                        <h5>Home Ceramic</h5>
                        <div className="hover-overlay">
                            <button className="btn btn-outline-info mt-2">Explore</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' d-flex align-items-center justify-content-center mb-3'>
                <button className='btn btn-dark'>View all demos (39+) <MdKeyboardArrowRight size={24} /> </button>
            </div>
        </div>
    );
};

export default HomeSection;