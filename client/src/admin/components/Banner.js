import React, { useEffect, useState } from "react";
import "../styles/banner.css";
import Sidebar from "../components/Sidebar.js";
import { FaTrash, FaEdit, FaImage, FaPlus } from 'react-icons/fa';
import api from "../../api.js";

const Banner = () => {

    // useEffect(()=>{
    //     fetchBanners();
    // });

    const fetchBanners = async () => {
        const response = await api.get("/admin/get_banners");
        const data = await response.json();
        console.log(data);
    }
    const [banners, setBanners] = useState([
        { 
            id: 1, 
            image: "https://via.placeholder.com/300x150", 
            caption: "Welcome to Our Store", 
            text: "Enjoy the best deals!",
            active: true 
        },
        { 
            id: 2, 
            image: "https://via.placeholder.com/300x150", 
            caption: "Shop the Latest Trends", 
            text: "Fashion at your fingertips!",
            active: true
        },
    ]);

    const [newBanner, setNewBanner] = useState({ 
        image: "", 
        caption: "", 
        text: "", 
        active: true 
    });
    const [editingBanner, setEditingBanner] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    const validateForm = () => {
        if (!newBanner.image || !newBanner.caption || !newBanner.text) {
            setError("All fields are required!");
            return false;
        }
        setError("");
        return true;
    };

    const handleAddBanner = () => {
        if (!validateForm()) return;

        const newId = banners.length > 0 ? Math.max(...banners.map(banner => banner.id)) + 1 : 1;
        setBanners([...banners, { id: newId, ...newBanner }]);
        resetForm();
    };

    const handleDeleteBanner = (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            setBanners(banners.filter((banner) => banner.id !== id));
        }
    };

    const handleEditBanner = (banner) => {
        setEditingBanner(banner);
        setNewBanner({ 
            image: banner.image, 
            caption: banner.caption, 
            text: banner.text,
            active: banner.active 
        });
        setImagePreview(banner.image);
    };

    const handleSaveEdit = () => {
        if (!validateForm()) return;

        setBanners(banners.map((banner) =>
            banner.id === editingBanner.id ? { ...banner, ...newBanner } : banner
        ));
        resetForm();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
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
            setNewBanner({ ...newBanner, image: imageUrl });
            setError("");
        }
    };

    const resetForm = () => {
        setEditingBanner(null);
        setNewBanner({ image: "", caption: "", text: "", active: true });
        setImagePreview(null);
        setError("");
    };

    const toggleBannerStatus = (id) => {
        setBanners(banners.map(banner =>
            banner.id === id ? { ...banner, active: !banner.active } : banner
        ));
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
                        <button
                            className="secondary-button"
                            onClick={resetForm}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="primary-button"
                            onClick={editingBanner ? handleSaveEdit : handleAddBanner}
                            type="button"
                        >
                            {editingBanner ? <><FaEdit /> Save Changes</> : <><FaPlus /> Add Banner</>}
                        </button>
                    </div>
                </div>

                {/* Existing Banners */}
                <div className="existing-banners-section">
                    <h2>Existing Banners</h2>
                    <div className="banner-grid">
                        {banners.map((banner) => (
                            <div key={banner.id} className={`banner-card ${!banner.active ? 'inactive' : ''}`}>
                                <div className="banner-image-container">
                                    <img src={banner.image} alt={banner.caption} className="banner-image" />
                                    <div className="banner-status" onClick={() => toggleBannerStatus(banner.id)}>
                                        {banner.active ? "Active" : "Inactive"}
                                    </div>
                                </div>
                                <div className="banner-details">
                                    <h4>{banner.caption}</h4>
                                    <p>{banner.text}</p>
                                </div>
                                <div className="banner-actions">
                                    <button 
                                        className="edit-button" 
                                        onClick={() => handleEditBanner(banner)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDeleteBanner(banner.id)}
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

export default Banner;