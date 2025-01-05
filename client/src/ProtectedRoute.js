import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './api.js'; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/admin" replace />;
    }
    return children;
};

export default ProtectedRoute;
