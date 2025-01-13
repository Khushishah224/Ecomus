import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaImage, FaPlus, FaTimes } from "react-icons/fa";
import Sidebar from "../components/Sidebar.js";
import "../styles/manageproducts.css";

const categories = ["Clothing", "Sunglasses", "Bags", "Shoes", "Accessories"];
const colors = ["Red", "Green", "Yellow"];
const sizes = ["S", "M", "L", "XL"];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: categories[0],
    description: "",
    variants: [
      {
        color: colors[0],
        sizes: [],
        prices: {},
        stock: "",
        stockStatus: "In Stock",
        images: { front: null, back: null, side: null },
      },
    ],
  });
  const [imagePreviews, setImagePreviews] = useState([
    { front: null, back: null, side: null },
  ]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Classic T-Shirt",
        category: "Clothing",
        description: "Cotton T-shirt",
        price: "599",
        stock: "50",
      },
      {
        id: 2,
        name: "Classic T-Shirt",
        category: "Clothing",
        description: "Cotton T-shirt",
        price: "599",
        stock: "50",
      },{
        id: 3,
        name: "Classic T-Shirt",
        category: "Clothing",
        description: "Cotton T-shirt",
        price: "599",
        stock: "50",
      },{
        id: 4,
        name: "Classic T-Shirt",
        category: "Clothing",
        description: "Cotton T-shirt",
        price: "599",
        stock: "50",
      },{
        id: 5,
        name: "Classic T-Shirt",
        category: "Clothing",
        description: "Cotton T-shirt",
        price: "599",
        stock: "50",
      },{
        id: 6,
        name: "Classic T-Shirt",
        category: "Clothing",
        description: "Cotton T-shirt",
        price: "599",
        stock: "50",
      },
      // ... other sample products
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    setNewProduct((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[index][field] = value;
      return { ...prev, variants: updatedVariants };
    });
  };

  const handleSizeChange = (variantIndex, selectedSize) => {
    setNewProduct((prev) => {
      const updatedVariants = [...prev.variants];
      if (!updatedVariants[variantIndex].sizes.includes(selectedSize)) {
        updatedVariants[variantIndex].sizes.push(selectedSize);
        updatedVariants[variantIndex].prices[selectedSize] = "";
      }
      return { ...prev, variants: updatedVariants };
    });
  };

  const removeSize = (variantIndex, sizeToRemove) => {
    setNewProduct((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[variantIndex].sizes = updatedVariants[variantIndex].sizes.filter(
        (size) => size !== sizeToRemove
      );
      const { [sizeToRemove]: _, ...remainingPrices } = updatedVariants[variantIndex].prices;
      updatedVariants[variantIndex].prices = remainingPrices;
      return { ...prev, variants: updatedVariants };
    });
  };

  const handleImageChange = (variantIndex, type, e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreviews((prev) => {
        const updatedPreviews = [...prev];
        if (!updatedPreviews[variantIndex]) {
          updatedPreviews[variantIndex] = {};
        }
        updatedPreviews[variantIndex][type] = URL.createObjectURL(file);
        return updatedPreviews;
      });

      setNewProduct((prev) => {
        const updatedVariants = [...prev.variants];
        updatedVariants[variantIndex].images[type] = file;
        return { ...prev, variants: updatedVariants };
      });
    }
  };

  const removeImage = (variantIndex, type) => {
    setImagePreviews((prev) => {
      const updatedPreviews = [...prev];
      if (updatedPreviews[variantIndex]) {
        updatedPreviews[variantIndex][type] = null;
      }
      return updatedPreviews;
    });

    setNewProduct((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[variantIndex].images[type] = null;
      return { ...prev, variants: updatedVariants };
    });
  };

  const addVariant = () => {
    setNewProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          color: colors[0],
          sizes: [],
          prices: {},
          stock: "",
          stockStatus: "In Stock",
          images: { front: null, back: null, side: null },
        },
      ],
    }));
    setImagePreviews((prev) => [...prev, { front: null, back: null, side: null }]);
  };

  const removeVariant = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePriceChange = (variantIndex, size, value) => {
    setNewProduct((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[variantIndex].prices[size] = value;
      return { ...prev, variants: updatedVariants };
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    const newId = products.length + 1;
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description,
      price: Object.values(newProduct.variants[0]?.prices)[0] || "",
      stock: newProduct.variants[0]?.stock || "",
    };
    setProducts((prev) => [...prev, productToAdd]);
    setNewProduct({
      name: "",
      category: categories[0],
      description: "",
      variants: [
        {
          color: colors[0],
          sizes: [],
          prices: {},
          stock: "",
          stockStatus: "In Stock",
          images: { front: null, back: null, side: null },
        },
      ],
    });
    setImagePreviews([{ front: null, back: null, side: null }]);
  };

  return (
    <div className="admin-products-container">
      <Sidebar />
      <div className="products-content">
        <h1>Manage Products</h1>
        <p>Add, edit, or remove shopping categories for your website</p>

        <div className="container-fluid mycontainer">
          <div className="container adminheader">
            <div className="">
              <div className="card-header bg-white border-bottom-0 pb-4">
                <h2 className="card-title h4 fw-bold">Add Product</h2>
              </div>
              <div className="card-body">
                <form onSubmit={addProduct}>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        className="form-select"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Product Description</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Enter product description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 fw-bold mb-0">Product Variants</h3>
                      <button
                        type="button"
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: "#ffd5c2", color: "#000" }}
                        onClick={addVariant}
                      >
                        <FaPlus /> Add Variant
                      </button>
                    </div>
                    {newProduct.variants.map((variant, variantIndex) => (
                      <div key={variantIndex} className="card mb-4">
                        <div className="card-body">
                          <div className="d-flex justify-content-end mb-3">
                            {newProduct.variants.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeVariant(variantIndex)}
                              >
                                <FaTrash /> Remove Variant
                              </button>
                            )}
                          </div>
                          <div className="row g-3 mb-4">
                            <div className="col">
                              <select
                                className="form-select"
                                value={variant.color}
                                onChange={(e) =>
                                  handleVariantChange(variantIndex, "color", e.target.value)
                                }
                              >
                                {colors.map((color) => (
                                  <option key={color} value={color}>
                                    {color}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col">
                              {/* <select
                                className="form-select"
                                onChange={(e) =>
                                  handleSizeChange(variantIndex, e.target.value)
                                }
                              >
                                <option value="" disabled>
                                  Select Sizes
                                </option>
                                {sizes.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select> */}
                              <select
  className="form-select"
  value="" // Add this line
  onChange={(e) =>
    handleSizeChange(variantIndex, e.target.value)
  }
>
  <option value="" disabled>
    Select Sizes
  </option>
  {sizes.map((size) => (
    <option key={size} value={size}>
      {size}
    </option>
  ))}
</select>
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {variant.sizes.map((size) => (
                                  <div key={size} className="size-price-container">
                                    <span className="badge bg-secondary d-flex align-items-center gap-2">
                                      {size}
                                      <FaTimes
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeSize(variantIndex, size)}
                                      />
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control mt-1"
                                      placeholder={`Price for ${size}`}
                                      value={variant.prices[size] || ""}
                                      onChange={(e) =>
                                        handlePriceChange(variantIndex, size, e.target.value)
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="col">
                              <input
                                className="form-control"
                                placeholder="Stock"
                                type="number"
                                value={variant.stock}
                                onChange={(e) =>
                                  handleVariantChange(variantIndex, "stock", e.target.value)
                                }
                              />
                            </div>
                            <div className="col">
                              <select
                                className="form-select"
                                value={variant.stockStatus}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variantIndex,
                                    "stockStatus",
                                    e.target.value
                                  )
                                }
                              >
                                <option>In Stock</option>
                                <option>Low Stock</option>
                                <option>Out of Stock</option>
                              </select>
                            </div>
                          </div>

                          <div className="row g-4 mt-2">
                            {["front", "back", "side"].map((type) => (
                              <div key={type} className="col-md-4">
                                <input
                                  type="file"
                                  id={`image-${variantIndex}-${type}`}
                                  className="d-none"
                                  onChange={(e) => handleImageChange(variantIndex, type, e)}
                                />
                                <label
                                  htmlFor={`image-${variantIndex}-${type}`}
                                  className="d-block border border-2 border-dashed rounded p-3 text-center cursor-pointer"
                                  style={{
                                    aspectRatio: "1",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                    background: "#f8f9fa",
                                  }}
                                >
                                  {imagePreviews[variantIndex]?.[type] ? (
                                    <img
                                      src={imagePreviews[variantIndex][type]}
                                      alt={`${type} view`}
                                      className="img-fluid h-100 w-100 object-fit-cover rounded"
                                    />
                                  ) : (
                                    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                                      <FaImage size={24} className="mb-2" />
                                      <span className="fw-medium text-capitalize">
                                        Add {type} Image
                                      </span>
                                    </div>
                                  )}
                                </label>
                                <div className="d-flex justify-content-between mt-2 gap-2">
                                  <button
                                    type="button"
                                    className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                    style={{
                                      backgroundColor: "#ffd5c2",
                                      color: "#000",
                                    }}
                                    onClick={() =>
                                      document
                                        .getElementById(`image-${variantIndex}-${type}`)
                                        .click()
                                    }
                                  >
                                    Upload
                                  </button>
                                  <button
                                    type="button"
                                    className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                    style={{
                                      backgroundColor: "#ffe6e6",
                                      color: "#dc3545",
                                    }}
                                    onClick={() => removeImage(variantIndex, type)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn d-inline-flex align-items-center gap-2 px-4"
                      style={{ backgroundColor: "#ffa68d", color: "#000" }}
                    >
                      <FaPlus /> Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <h2 className="h3 fw-bold mb-4">Products Preview</h2>
              <div className="row g-4">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="col-md-6 col-lg-4">
                    <div className="card h-100">
                      <div style={{ aspectRatio: "1" }}>
                        <img
                          src="/api/placeholder/400/400"
                          alt={product.name}
                          className="card-img-top h-100 w-100 object-fit-cover"
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title h5 fw-bold">{product.name}</h4>
                        <p className="text-muted small mb-1">{product.category}</p>
                        <p className="card-text small mb-2">{product.description}</p>
                        <p className="fw-bold mb-1">₹{product.price}</p>
                        <p className="text-muted small mb-3">Stock: {product.stock}</p>
                        <div className="d-flex gap-2">
                          <button
                            className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                            style={{ backgroundColor: "#ffd5c2", color: "#000" }}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="btn flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                            style={{ backgroundColor: "#ffe6e6", color: "#dc3545" }}
                          >
                            <FaTrash /> Delete
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
  );
};

export default ManageProducts;
