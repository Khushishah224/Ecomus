import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar.js";
import api from "../../api";
import "../styles/marquee.css";

const Marquee = () => {
  const [taglines, setTaglines] = useState([]);
  const [newTagline, setNewTagline] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchTaglines();
  }, []);

  const fetchTaglines = async () => {
    setIsFetching(true);
    try {
      const response = await api.get("/api/admin/get_taglines");
      setTaglines(response.data);
    } catch (error) {
      toast.error("Failed to fetch taglines. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTagline.trim()) {
      toast.error("Please enter a tagline");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/api/admin/create_taglines", {
        text: newTagline,
      });
      setTaglines([...taglines, response.data]);
      setNewTagline("");
      toast.success("Tagline added successfully");
    } catch (error) {
      toast.error("Failed to add tagline. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (tagline) => {
    setEditingId(tagline._id); // Changed from tagline.id to tagline._id
    setEditText(tagline.text);
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) {
      toast.error("Please enter a tagline");
      return;
    }

    try {
      const response = await api.put(`/api/admin/update_taglines/${id}`, {
        text: editText,
      });
      
      // Update the local state immediately after successful API call
      setTaglines(taglines.map((t) => (t._id === id ? { ...t, text: editText } : t)));
      setEditingId(null);
      setEditText("");
      toast.success("Tagline updated successfully");
    } catch (error) {
      toast.error("Failed to update tagline. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tagline?")) {
      return;
    }

    try {
      await api.delete(`/api/admin/delete_taglines/${id}`);
      // Update local state only after successful API call
      setTaglines(taglines.filter((t) => t._id !== id));
      toast.success("Tagline deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tagline. Please try again.");
    }
  };

  return (
    <div className="marquee-container">
      <Sidebar />

      <div className="marquee-content">
        <div className="marquee-header">
          <h1>Manage Sale Taglines</h1>
          <p>Create and manage promotional messages for your store</p>
        </div>

        <form onSubmit={handleSubmit} className="marquee-form">
          <div className="input-group">
            <input
              type="text"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              placeholder="Enter sale tagline"
              className="marquee-input"
              aria-label="New tagline input"
            />
            <button
              type="submit"
              className="add-button"
              disabled={isLoading}
              aria-label="Add tagline button"
            >
              <FaPlus /> {isLoading ? "Adding..." : "Add Tagline"}
            </button>
          </div>
        </form>

        {isFetching ? (
          <p>Loading taglines...</p>
        ) : (
          <div className="taglines-list">
            {taglines.map((tagline) => (
              <div key={tagline._id} className="tagline-item">
                {editingId === tagline._id ? (
                  <div className="edit-group">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      aria-label="Edit tagline input"
                    />
                    <div className="edit-actions">
                      <button
                        onClick={() => handleUpdate(tagline._id)}
                        className="save-button"
                        aria-label="Save updated tagline button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditText("");
                        }}
                        className="cancel-button"
                        aria-label="Cancel edit button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="tagline-content">
                    <p className="tagline-text">{tagline.text}</p>
                    <div className="tagline-actions">
                      <button
                        onClick={() => handleEdit(tagline)}
                        className="edit-button"
                        aria-label="Edit tagline button"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(tagline._id)}
                        className="delete-button"
                        aria-label="Delete tagline button"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marquee;