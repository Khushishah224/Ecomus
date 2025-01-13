import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaEdit, FaPlus, FaStar } from 'react-icons/fa';
import Sidebar from '../components/Sidebar.js';
import '../styles/bestseller.css'
const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [categories] = useState(['All', 'Clothing', 'Sunglasses', 'Bags', 'Shoes', 'Accessories']);
  const [subCategories] = useState({
    Clothing: ['Denim', 'Dress', 'Ethnic Wear', 'Formal Wear', 'Casual Wear', 'Western Wear', 'Sports Wear', 'Winter Wear'],
    Sunglasses: ['Aviator', 'Wayfarer', 'Round', 'Square', 'Oversized', 'Cat Eye', 'Sports', 'Luxury'],
    Bags: ['Handbags', 'Backpacks', 'Crossbody', 'Totes', 'Laptop Bags', 'Travel Bags', 'Clutches', 'Messenger'],
    Shoes: ['Sneakers', 'Boots', 'Flats', 'Heels', 'Sports', 'Formal', 'Casual', 'Sandals'],
    Accessories: ['Watches', 'Jewelry', 'Belts', 'Scarves', 'Wallets', 'Hats', 'Hair Accessories', 'Ties']
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Simulated initial best seller products
    setProducts([
      {
        id: 1,
        name: "Premium Denim Jeans",
        category: "Clothing",
        subCategory: "Denim",
        price: "1899",
        sales: "1.2k",
        rating: 4.8
      },
      {
        id: 2,
        name: "Classic Aviator Sunglasses",
        category: "Sunglasses",
        subCategory: "Aviator",
        price: "1299",
        sales: "950",
        rating: 4.7
      },
      {
        id: 3,
        name: "Designer Tote Bag",
        category: "Bags",
        subCategory: "Totes",
        price: "1999",
        sales: "850",
        rating: 4.9
      },
      {
        id: 4,
        name: "Running Shoes Pro",
        category: "Shoes",
        subCategory: "Sports",
        price: "2499",
        sales: "750",
        rating: 4.6
      },
      {
        id: 5,
        name: "Designer Watch Collection",
        category: "Accessories",
        subCategory: "Watches",
        price: "3999",
        sales: "500",
        rating: 4.8
      },
      {
        id: 6,
        name: "Evening Dress Special",
        category: "Clothing",
        subCategory: "Dress",
        price: "1599",
        sales: "680",
        rating: 4.7
      }
    ]);
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubCategory('');
  };

  useEffect(() => {
    if (searchQuery) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  const filteredProducts = searchQuery 
    ? searchResults
    : products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSubCategory = !selectedSubCategory || product.subCategory === selectedSubCategory;
        return matchesCategory && matchesSubCategory;
      });

  return (
    <div className="admin-products-container">
      <Sidebar />
      <div className="products-content">
        <h1 className="mb-4">Best Sellers</h1>
        <p className="text-muted mb-4">Manage and showcase your top-performing products</p>

        <div className="container-fluid mycontainer">
          <div className="container adminheader">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom-0 pb-4">
                <h2 className="card-title h4 fw-bold">Best Sellers Management</h2>
              </div>
              <div className="card-body">
                {/* Search Bar - Moved to top and made wider */}
                <div className="mb-4">
                  <div className="input-group input-group-lg shadow-sm" style={{ transition: 'all 0.3s ease',height:'47px',gap:'0px' }}>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Search products by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ 
                        cursor: 'text',
                        fontSize: '1rem',
                        backgroundColor: '#fff',
                        caretColor: '#000', // Makes cursor visible
                        width: '80%',
                      }}
                     
                    />
                    <button 
                      className="btn input-group-text"
                      style={{ 
                        backgroundColor: '#ffd5c2', 
                        cursor: 'pointer',
                        // padding: '0.5rem 1.5rem',
                        width:'20%',
                      }}
                    >
                      <FaSearch size={18} />
                    </button>
                  </div>
                  {searchResults.length > 0 && searchQuery && (
                    <div className="mt-2 text-muted">
                      Found {searchResults.length} matching products
                    </div>
                  )}
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category</label>
                    <select 
                      className="form-select shadow-sm"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  {selectedCategory !== 'All' && (
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Sub Category</label>
                      <select 
                        className="form-select shadow-sm"
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        style={{ transition: 'all 0.3s ease' }}
                      >
                        <option value="">All Sub Categories</option>
                        {subCategories[selectedCategory]?.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Rest of the component remains the same */}
                <div className="text-end mb-4">
                  <button
                    className="btn d-inline-flex align-items-center gap-2 px-4 shadow-sm"
                    style={{ 
                      backgroundColor: "#ffa68d", 
                      color: "#000",
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <FaPlus /> Add to Best Sellers
                  </button>
                </div>

                <div>
                  <h3 className="h4 fw-bold mb-4">Best Sellers Preview</h3>
                  <div className="row g-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="col-md-6 col-lg-4">
                        <div 
                          className="card h-100 shadow-sm"
                          style={{ transition: 'all 0.3s ease' }}
                          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <div style={{ aspectRatio: "1", overflow: 'hidden' }}>
                            <img
                              src="/api/placeholder/400/400"
                              alt={product.name}
                              className="card-img-top h-100 w-100 object-fit-cover"
                              style={{ transition: 'transform 0.3s ease' }}
                              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                          </div>
                          <div className="card-body d-flex flex-column">
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h4 className="card-title h5 fw-bold mb-0">{product.name}</h4>
                                <span className="badge" style={{ backgroundColor: "#ffd5c2", color: "#000" }}>
                                  <FaStar className="me-1" />
                                  {product.rating}
                                </span>
                              </div>
                              <p className="text-muted small mb-1">
                                {product.category} • {product.subCategory}
                              </p>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="fw-bold mb-0">₹{product.price}</p>
                                <p className="text-success small mb-0">{product.sales} sales</p>
                              </div>
                            </div>
                            <div className="d-flex gap-2 mt-auto">
                              <button
                                className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                style={{ 
                                  backgroundColor: "#ffd5c2", 
                                  color: "#000",
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                style={{ 
                                  backgroundColor: "#ffe6e6", 
                                  color: "#dc3545",
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                              >
                                <FaTrash /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;