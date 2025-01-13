import React, { useState, useEffect } from "react";
import "./Clothing.css";
import MainNavbar from '../comman/MainNavbar.js';

// import { Whishlist } from "../comman/MainNavbar.js";
import { RiShoppingBag2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { TbArrowsCross } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";

const ProductCard = ({ product }) => {
  const variant = product.variants[0]; // Using first variant as default
  const baseUrl = "http://localhost:5000"; // Backend server URL

  // const [isShoppingBagPopupVisible, setIsShoppingBagPopupVisible] = useState(false);
  // const [isShowProductPopupVisible, setIsShowProductPopupVisible] = useState(false);
  // const [isComparisonPopupVisible, setIsComparisonPopupVisible] = useState(false);
  // const [hoveredProduct, setHoveredProduct] = useState(null);
  // const [showWhishlist, setShowWhishlist] = useState(false);

  const uniqueColors = [
    ...new Set(product.variants.map((variant) => variant.color)),
  ];

  return (
    <div className="new-arrival-product-card">
      <div className="new-arrival-product-image">
        <img
          src={`${baseUrl}${variant.images.front}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        {variant.stockStatus === "Low Stock" && (
          <span className="new-arrival-stock-badge">Low Stock</span>
        )}
        <div className="new-arrival-product-icons-clothing">
          <button className="new-arrival-icon-btn-clothing" >
            <RiShoppingBag2Line />
          </button>
          {/* Add to Wishlist */}
          <button
            className="new-arrival-icon-btn-clothing"

            type="button"
          >
            <FaRegHeart />
          </button>
          <button className="new-arrival-icon-btn-clothing new-arrival-icon-hide-clothing" >
            <TbArrowsCross />
          </button>
          <button className="new-arrival-icon-btn-clothing" >
            <IoEyeOutline />
          </button>
        </div>
        {variant.sizes && (
          <div className="new-arrival-product-size-overlay-clothing d-flex justify-content-center gap-2">
            {variant.sizes.map(size => (
              <span key={size.size} className="text-white d-flex justify-content-center align-items-center" style={{ width: "30px" }}>
                {size.size}
              </span>
            ))}
          </div>
        )}
      </div>


      <div className="new-arrival-product-info">
        <h3 className="new-arrival-product-name">{product.name}</h3>
        {/* <p className="product-category">{product.category}</p> */}
        <div className="new-arrival-product-details">
          <p className="new-arrival-product-price">

            {variant.sizes.length > 1 && "$" + variant.sizes[variant.sizes.length - 1].price.toFixed(2)}
          </p>
        </div>

        <div className="new-arrival-color-options">
          {uniqueColors.map((color, index) => (
            <label key={index} className="new-arrival-color-radio">
              <input
                type="radio"
                name={`color-${product._id}`}
                value={color}
              />
              <span
                className="new-arrival-color-box"
                style={{ "--color": color }}
              ></span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const Clothing = () => {
  const [gridOption, setGridOption] = useState(4);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        console.log("API Response:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set empty array if fetch fails
      }
    };

    fetchProducts();
  }, []);

  const handleGridChange = (option) => {
    setGridOption(option);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    const sortedProducts = [...products];
    switch (option) {
      case "price-low":
        sortedProducts.sort((a, b) =>
          a.variants[0].sizes[0].price - b.variants[0].sizes[0].price
        );
        break;
      case "price-high":
        sortedProducts.sort((a, b) =>
          b.variants[0].sizes[0].price - a.variants[0].sizes[0].price
        );
        break;
      // Add more sorting options as needed
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  return (
    <div>
      <MainNavbar />
      <section className="new-arrival">
        <div className="new-arrival-container">
          <div className="new-arrival-header">
            <h1>New Arrival</h1>
            <p>Shop through our latest selection of Fashion</p>
          </div>
        </div>
      </section>

      <div className="new-arrival-myownclothing">
        <div className="new-arrival-controls">
          <button className="new-arrival-filter-btn">
            <i className="new-arrival-icon-filter"></i> Filter
          </button>

          <div className="new-arrival-grid-options">
            <button
              className={`new-arrival-grid-btn ${gridOption === 1 ? "active" : ""}`}
              onClick={() => handleGridChange(1)}
            >
              <div className="new-arrival-dot-column">
                <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                  <rect x="7" y="2" width="12" height="1" fill="currentColor"></rect>
                </svg>
                <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                  <rect x="7" y="2" width="12" height="1" fill="currentColor"></rect>
                </svg>
              </div>
            </button>

            {[2, 3, 4, 5, 6].map((option) => (
              <button
                key={option}
                className={`new-arrival-grid-btn ${gridOption === option ? "active" : ""}`}
                onClick={() => handleGridChange(option)}
              >
                <div className="new-arrival-dot-pair">
                  {Array(option).fill().map((_, index) => (
                    <div key={index} className="new-arrival-dot-column">
                      <svg width="5" height="5" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                      </svg>
                      <svg width="5" height="5" viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                      </svg>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <select
            className="new-arrival-sort-dropdown"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        <div className={`new-arrival-products-grid new-arrival-grid-${gridOption}`}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clothing;