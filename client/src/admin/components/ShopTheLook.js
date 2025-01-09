import React, { useState, useRef, useEffect } from "react";
import "../styles/shopthelook.css";
import Sidebar from "./Sidebar.js";
import { FaImage } from 'react-icons/fa';
import api from '../../api.js';
import {toast , Toaster} from 'react-hot-toast';

const BaseUrl = "http://localhost:5000";

const ShopTheLook = () => {
  const [dots, setDots] = useState({
    image1: [],
    image2: [],
  });
  const [images, setImages] = useState({ image1: "", image2: "" });
  // const [loading, setLoading] = useState(true);

  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);

  const fetchData = async () => {
    // toast.loading("Fetching data...");
    try {
      const response = await api.get("/api/admin/get_shopthelook");
      const data = response.data;

      if (data && data.images) {
        const image1Dots = data.images.image1?.dots || [];
        const image2Dots = data.images.image2?.dots || [];

        setDots({
          image1: image1Dots,
          image2: image2Dots,
        });

        setImages({
          image1: data.images.image1?.imagePath
            ? `${BaseUrl}${data.images.image1.imagePath}`
            : "",
          image2: data.images.image2?.imagePath
            ? `${BaseUrl}${data.images.image2.imagePath}`
            : "",
        });
        // toast.dismiss(); // Dismiss loading toast
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  const handleImageClick = (e, imageId) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setDots((prevDots) => ({
      ...prevDots,
      [imageId]: [...prevDots[imageId], { x, y, id: Date.now() }],
    }));
  };

  const handleDotDrag = (e, imageId, dotId) => {
    e.preventDefault();
    const rect = e.target.parentElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setDots((prevDots) => ({
      ...prevDots,
      [imageId]: prevDots[imageId].map((dot) =>
        dot.id === dotId ? { ...dot, x, y } : dot
      ),
    }));
  };

  const handleRemoveDot = (imageId, dotId) => {
    setDots((prevDots) => ({
      ...prevDots,
      [imageId]: prevDots[imageId].filter((dot) => dot.id !== dotId),
    }));
  };

  const handleImageChange = (e, imageId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prevImages) => ({
          ...prevImages,
          [imageId]: { file, preview: event.target.result },
        }));
        setDots((prevDots) => ({ ...prevDots, [imageId]: [] })); // Reset dots for the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();

    if (images.image1?.file) {
      formData.append("image1", images.image1.file);
    }
    if (images.image2?.file) {
      formData.append("image2", images.image2.file);
    }

    formData.append("dots1", JSON.stringify(dots.image1));
    formData.append("dots2", JSON.stringify(dots.image2));

    try {
      const response = await api.put("/api/admin/update_shopthelook", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Save Response:", response.data);
      // alert("Changes saved successfully!");
      toast.success("Changes saved successfully")

      // Re-fetch data to ensure the UI reflects the latest state
      await fetchData();
    } catch (err) {
      console.error("Error saving data:", err.response?.data || err.message);
      // alert("Failed to save data");
      toast.error("Failed to save data")
    }
  };



  // if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-shoplook-container">
      <Sidebar />
      <div className="admin-shoplook-content">
        <Toaster />
        <h2 className="admin-shoplook-title">Shop The Look</h2>
        <p className="admin-shoplook-instruction">
          Click on the images to add dots. Drag dots to reposition them.
        </p>
        <div className="admin-shoplook-inputs">
          <label>
            <FaImage />
            Change Image 1{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image1")}
              className="admin-shoplook-input"
            />
          </label>
          <label>
            <FaImage />
            Change Image 2{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image2")}
              className="admin-shoplook-input"
            />
          </label>
        </div>
        <div className="admin-shoplook-images-container">
          <div className="admin-shoplook-image-wrapper">
            <img
              ref={imageRef1}
              src={images.image1?.preview || images.image1}
              alt="Shop look 1"
              className="admin-shoplook-image"
              onClick={(e) => handleImageClick(e, "image1")}
            />
            {dots.image1.map((dot) => (
              <div
                key={dot.id}
                className="admin-shoplook-dot"
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                draggable
                onDragEnd={(e) => handleDotDrag(e, "image1", dot.id)}
              >
                <span
                  className="admin-shoplook-dot-remove"
                  onClick={() => handleRemoveDot("image1", dot.id)}
                >
                  ×
                </span>
              </div>
            ))}

          </div>
          <div className="admin-shoplook-image-wrapper">
            <img
              ref={imageRef2}
              src={images.image2?.preview || images.image2}
              alt="Shop look 2"
              className="admin-shoplook-image"
              onClick={(e) => handleImageClick(e, "image2")}
            />
            {dots.image2.map((dot) => (
              <div
                key={dot.id}
                className="admin-shoplook-dot"
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                draggable
                onDragEnd={(e) => handleDotDrag(e, "image2", dot.id)}
              >
                <span
                  className="admin-shoplook-dot-remove"
                  onClick={() => handleRemoveDot("image2", dot.id)}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
        </div>
        <button className="admin-shoplook-save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ShopTheLook;
