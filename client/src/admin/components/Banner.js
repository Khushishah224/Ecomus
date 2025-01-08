import React, { useEffect, useState } from "react";
import "../styles/banner.css";
import Sidebar from "../components/Sidebar.js";
import { FaTrash, FaEdit, FaImage, FaPlus } from 'react-icons/fa';
import api from "../../api.js";
import { toast , Toaster }from 'react-hot-toast'; // Import toast

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [newBanner, setNewBanner] = useState({ image: null, caption: "", description: "", active: true });
    const [editingBanner, setEditingBanner] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await api.get("/api/admin/get_banners");
            const data = await response.data; // Assuming the API returns JSON directly
            setBanners(data);
        } catch (error) {
            console.error("Error fetching banners:", error);
            toast.error("Failed to fetch banners.");
        }
    };

    const validateForm = () => {
        if (!newBanner.image || !newBanner.caption || !newBanner.description) {
            setError("All fields are required!");
            return false;
        }
        setError("");
        return true;
    };

    const handleAddBanner = async () => {
        if (!validateForm()) return;
    
        const newId = banners.length > 0 ? Math.max(...banners.map(banner => banner.id)) + 1 : 1;
        const bannerData = { ...newBanner, id: newId }; // Prepare the banner data
    
        // Create FormData
        const formData = new FormData();
        formData.append("image", newBanner.image); // Add image file
        formData.append("caption", newBanner.caption);
        formData.append("description", newBanner.description);
        formData.append("active", newBanner.active);
    
        // Show loading toast
        const loadingToast = toast.loading("Adding banner...");
    
        try {
            console.log("FormData contents:", formData);

            const response = await api.post("/api/admin/create_banner", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set correct headers for file upload
                }
            });
            if (response.status === 201) {
                setBanners([...banners, { ...bannerData, image: response.data.image }]); // Update local state with uploaded image URL
                toast.success("Banner added successfully!");
            } else {
                toast.error("Failed to add banner.");
            }
        } catch (error) {
            console.error("Error adding banner:", error);
            toast.error("Failed to add banner.");
        } finally {
            toast.dismiss(loadingToast); // Dismiss loading toast
        }
    
        resetForm();
    };
    

    const handleDeleteBanner = (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            setBanners(banners.filter(banner => banner.id !== id));
        }
    };

    const handleEditBanner = (banner) => {
        setEditingBanner(banner);
        setNewBanner({ image: banner.image, caption: banner.caption, description: banner.description, active: banner.active });
        setImagePreview(banner.image);
    };

    const handleSaveEdit = async () => {
        if (!validateForm()) return;
    
        const updatedBanner = { ...editingBanner, ...newBanner };
    
        // Create FormData for the edit
        const formData = new FormData();
        formData.append("caption", newBanner.caption);
        formData.append("description", newBanner.description); // Add the description
        formData.append("active", newBanner.active);
        if (newBanner.image) {
            formData.append("image", newBanner.image); // Add new image if it exists
        }
    
        // Show loading toast
        const loadingToast = toast.loading("Saving changes...");
    
        try {
            const response = await api.put(`/admin/update_banner/${editingBanner.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set correct headers for file upload
                }
            });
            if (response.status === 200) {
                setBanners(banners.map(banner => banner.id === editingBanner.id ? updatedBanner : banner));
                toast.success("Banner updated successfully!");
            } else {
                toast.error("Failed to update banner.");
            }
        } catch (error) {
            console.error("Error updating banner:", error);
            toast.error("Failed to update banner.");
        } finally {
            toast.dismiss(loadingToast); // Dismiss loading toast
        }
    
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
    
            const imageUrl = URL.createObjectURL(file); // Create a preview URL
            setImagePreview(imageUrl);
            setNewBanner({ ...newBanner, image: file }); // Store the actual file in state
            setError("");
        }
    };
    

    const resetForm = () => {
        setEditingBanner(null);
        setNewBanner({ image: "", caption: "", description: "", active: true });
        setImagePreview(null);
        setError("");
    };

    const toggleBannerStatus = (id) => {
        setBanners(banners.map(banner => banner.id === id ? { ...banner, active: !banner.active } : banner));
    };

    return (
        <div className="admin-banner-container">

            <Sidebar />
            <Toaster/>
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
                        <label>Banner description</label>
                        <input
                            type="text"
                            placeholder="Enter banner description"
                            value={newBanner.description}
                            onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
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
                                    <p>{banner.description}</p>
                                </div>
                                <div className="banner-actions">
                                    <button className="edit-button" onClick={() => handleEditBanner(banner)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="delete-button" onClick={() => handleDeleteBanner(banner.id)}>
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
