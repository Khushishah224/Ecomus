import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {

  const adminName = "Admin"; // Replace with actual admin name from context/state

  return (

    <div className="dashboard-container">
      <Sidebar />
      <div className="admin-dashboard-container">
        <div className="admin-welcome-section">
          <h1>Welcome back, {adminName}!</h1>
          <p>Here's what's happening with your store today</p>
        </div>

      </div>
    </div>

  );
};

export default Dashboard;
