import React, { useState } from "react";
import "../styles/sizepicker.css";
import { FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
const SizePicker = () => {
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);

  const handleAddSize = () => {
    if (size && !sizes.includes(size)) {
      setSizes((prevSizes) => [...prevSizes, size]);
      setSize("");
    }
  };

  const handleDeleteSize = (sizeToDelete) => {
    setSizes((prevSizes) => prevSizes.filter((s) => s !== sizeToDelete));
  };

  return (
    <div className="size-picker-container">
         <Sidebar />
      <h1 className="size-picker-header">Add Size</h1>
      <div className="size-input-container">
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value.toUpperCase())}
          placeholder="Enter size (e.g., XS, M, L)"
          className="size-input"
        />
        <button onClick={handleAddSize} className="add-size-button">
          + Add Size
        </button>
      </div>
      <h2 className="available-sizes-header">Available Sizes</h2>
      <div className="sizes-list">
        {sizes.map((s) => (
          <div key={s} className="size-item">
            <span>{s}</span>
            <button
              className="delete-size-button"
              onClick={() => handleDeleteSize(s)}
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
