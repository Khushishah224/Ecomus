import React from 'react'
import img1 from "../../assets/IMAGES/collection-1.jpg"
import img2 from "../../assets/IMAGES/collection-2.jpg"
const ShopSection = () => {
    return (
        <div className="container py-5">
            {/* Top Section */}
            <div className="row gap-2">
                {/* Shop Layouts */}
                <div className="col-md-2">
                    <h5 className="fw-bold mb-3">SHOP LAYOUTS</h5>
                    <ul className="list-unstyled">
                        <li className='mb-3'>Default</li>
                        <li className='mb-3'>Left sidebar</li>
                        <li className='mb-3'>Right sidebar</li>
                        <li className='mb-3'>Fullwidth</li>
                        <li className='mb-3'>Sub collection</li>
                        <li className='mb-3'>Collections list</li>
                    </ul>
                </div>

                {/* Features */}
                <div className="col-md-2">
                    <h5 className="fw-bold mb-3">FEATURES</h5>
                    <ul className="list-unstyled">
                        <li className='mb-3'>Pagination links</li>
                        <li className='mb-3'>Pagination loadmore</li>
                        <li className='mb-3'>Pagination infinite scrolling</li>
                        <li className='mb-3'>Filter sidebar</li>
                        <li className='mb-3'>Filter hidden</li>
                    </ul>
                </div>

                {/* Product Styles */}
                <div className="col-md-2">
                    <h5 className="fw-bold mb-3">PRODUCT STYLES</h5>
                    <ul className="list-unstyled">
                        <li className='mb-3'>Product style list</li>
                        <li className='mb-3'>Product style 01</li>
                        <li className='mb-3'>Product style 02</li>
                        <li className='mb-3'>Product style 03</li>
                        <li className='mb-3'>Product style 04</li>
                        <li className='mb-3'>Product style 05</li>
                        <li className='mb-3'>Product style 06</li>
                        <li className='mb-3'>Product style 07</li>
                    </ul>
                </div>
                <div className="row col-md-6">
                    {/* Men Card */}


                    <div className="col-md-6">
                        <div className="card hover-card">
                            <img
                                src= {img1}// Replace with actual image URL for Men
                                className="img-fluid"
                                alt="Men"
                            />
                            <div className="card-img-overlay d-flex align-items-end justify-content-center">
                                <button className="btn btn-light">Men</button>
                            </div>
                        </div>
                    </div>

                    {/* Women Card */}
                    <div className="col-md-6">
                        <div className="card hover-card">
                            <img
                                src= {img2}// Replace with actual image URL for Women
                                className="img-fluid"
                                alt="Women"
                            />
                            <div className="card-img-overlay d-flex align-items-end justify-content-center">
                                <button className="btn btn-light">Women</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default ShopSection;