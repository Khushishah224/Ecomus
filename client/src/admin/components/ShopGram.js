import React, { useState } from "react";
import "../styles/shopgram.css";
import Sidebar from "./Sidebar.js";
import { FaImage, FaUpload } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
// Import images directly
import gallery7 from '../../assets/IMAGES/gallery-7.jpg';
import gallery3 from '../../assets/IMAGES/gallery-3.jpg';
import gallery5 from '../../assets/IMAGES/gallery-5.jpg';
import gallery8 from '../../assets/IMAGES/gallery-8.jpg';
import gallery6 from '../../assets/IMAGES/gallery-6.jpg';

const ShopGram = () => {
  const productsByCategory = {
    Accessories: [
      { id: 1, name: "Sunglasses", price: "$149", category: "Accessories" },
      { id: 3, name: "Summer Hat", price: "$89", category: "Accessories" },
      { id: 6, name: "Elegant Watch", price: "$299", category: "Accessories" }
    ],
    Bags: [
      { id: 2, name: "Tote Bag", price: "$299", category: "Bags" },
      { id: 7, name: "Leather Handbag", price: "$399", category: "Bags" },
      { id: 8, name: "Crossbody Bag", price: "$249", category: "Bags" }
    ],
    Shoes: [
      { id: 4, name: "Ankle Boots", price: "$199", category: "Shoes" },
      { id: 5, name: "Platform Sneakers", price: "$159", category: "Shoes" },
      { id: 9, name: "High Heels", price: "$179", category: "Shoes" }
    ],
    Clothing: [
      { id: 10, name: "Summer Dress", price: "$129", category: "Clothing" },
      { id: 11, name: "Denim Jacket", price: "$189", category: "Clothing" },
      { id: 12, name: "Silk Blouse", price: "$149", category: "Clothing" }
    ]
  };

  const initialProductData = [
    { id: 1, name: "Sunglasses", price: "$149", category: "Accessories" },
    { id: 2, name: "Tote Bag", price: "$299", category: "Bags" },
    { id: 3, name: "Summer Hat", price: "$89", category: "Accessories" },
    { id: 4, name: "Ankle Boots", price: "$199", category: "Shoes" },
    { id: 5, name: "Platform Sneakers", price: "$159", category: "Shoes" }
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState(initialProductData);
  const [images, setImages] = useState([gallery7, gallery3, gallery5, gallery8, gallery6]);
  const [editedProducts, setEditedProducts] = useState(initialProductData);
  const [selectedFiles, setSelectedFiles] = useState(Array(5).fill(null));

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = file.name;
      setSelectedFiles(newSelectedFiles);

      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...images];
        newImages[index] = event.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (index, newCategory) => {
    if (newCategory && productsByCategory[newCategory]) {
      const categoryProducts = productsByCategory[newCategory];
      const selectedProduct = categoryProducts[0];
      
      const updatedProducts = [...editedProducts];
      updatedProducts[index] = selectedProduct;
      setEditedProducts(updatedProducts);
    }
  };

  const handleProductChange = (index, productId) => {
    const selectedProduct = productsByCategory[editedProducts[index].category].find(
      p => p.id === parseInt(productId)
    );
    if (selectedProduct) {
      const updatedProducts = [...editedProducts];
      updatedProducts[index] = selectedProduct;
      setEditedProducts(updatedProducts);
    }
  };

  const handleSave = () => {
    setProducts(editedProducts);
    toast.success("Changes saved successfully!");
    setIsEditing(false);
    setSelectedFiles(Array(5).fill(null));
  };

  const handleEdit = () => {
    setEditedProducts([...products]);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedProducts([...products]);
    setIsEditing(false);
    setSelectedFiles(Array(5).fill(null));
  };

  return (
    <div className="admin-shoplook-container">
      <Sidebar />
      <div className="admin-shoplook-content">
        <Toaster />
        <div className="admin-shoplook-header">
          <h2 className="admin-shoplook-title">Shop Gram</h2>
          <button 
            className="admin-shoplook-edit-btn" 
            onClick={isEditing ? handleCancel : handleEdit}
          >
            {isEditing ? "Cancel Edit" : "Edit Shop Gram"}
          </button>
        </div>
        
        <p className="admin-shoplook-instruction">
          Inspire and let yourself be inspired, from one unique fashion to another.
        </p>

        <div className="admin-shoplook-images-container shop-gram-grid">
          {products.map((product, index) => (
            <div key={product.id} className="admin-shoplook-card">
              {isEditing && (
                <div className="image-upload-container">
                  <label className="image-upload-label">
                    <div className="upload-content">
                      <FaUpload className="upload-icon" />
                      <span className="upload-text">
                        {selectedFiles[index] ? selectedFiles[index] : "Choose Image"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index)}
                      className="admin-shoplook-input"
                    />
                  </label>
                </div>
              )}
              
              <div className="admin-shoplook-image-wrapper">
                <img
                  src={images[index]}
                  alt={`Shop gram ${index + 1}`}
                  className="admin-shoplook-image"
                />
                {!isEditing && (
                  <div className="shop-gram-details">
                    <h3>{product.name}</h3>
                    <p className="price">{product.price}</p>
                    <p className="category">{product.category}</p>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="shop-gram-edit-controls">
                  <select 
                    value={editedProducts[index].category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                    className="shop-gram-select"
                  >
                    <option value="">Select Category</option>
                    {Object.keys(productsByCategory).map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  
                  {editedProducts[index].category && (
                    <select
                      value={editedProducts[index].id}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="shop-gram-select product-select"
                    >
                      {productsByCategory[editedProducts[index].category].map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} - {p.price}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  <div className="shop-gram-product-info">
                    <h3>{editedProducts[index].name}</h3>
                    <p className="price">{editedProducts[index].price}</p>
                    <p className="category">{editedProducts[index].category}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button className="admin-shoplook-save-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopGram;