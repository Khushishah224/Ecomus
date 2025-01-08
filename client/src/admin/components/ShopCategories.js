import React, { useState, useEffect } from "react";
import "../styles/shopcategories.css";
import Sidebar from "../components/Sidebar.js";
import { FaTrash, FaEdit, FaImage, FaPlus } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import api from "../../api.js";

const ShopCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ image: "", name: "", active: true });
    const [editingCategory, setEditingCategory] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories");
        }
    };
    

    const validateForm = () => {
        if (!newCategory.image || !newCategory.name) {
            setError("All fields are required!");
            return false;
        }
        setError("");
        return true;
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await api.delete(`/categories/${id}`);
                setCategories(categories.filter((cat) => cat._id !== id));
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

   
    
    const handleAddCategory = async () => {
        if (!validateForm()) return;
    
        const formData = new FormData();
        formData.append("name", newCategory.name);
        formData.append("image", newCategory.image);
    
        try {
            const response = await api.post("/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setCategories([...categories, response.data]);
            resetForm();
            toast.success("Category added successfully");
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category");
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategory({ 
            name: category.name, 
            image: category.image, 
            active: category.active 
        });
        setImagePreview(`http://localhost:5000${category.image}`);
        document.querySelector('.add-category-form').scrollIntoView({ behavior: 'smooth' });
    };

    const handleSaveEdit = async () => {
        if (!validateForm() ){ 
            return
         }
    
        const formData = new FormData();
        formData.append("name", newCategory.name);
    
        // Only append a new image if a new one is selected
        if (newCategory.image instanceof File) {
            formData.append("image", newCategory.image);
        } else {
            
            formData.append("image", newCategory.image);  
        }
    
        try {
            const response = await api.put(`/categories/${editingCategory._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            const updatedCategories = categories.map(category => 
                category._id === editingCategory._id ? response.data : category
            );
            
            setCategories(updatedCategories);
            resetForm();
            toast.success("Category updated successfully");
    
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("Failed to update category");
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
    
            setImagePreview(URL.createObjectURL(file));
            setNewCategory({ ...newCategory, image: file });
            setError("");
        }
    };

    const resetForm = () => {
        setEditingCategory(null);
        setNewCategory({ image: "", name: "", active: true });
        setImagePreview(null);
        setError("");
    };


    const toggleCategoryStatus = async (id, currentStatus) => {
        try {
            console.log(`Updating category ${id}, current status: ${currentStatus}`); // Debugging log
    
            const response = await api.patch(`/categories/${id}`, { active: !currentStatus });
    
            console.log("Response received:", response.data); 
    
            // Update state with the latest status from backend
            setCategories(categories.map(category =>
                category._id === id ? { ...category, active: response.data.active } : category
            ));
    
            toast.success(`Category marked as ${response.data.active ? "Active" : "Inactive"}`);
        } catch (error) {
            console.error("Error updating category status:", error);
            toast.error("Failed to update category status");
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
                        <input type="text" placeholder="Enter category name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Category Image</label>
                        <div className="image-upload-container">
                            <input type="file" id="category-image" accept="image/*" onChange={handleImageChange} className="image-upload-input" />
                            <label htmlFor="category-image" className="image-upload-label">
                                <FaImage /> {imagePreview ? "Change Image" : "Upload Image"}
                            </label>
                        </div>
                        {imagePreview && <div className="image-preview"><img src={imagePreview} alt="Preview" /></div>}
                    </div>
                    <div className="form-actions">
                        <button className="secondary-button" onClick={resetForm} type="button">Cancel</button>
                        <button className="primary-button" onClick={editingCategory ? handleSaveEdit : handleAddCategory} type="button">
                            {editingCategory ? <><FaEdit /> Save Changes</> : <><FaPlus /> Add Category</>}
                        </button>
                    </div>
                </div>
                <div className="existing-categories-section">
                    <h2>Existing Categories</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <div key={category._id} className={`category-card ${!category.active ? 'inactive' : ''}`}>
                                <div className="category-image-container">
                                    <img src={`http://localhost:5000${category.image}`} alt={category.name} className="category-image" />
                                    <div className={`category-status ${category.active ? 'active' : 'inactive'}`}  onClick={() => toggleCategoryStatus(category._id, category.active)}>
                                     {category.active ? "Active" : "Inactive"}
                                    </div>
                                </div>
                                <div className="category-details">
                                    <h4>{category.name}</h4>
                                </div>
                                <div className="category-actions">
                                    <button className="edit-button" onClick={() => handleEditCategory(category)}><FaEdit /> Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteCategory(category._id)}><FaTrash /> Delete</button>
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
