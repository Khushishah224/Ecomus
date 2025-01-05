import React, { useState } from "react";
import "../../styles/modals/ShopSideBar.css";
import Img1 from "../../assets/IMAGES/cate1.jpg";
import Img2 from "../../assets/IMAGES/cate2.jpg";
import Img3 from "../../assets/IMAGES/cate3.jpg";
import Img4 from "../../assets/IMAGES/cate4.png";
import Img5 from "../../assets/IMAGES/cate5.jpg";
import Img6 from "../../assets/IMAGES/cate6.jpg";
import Img7 from "../../assets/IMAGES/cate7.jpg";
import Img8 from "../../assets/IMAGES/cate8.jpg";
import Img9 from "../../assets/IMAGES/cate9.jpg";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

function ShopSideBar({ show, onClose }) {
    const [expanded, setExpanded] = useState({});

    if (!show) {
        return null;
    }

    const toggleExpand = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const options = [
        { id: 1, Image: Img1, name: "Accessories", Issubdetail: false },
        { id: 2, Image: Img2, name: "Dog", Issubdetail: false },
        { id: 3, Image: Img3, name: "Grocery", Issubdetail: false },
        { id: 4, Image: Img4, name: "Handbag", Issubdetail: false },
        {
            id: 5,
            Image: Img5,
            name: "Fashion",
            Issubdetail: true,
            subdetail: [
                {
                    id: 51, // Unique ID for "Mans" under "Fashion"
                    Image: Img6,
                    name: "Mans",
                    Issubdetail: true,
                    subdetail: [
                        { id: 511, Image: Img1, name: "Accessories", Issubdetail: false }, // Unique ID
                        { id: 512, Image: Img8, name: "Shoes", Issubdetail: false }, // Unique ID
                    ],
                },
                {
                    id: 52, // Unique ID for "Womens" under "Fashion"
                    Image: Img6,
                    name: "Womens",
                    Issubdetail: true,
                    subdetail: [
                        { id: 521, Image: Img3, name: "HandBag", Issubdetail: false }, // Unique ID
                        { id: 522, Image: Img7, name: "Tee", Issubdetail: false }, // Unique ID
                    ],
                },
            ],
        },
        {
            id: 6,
            Image: Img6,
            name: "Mans",
            Issubdetail: true,
            subdetail: [
                { id: 61, Image: Img1, name: "Accessories", Issubdetail: false }, // Unique ID
                { id: 62, Image: Img8, name: "Shoes", Issubdetail: false }, // Unique ID
            ],
        },
        { id: 7, Image: Img7, name: "Tee", Issubdetail: false },
        { id: 8, Image: Img8, name: "Shoes", Issubdetail: false },
        {
            id: 9,
            Image: Img9,
            name: "Women",
            Issubdetail: true,
            subdetail: [
                { id: 91, Image: Img3, name: "HandBag", Issubdetail: false }, // Unique ID
                { id: 92, Image: Img7, name: "Tee", Issubdetail: false }, // Unique ID
            ],
        },
    ];


    const renderSubdetails = (subdetails, width) => {

        return subdetails.map((sub, index) => (
            <div key={index} className="nested-subdetails">
                <div className="d-flex nested-sidebar-card" style={{ width: width }}>
                    <img src={sub.Image} className="sidebar-image" alt={sub.name} />
                    <a className="sidebar-name flex-grow-1">{sub.name}</a>
                    {sub.Issubdetail && (
                        <button
                            className="plus-button"
                            onClick={() => toggleExpand(sub.id)}
                        >
                            {expanded[sub.id] ? <FaMinus /> : <FaPlus />}
                        </button>
                    )}
                </div>
                {sub.Issubdetail && expanded[sub.id] && (
                    <div className="subdetails">{renderSubdetails(sub.subdetail, '190px')}</div>
                )}
            </div>
        ));
    };

    return (
        <>
            <div className="shopsidebarpopup">
                <div className="d-flex sidebar">
                    <button className="sidebar-button" onClick={onClose}>
                        &times;
                    </button>
                    <div className="sidebar-content">
                        {options.map((option) => (
                            <div key={option.id} className="sidebar-item">
                                <div className="d-flex sidebar-card">
                                    <img
                                        src={option.Image}
                                        className="sidebar-image"
                                        alt={option.name}
                                    />
                                    <div className="sidebar-name-div flex-grow-1">
                                    <a className="sidebar-name">{option.name}</a>
                                    {option.Issubdetail && (
                                        <button
                                            className="plus-button"
                                            onClick={() => toggleExpand(option.id)}
                                        >
                                            {expanded[option.id] ? <FaMinus /> : <FaPlus />}
                                        </button>
                                    )}
                                    </div>
                                </div>
                                {option.Issubdetail && expanded[option.id] && (
                                    <div className="subdetails">

                                        {renderSubdetails(option.subdetail, '270px')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="shop-collection-button-div">
                        <a className="shop-collection-button">View All Collection<MdArrowOutward /></a>
                    </div>
                </div>

            </div>

        </>
    );
}

export { ShopSideBar };