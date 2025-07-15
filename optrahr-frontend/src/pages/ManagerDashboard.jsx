import React from "react";
import './Dashboard.css';
import LeaveReviewSection from "./LeaveReviewSection";

const ManagerDashboard = ({ onLogout }) => {
  return (
    <div className="container">
      <div className="neon-header">
        <h1 className="neon-title">
          Manager <span className="HR">Dashboard</span>
        </h1>
        <div className="logout-container">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Attendance Requests</h2>
        <p>View and approve/reject employee attendance requests (Coming Soon)</p>
      </div>
      <LeaveReviewSection />

      <div className="card">
        <h2>Monthly Hiring Trends</h2>
        <p>Analytics and charts (To be implemented)</p>
      </div>
    </div>
  );
};

export default ManagerDashboard;
