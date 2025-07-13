import React from "react";
import EmployeeList from "../components/EmployeeList"; // if needed
import { useNavigate } from "react-router-dom";
import './Dashboard.css';


const EmployeeDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, Employee 👋</h2>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-section">
          {/* This can be a component later */}
          <h3>Apply for Leave</h3>
          <button className="primary-btn" onClick={() => navigate("/apply-leave")}>
            Apply Leave
          </button>
        </div>

        <div className="dashboard-section">
          <h3>View Attendance</h3>
          <p>Coming soon...</p>
        </div>

        <div className="dashboard-section">
          <h3>Upload Resume / Skills</h3>
          <p>Coming soon...</p>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
