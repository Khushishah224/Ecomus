import React, { useState } from "react";
import "../styles/shopcategories.css";
import Sidebar from "../components/Sidebar.js";
import { FaTrash, FaEdit, FaImage, FaPlus } from 'react-icons/fa';
import api from "../../api.js"; // Your API setup

const ShopCategories = () => {
    const [categories, setCategories] = useState([
        { id: 1, image: "https://via.placeholder.com/300x300", name: "Clothing", active: true },
        { id: 2, image: "https://via.placeholder.com/300x300", name: "Sunglasses", active: true },
        { id: 3, image: "https://via.placeholder.com/300x300", name: "Bags", active: true },
        { id: 4, image: "https://via.placeholder.com/300x300", name: "Shoes", active: true },
        { id: 5, image: "https://via.placeholder.com/300x300", name: "Accessories", active: true },
        { id: 6, image: "https://via.placeholder.com/300x300", name: "Jewellery", active: true }
    ]);

    const [newCategory, setNewCategory] = useState({ image: "", name: "", active: true });
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

    const handleAddCategory = async () => {
        if (!validateForm()) return;

        const newId = categories.length > 0 ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
        
        try {
            const { data } = await api.post("/api/admin/create_category", newCategory); // Create category in DB via API
            setCategories([...categories, { id: newId, ...data }]);
            resetForm();
        } catch (error) {
            setError("Failed to add category.");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await api.delete(`/api/admin/delete_category/${id}`); // API call for deleting category
                setCategories(categories.filter((cat) => cat.id !== id));
            } catch (error) {
                setError("Failed to delete category.");
            }
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategory({ image: category.image, name: category.name, active: category.active });
        setImagePreview(category.image);
    };

    const handleSaveEdit = async () => {
        if (!validateForm()) return;

        try {
            const { data } = await api.put(`/api/admin/update_category/${editingCategory.id}`, newCategory); // API call for update
            setCategories(categories.map((category) =>
                category.id === editingCategory.id ? { ...category, ...data } : category
            ));
            resetForm();
        } catch (error) {
            setError("Failed to save category.");
        }
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

    const toggleCategoryStatus = async (id) => {
        try {
            const category = categories.find(cat => cat.id === id);
            const updatedCategory = { ...category, active: !category.active };

            await api.put(`/api/admin/update_category_status/${id}`, { active: updatedCategory.active }); // API call for status update
            setCategories(categories.map(category =>
                category.id === id ? updatedCategory : category
            ));
        } catch (error) {
            setError("Failed to update status.");
        }
    };

    return (
        <div className="admin-categories-container">
            <Sidebar />
            <div className="categories-content">
                <div className="categories-header">
                    <h1>Manage Shop Categories</h1>
                    <p>Add, edit, or remove shopping categories for your website</p>
                </div>

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
                        <button className="secondary-button" onClick={resetForm} type="button">
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
