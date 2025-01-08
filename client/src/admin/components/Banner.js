import React, { useEffect, useState } from "react";
import "../styles/banner.css";
import Sidebar from "./Sidebar.js";
import { FaTrash, FaEdit, FaImage, FaPlus } from 'react-icons/fa';
import api from "../../api.js";
import { toast } from "react-hot-toast";


const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [newBanner, setNewBanner] = useState({ image: "", caption: "", text: "", active: true });
    const [editingBanner, setEditingBanner] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await api.get("/banners");
            setBanners(response.data);
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    const validateForm = () => {
        if (!newBanner.image || !newBanner.caption || !newBanner.text) {
            setError("All fields are required!");
            return false;
        }
        setError("");
        return true;
    };

    const handleDeleteBanner = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await api.delete(`/banners/delete_banner/${id}`);
                setBanners(banners.filter((banner) => banner._id !== id));
            } catch (error) {
                console.error("Error deleting banner:", error);
            }
        }
    };
   
    const handleAddBanner = async () => {
        if (!validateForm()) return;
    
        const formData = new FormData();
        formData.append("image", newBanner.image);
        formData.append("caption", newBanner.caption);
        formData.append("text", newBanner.text);
    
        try {
            await api.post("/banners", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            await fetchBanners();
            resetForm();
            toast.success("Banner added successfully");
        } catch (error) {
            console.error("Error adding banner:", error);
            toast.error("Failed to add banner");
        }
    };
    
    const handleEditBanner = (banner) => {
        setEditingBanner(banner);
        setNewBanner({ image: banner.image, caption: banner.caption, text: banner.text, active: banner.active });
        setImagePreview(`http://localhost:5000${banner.image}`);
        document.querySelector('.add-banner-form').scrollIntoView({ behavior: 'smooth' });
    };

    
    const handleSaveEdit = async () => {
        if (!validateForm()) return;
    
        const formData = new FormData();
        formData.append("caption", newBanner.caption);
        formData.append("text", newBanner.text);
        formData.append("active", newBanner.active); 
    
        if (newBanner.image instanceof File) {
            formData.append("image", newBanner.image);
        }
    
        try {
            await api.put(`/banners/${editingBanner._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            await fetchBanners(); 
            resetForm();
            toast.success("Banner updated successfully");
        } catch (error) {
            console.error("Error updating banner:", error);
            toast.error("Failed to update banner");
        }
    };
    
    const handleImageChange = async (e) => {
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
            setNewBanner({ ...newBanner, image: file });
            setError("");
        }
    };


    const resetForm = () => {
        setEditingBanner(null);
        setNewBanner({ image: "", caption: "", text: "", active: true });
        setImagePreview(null);
        setError("");
    };

    const toggleBannerStatus = async (id) => {
        try {
            const updatedBanner = banners.find((banner) => banner._id === id);
            updatedBanner.active = !updatedBanner.active;

            await api.put(`/banners/${id}`, updatedBanner);
            setBanners([...banners]);
            toast.success(`Banner marked as ${updatedBanner.active ? "Active" : "Inactive"}`);
        } catch (error) {
            console.error("Error updating banner status:", error);
            toast.error("Failed to update banner status");
        }
    };

    return (
        <div className="admin-banner-container">
            <Sidebar />
            <div className="banner-content">
                <div className="banner-header">
                    <h1>Manage Carousel Banners</h1>
                    <p>Add, edit, or remove banner images for your website carousel</p>
                </div>

                {/* Add or Edit Banner Form */}
                <div className="add-banner-form">
                    <h3>{editingBanner ? "Edit Banner" : "Add New Banner"}</h3>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Banner Caption</label>
                        <input
                            type="text"
                            placeholder="Enter banner caption"
                            value={newBanner.caption}
                            onChange={(e) => setNewBanner({ ...newBanner, caption: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Banner Text</label>
                        <input
                            type="text"
                            placeholder="Enter banner text"
                            value={newBanner.text}
                            onChange={(e) => setNewBanner({ ...newBanner, text: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Banner Image</label>
                        <div className="image-upload-container">
                            <input
                                type="file"
                                id="banner-image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-upload-input"
                            />
                            <label htmlFor="banner-image" className="image-upload-label">
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
                        <button className="primary-button" onClick={editingBanner ? handleSaveEdit : handleAddBanner} type="button">
                            {editingBanner ? <><FaEdit /> Save Changes</> : <><FaPlus /> Add Banner</>}
                        </button>
                    </div>
                </div>

                {/* Existing Banners */}
                <div className="existing-banners-section">
                    <h2>Existing Banners</h2>
                    <div className="banner-grid">
                        {banners.map((banner) => (
                            <div key={banner._id} className={`banner-card ${!banner.active ? 'inactive' : ''}`}>
                                <div className="banner-image-container">
                                    <img src={`http://localhost:5000${banner.image}`} alt={banner.caption} className="banner-image" />
                                    <div className="banner-status" onClick={() => toggleBannerStatus(banner._id)}>
                                        {banner.active ? "Active" : "Inactive"}
                                    </div>
                                </div>
                                <div className="banner-details">
                                    <h4>{banner.caption}</h4>
                                    <p>{banner.text}</p>
                                </div>
                                <div className="banner-actions">
                                    <button className="edit-button" onClick={() => handleEditBanner(banner)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeleteBanner(banner._id)}>
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

export default Banner;
