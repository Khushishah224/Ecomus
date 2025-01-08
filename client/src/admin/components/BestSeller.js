import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTimes } from 'react-icons/fa';
import "../styles/bestseller.css";
import Sidebar from "../components/Sidebar.js";

const BestSeller = () => {
  const [product, setProduct] = useState({
    name: '',
    colors: [],
    sizes: [],
    price: '',
    active: true
  });

  const [newColor, setNewColor] = useState('#000000');
  const [newSize, setNewSize] = useState('');
  const [error, setError] = useState('');

  // Standard sizes for clothing
  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddColor = () => {
    if (!product.colors.includes(newColor)) {
      setProduct({
        ...product,
        colors: [...product.colors, newColor]
      });
      setError('');
    } else {
      setError('This color has already been added');
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setProduct({
      ...product,
      colors: product.colors.filter(color => color !== colorToRemove)
    });
  };

  const handleAddSize = () => {
    if (newSize && !product.sizes.includes(newSize)) {
      setProduct({
        ...product,
        sizes: [...product.sizes, newSize]
      });
      setNewSize('');
      setError('');
    } else {
      setError('Please enter a valid size that hasn\'t been added yet');
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter(size => size !== sizeToRemove)
    });
  };

  const handleQuickAddSize = (size) => {
    if (!product.sizes.includes(size)) {
      setProduct({
        ...product,
        sizes: [...product.sizes, size]
      });
    }
  };

  return (

    <div className="add-category-form">
        <Sidebar />
      <h3>Add Best Seller Product</h3>
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
      
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Colors</label>
        <div className="color-picker-container">
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="color-input"
          />
          <button
            className="primary-button"
            onClick={handleAddColor}
            type="button"
          >
            <FaPlus /> Add Color
          </button>
        </div>
        <div className="selected-colors">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="color-pill"
              style={{ backgroundColor: color }}
            >
              <span className="color-hex">{color}</span>
              <button
                onClick={() => handleRemoveColor(color)}
                className="remove-color"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Sizes</label>
        <div className="quick-size-buttons">
          {commonSizes.map((size) => (
            <button
              key={size}
              className={`size-button ${product.sizes.includes(size) ? 'selected' : ''}`}
              onClick={() => handleQuickAddSize(size)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
        <div className="custom-size-input">
          <input
            type="text"
            placeholder="Enter custom size"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value.toUpperCase())}
          />
          <button
            className="primary-button"
            onClick={handleAddSize}
            type="button"
          >
            <FaPlus /> Add Size
          </button>
        </div>
        <div className="selected-sizes">
          {product.sizes.map((size, index) => (
            <div key={index} className="size-pill">
              {size}
              <button
                onClick={() => handleRemoveSize(size)}
                className="remove-size"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          placeholder="Enter price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </div>

      <div className="form-actions">
        <button
          className="secondary-button"
          onClick={() => {
            setProduct({ name: '', colors: [], sizes: [], price: '', active: true });
            setNewColor('#000000');
            setNewSize('');
            setError('');
          }}
          type="button"
        >
          Cancel
        </button>
        <button
          className="primary-button"
          type="button"
        >
          <FaPlus /> Add Product
        </button>
      </div>
    </div>
  );
};

export default BestSeller;