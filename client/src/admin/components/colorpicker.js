import React, { useState, useEffect } from "react";
import "../styles/colorpicker.css";
import Sidebar from "./Sidebar";
import api from "../../api";

const ColorPicker= () => {
  const [colorName, setColorName] = useState(""); // Local state for color name
  const [colorCode, setColorCode] = useState("#000000"); // Local state for color code
  const [colors, setColors] = useState([]); // State to store the list of colors

  // Fetch colors from the backend on component mount
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await api.get("/api/admin/get_colors"); // Make GET request to backend API
        setColors(response.data); // Set the colors in state
      } catch (error) {
        console.error("Error fetching colors:", error.response?.data?.error || error.message);
      }
    };

    fetchColors(); // Fetch colors when the component is mounted
  }, []); // Empty dependency array means this effect runs only once, on mount

  // Add a new color
  const handleAddColor = async () => {
    if (!colorName || !colorCode) {
      alert("Both color name and code are required.");
      return;
    }

    try {
      const response = await api.post("/api/admin/add_color", { name: colorName, hexCode: colorCode }); // Send POST request to backend API
      setColors((prevColors) => [...prevColors, response.data]); // Add the new color to the list
      setColorName(""); // Clear color name input field
      setColorCode("#000000"); // Reset color code to default
    } catch (error) {
      console.error("Error adding color:", error.response?.data?.error || error.message);
    }
  };

  // Delete a color
  const handleDeleteColor = async (id) => {
    try {
      await api.delete(`/api/admin/delete_color/${id}`); // Send DELETE request to backend API
      setColors((prevColors) => prevColors.filter((color) => color._id !== id)); // Remove the color from the list
    } catch (error) {
      console.error("Error deleting color:", error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="color-picker-container">
      <Sidebar /> {/* Sidebar Component */}
      <h1 className="color-picker-header">Add Color</h1>
      <div className="color-input-container">
        <input
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)} // Update the color name state on input change
          placeholder="Enter color name (e.g., Ruby Red)"
          className="color-name-input"
        />
        <input
          type="color"
          value={colorCode}
          onChange={(e) => setColorCode(e.target.value)} // Update the color code state on input change
          className="color-code-input"
        />
        <button onClick={handleAddColor} className="add-color-button">
          + Add Color
        </button>
      </div>

      <h2 className="available-colors-header">Available Colors</h2>
      <div className="colors-list">
        {colors.map((color) => (
          <div key={color._id} className="color-item">
            <div
              className="color-swatch"
              style={{ backgroundColor: color.hexCode }} // Set color swatch background color
            ></div>
            <div className="color-details">
              <p className="color-name">
                <strong>Name:</strong> {color.name}
              </p>
              <p className="color-hex">
                <strong>HEX:</strong> {color.hexCode}
              </p>
            </div>
            <button
              className="delete-color-button"
              onClick={() => handleDeleteColor(color._id)} // Delete color on button click
              title="Delete color"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;