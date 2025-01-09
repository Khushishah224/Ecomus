import React, { useState, useEffect } from "react";
import "../styles/sizepicker.css";
import { FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import api from "../../api"; // Import your API utility (axios instance)

const SizePicker = () => {
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);

  // Fetch sizes from the backend
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await api.get("/api/admin/get_sizes");
        setSizes(response.data); // Set sizes from the backend response
      } catch (error) {
        console.error(
          "Error fetching sizes:",
          error.response?.data?.error || error.message
        );
      }
    };

    fetchSizes();
  }, []);

  // Handle adding a new size
  const handleAddSize = async () => {
    if (!size) {
      alert("Size is required");
      return;
    }

    try {
      const response = await api.post("/api/admin/add_size", { name: size });
      setSizes((prevSizes) => [...prevSizes, response.data]); // Update the list with the new size
      setSize(""); // Reset the input field
    } catch (error) {
      console.error(
        "Error adding size:",
        error.response?.data?.error || error.message
      );
    }
  };

  // Handle deleting a size
  const handleDeleteSize = async (id) => {
    try {
      await api.delete(`/api/admin/delete_size/${id}`);
      // Remove the size from the state immediately by filtering out the deleted size
      setSizes((prevSizes) => prevSizes.filter((sizeObj) => sizeObj._id !== id));
    } catch (error) {
      console.error(
        "Error deleting size:",
        error.response?.data?.error || error.message
      );
    }
  };
  

  return (
    <div className="size-picker-container">
      <Sidebar />
      <h1 className="size-picker-header">Add Size</h1>
      <div className="size-input-container">
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value.toUpperCase())} // Convert to uppercase for consistency
          placeholder="Enter size (e.g., XS, M, L)"
          className="size-input"
        />
        <button onClick={handleAddSize} className="add-size-button">
          + Add Size
        </button>
      </div>

      <h2 className="available-sizes-header">Available Sizes</h2>
      <div className="sizes-list">
        {sizes.map((sizeObj) => (
          <div key={sizeObj._id} className="size-item">
            <span>{sizeObj.name}</span> {/* Render only the name property */}
            <button
              className="delete-size-button"
              onClick={() => handleDeleteSize(sizeObj._id)} // Pass the _id for deletion
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizePicker;