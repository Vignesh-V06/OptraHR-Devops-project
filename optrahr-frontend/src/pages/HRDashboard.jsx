// HRDashboard.jsx
import React from "react";
import EmployeeList from "../components/EmployeeList";
import './Dashboard.css';

const HRDashboard = ({ onLogout }) => {
  return (
    <EmployeeList onLogout={onLogout} />
  );
};

export default HRDashboard;
