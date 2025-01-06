import React, { useState } from "react";
import "../styles/shopcategories.css";
import Sidebar from "../components/Sidebar.js";
import { FaTrash, FaEdit, FaImage, FaPlus } from 'react-icons/fa';
import api from "../../api.js";

const ShopCategories = () => {
    const [categories, setCategories] = useState([
        { 
            id: 1, 
            image: "https://via.placeholder.com/300x300", 
            name: "Clothing",
            active: true 
        },
        { 
            id: 2, 
            image: "https://via.placeholder.com/300x300", 
            name: "Sunglasses",
            active: true 
        },
        {
            id: 3,
            image: "https://via.placeholder.com/300x300",
            name: "Bags",
            active: true
        },
        {
            id: 4,
            image: "https://via.placeholder.com/300x300",
            name: "Shoes",
            active: true
        },
        {
            id: 5,
            image: "https://via.placeholder.com/300x300",
            name: "Accessories",
            active: true
        },
        {
            id: 6,
            image: "https://via.placeholder.com/300x300",
            name: "Jewellery",
            active: true
        }
    ]);

    const [newCategory, setNewCategory] = useState({ 
        image: "", 
        name: "", 
        active: true 
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    const validateForm = () => {
        if (!newCategory.image || !newCategory.name) {
            setError("All fields are required!");
            return false;
        }
        setError("");
        return true;
    };

    const handleAddCategory = () => {
        if (!validateForm()) return;

        const newId = categories.length > 0 ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
        setCategories([...categories, { id: newId, ...newCategory }]);
        resetForm();
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setCategories(categories.filter((cat) => cat.id !== id));
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategory({ 
            image: category.image, 
            name: category.name,
            active: category.active 
        });
        setImagePreview(category.image);
    };

    const handleSaveEdit = () => {
        if (!validateForm()) return;

        setCategories(categories.map((category) =>
            category.id === editingCategory.id ? { ...category, ...newCategory } : category
        ));
        resetForm();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                setError("Image size should be less than 5MB");
                return;
            }

            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setError("Please upload a valid image file (JPEG, PNG, or GIF)");
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setNewCategory({ ...newCategory, image: imageUrl });
            setError("");
        }
    };

    const resetForm = () => {
        setEditingCategory(null);
        setNewCategory({ image: "", name: "", active: true });
        setImagePreview(null);
        setError("");
    };

    const toggleCategoryStatus = (id) => {
        setCategories(categories.map(category =>
            category.id === id ? { ...category, active: !category.active } : category
        ));
    };

    return (
        <div className="admin-categories-container">
            <Sidebar />
            <div className="categories-content">
                <div className="categories-header">
                    <h1>Manage Shop Categories</h1>
                    <p>Add, edit, or remove shopping categories for your website</p>
                </div>

                {/* Add or Edit Category Form */}
                <div className="add-category-form">
                    <h3>{editingCategory ? "Edit Category" : "Add New Category"}</h3>
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label>Category Name</label>
                        <input
                            type="text"
                            placeholder="Enter category name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category Image</label>
                        <div className="image-upload-container">
                            <input
                                type="file"
                                id="category-image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-upload-input"
                            />
                            <label htmlFor="category-image" className="image-upload-label">
                                <FaImage /> {imagePreview ? "Change Image" : "Upload Image"}
                            </label>
                        </div>
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            className="secondary-button"
                            onClick={resetForm}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="primary-button"
                            onClick={editingCategory ? handleSaveEdit : handleAddCategory}
                            type="button"
                        >
                            {editingCategory ? <><FaEdit /> Save Changes</> : <><FaPlus /> Add Category</>}
                        </button>
                    </div>
                </div>

                {/* Existing Categories */}
                <div className="existing-categories-section">
                    <h2>Existing Categories</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <div key={category.id} className={`category-card ${!category.active ? 'inactive' : ''}`}>
                                <div className="category-image-container">
                                    <img src={category.image} alt={category.name} className="category-image" />
                                    <div className="category-status" onClick={() => toggleCategoryStatus(category.id)}>
                                        {category.active ? "Active" : "Inactive"}
                                    </div>
                                </div>
                                <div className="category-details">
                                    <h4>{category.name}</h4>
                                </div>
                                <div className="category-actions">
                                    <button 
                                        className="edit-button" 
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCategories;