import React, { useState } from "react";
import "../../styles/BestSeller.css"; // Ensure this is an external CSS file
import img1 from '../../assets/IMAGES/orange-1.jpg';
import img1w from '../../assets/IMAGES/white-1.jpg';
import img2 from "../../assets/IMAGES/brown.jpg";
import img3 from "../../assets/IMAGES/white-3.jpg";
import simg3 from "../../assets/IMAGES/white-4.jpg";
import img4 from "../../assets/IMAGES/white-2.jpg";
import img5 from "../../assets/IMAGES/brown-2.jpg";
import simg5 from "../../assets/IMAGES/brown-3.jpg";
import img6 from "../../assets/IMAGES/light-green-1.jpg";
import simg6 from "../../assets/IMAGES/light-green-2.jpg";
import img7 from "../../assets/IMAGES/black-4.jpg";
import simg7 from "../../assets/IMAGES/black-5.jpg";
import img8 from "../../assets/IMAGES/white-8.jpg";

import ComparisonPopup from "../modals/ComparisonPopup"; 
import ShoppingBagPopup from "../modals/ShoppingBagPopup";
import ShowProductPopup from "../modals/ShowProductPopup"; // Import the new popup

import { RiShoppingBag2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { TbArrowsCross } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";

const BestSeller = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the selected product
  const [isShoppingBagPopupVisible, setIsShoppingBagPopupVisible] = useState(false);
  const [isShowProductPopupVisible, setIsShowProductPopupVisible] = useState(false);
  const [isComparisonPopupVisible, setIsComparisonPopupVisible] = useState(false);  // New state for ShowProductPopup
  const [selectedColors, setSelectedColors] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    { id: 1, name: "Ribbed Tank Top", price: "$16.95", image: img1, subimage:"" , size: ['S', 'L', 'XL'], colors: ["orange","white"] , colorImages: [img1, img1w] },
    { id: 2, name: "Ribbed modal T-shirt", price: "$18.95", image: img2, subimage:"", size: ['S', 'L', 'XL'], colors: ["white", "pink", "green"], saleTime: "11d : 15h : 50m : 02s" },
    { id: 3, name: "Oversized Printed T-shirt", price: "$10.00", image: img3, subimage: simg3, size: ['S', 'L', 'XL'], colors: ["black", "pink", "white"] },
    { id: 4, name: "Oversized Printed T-shirt", price: "$16.95", image: img4, subimage:"", size: ['S', 'L', 'XL'], colors: ["black", "pink", "white"] },
    { id: 5, name: "Oversized Printed T-shirt", price: "$16.95", image: img5, subimage: simg5, size: ['S', 'L', 'XL'], colors: ["white", "pink", "black"] },
    { id: 6, name: "Oversized Printed T-shirt", price: "$16.95", image: img6, subimage: simg6, size: ['S', 'L', 'XL'], colors: ["black", "pink", "white"] },
    { id: 7, name: "Oversized Printed T-shirt", price: "$16.95", image: img7, subimage: simg7, size: ['S', 'L', 'XL'], colors: ["black", "pink", "white"] },
    { id: 8, name: "Oversized Printed T-shirt", price: "$16.95", image: img8, subimage:"", size: ['S', 'L', 'XL'], colors: ["black", "pink", "white"] },
  ];

  const handleOpenShoppingBagPopup = (product) => {
    closeAllPopups();
    setSelectedProduct(product);
    setIsShoppingBagPopupVisible(true);
  };

  const handleOpenShowProductPopup = (product) => {
    closeAllPopups();
    setSelectedProduct(product);
    setIsShowProductPopupVisible(true);
  };
  const handleOpenComparisonPopup = (product) => {
    setSelectedProduct(product);
    setIsComparisonPopupVisible(true);
  };
  const closeAllPopups = () => {
    setIsShoppingBagPopupVisible(false);
    setIsShowProductPopupVisible(false);
    setIsComparisonPopupVisible(false);
    setSelectedProduct(null);
  };

  const handleColorSelect = (productId, color) => {
    setSelectedColors((prevState) => ({
      ...prevState,
      [productId]: color,
    }));
  };

  // console.log("in bestseller",selectedProduct.index);


  return (
    <section className="bestseller-section px-4" style={{ marginTop: "5rem" }}>
      <div className="text-center mb-4">
        <h1>Best Seller</h1>
        <p>Shop the Latest Styles: Stay ahead of the curve with our newest arrivals</p>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <div className="product-card border-0 text-center">
              <div
                className="product-image-wrapper"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <img
                  src={hoveredProduct === product.id && product.subimage ? product.subimage : product.image}
                  className="product-image"
                  
                  alt={product.name}
                />

                {product.saleTime && (
                  <div className="product-sale-time">{product.saleTime}</div>
                )}

                <div className="product-icons">
                  <button className="icon-btn" onClick={() => handleOpenShoppingBagPopup(product)}>
                    <RiShoppingBag2Line />
                  </button>
                  <button className="icon-btn icon-hide">
                    <FaRegHeart />
                  </button>
                  <button className="icon-btn icon-hide" onClick={()=>handleOpenComparisonPopup(product)}>
                    <TbArrowsCross />
                  </button>
                  <button className="icon-btn" onClick={() => handleOpenShowProductPopup(product)}>
                    <IoEyeOutline />
                  </button>
                </div>
                {product.size && (
                  <div className="product-size-overlay d-flex justify-content-center gap-2">
                    {product.size.map((size, index) => (
                      <span className="product_size text-white d-flex justify-content-center align-items-center" key={index} style={{ width: "30px" }}>{size}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="fw-bold">{product.price}</p>
                <div className="product-colors">
                  <div className="d-flex gap-2 mt-1">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className="rounded-circle"
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: color,
                          border:
                            selectedColors[product.id] === color
                              ? "2px solid black"
                              : "1px solid #ddd",
                        }}
                        onClick={() => handleColorSelect(product.id, color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="load-more d-flex justify-content-center my-4 p-2">
        <button className="py-2 px-3 bg-white">Load More</button>
      </div>

      {isShoppingBagPopupVisible && selectedProduct && (
        <ShoppingBagPopup product={selectedProduct} onClose={closeAllPopups} />
      )}
      {isShowProductPopupVisible && selectedProduct && (
        <ShowProductPopup products={products} initialProductIndex={selectedProduct.id} onClose={closeAllPopups} />
      )}
       {isComparisonPopupVisible && selectedProduct && (
        <ComparisonPopup
          product={selectedProduct}
          onClose={closeAllPopups}
        />
      )}
    </section>
  );
};

export default BestSeller;

