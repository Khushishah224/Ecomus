import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar.js";
import api from "../../api";
import "../styles/Header.css";

const Header = () => {
  const [headers, setHeaders] = useState([]);
  const [newHeader, setNewHeader] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchHeaders();
  }, []);

  const fetchHeaders = async () => {
    setIsFetching(true);
    try {
      const response = await api.get("/api/admin/get_headers");
      setHeaders(response.data);
    } catch (error) {
      toast.error("Failed to fetch headers. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newHeader.trim()) {
      toast.error("Please enter a header");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/api/admin/create_header", {
        text: newHeader,
      });
      setHeaders([...headers, response.data]);
      setNewHeader("");
      toast.success("Header added successfully");
    } catch (error) {
      toast.error("Failed to add header. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (header) => {
    setEditingId(header._id);
    setEditText(header.text);
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) {
      toast.error("Please enter a header");
      return;
    }

    try {
      const response = await api.put(`/api/admin/update_header/${id}`, {
        text: editText,
      });
      setHeaders(headers.map((h) => (h._id === id ? { ...h, text: editText } : h)));
      setEditingId(null);
      setEditText("");
      toast.success("Header updated successfully");
    } catch (error) {
      toast.error("Failed to update header. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this header?")) {
      return;
    }

    try {
      await api.delete(`/api/admin/delete_header/${id}`);
      setHeaders(headers.filter((h) => h._id !== id));
      toast.success("Header deleted successfully");
    } catch (error) {
      toast.error("Failed to delete header. Please try again.");
    }
  };

  return (
    <div className="header-container">
      <Sidebar />

      <div className="header-content">
        <div className="header-header">
          <h1>Manage Headers</h1>
          <p>Create and manage headers for your site</p>
        </div>

        <form onSubmit={handleSubmit} className="header-form">
          <div className="input-group">
            <input
              type="text"
              value={newHeader}
              onChange={(e) => setNewHeader(e.target.value)}
              placeholder="Enter header text"
              className="header-input"
              aria-label="New header input"
            />
            <button
              type="submit"
              className="add-button"
              disabled={isLoading}
              aria-label="Add header button"
            >
              <FaPlus /> {isLoading ? "Adding..." : "Add Header"}
            </button>
          </div>
        </form>

        {isFetching ? (
          <p>Loading headers...</p>
        ) : (
          <div className="headers-list">
            {headers.map((header) => (
              <div key={header._id} className="header-item">
                {editingId === header._id ? (
                  <div className="edit-group">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      aria-label="Edit header input"
                    />
                    <div className="edit-actions">
                      <button
                        onClick={() => handleUpdate(header._id)}
                        className="save-button"
                        aria-label="Save updated header button"
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
                  <div className="header-content">
                    <p className="header-text">{header.text}</p>
                    <div className="header-actions">
                      <button
                        onClick={() => handleEdit(header)}
                        className="edit-button"
                        aria-label="Edit header button"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(header._id)}
                        className="delete-button"
                        aria-label="Delete header button"
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

export default Header;
