import React, { useEffect, useState } from "react";
import { submitLeaveRequest, getUserLeaveRequests } from "../api";
import { auth } from "../firebase";
import './Dashboard.css';

const EmployeeDashboard = ({ onLogout }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveHistory, setLeaveHistory] = useState([]);

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return alert("User not found");

    await submitLeaveRequest({
      userId: currentUser.uid,
      name: currentUser.email,
      fromDate,
      toDate,
      reason
    });

    setFromDate("");
    setToDate("");
    setReason("");
    fetchLeaveHistory();
  };

  const fetchLeaveHistory = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const data = await getUserLeaveRequests(currentUser.uid);
    setLeaveHistory(data);
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, Employee 👋</h2>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      {/* Apply Leave Section */}
      <div className="dashboard-section">
        <h3>Apply for Leave</h3>
        <form className="leave-form" onSubmit={handleLeaveSubmit}>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} required />
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} required />
          <textarea
            placeholder="Reason for leave"
            value={reason}
            onChange={e => setReason(e.target.value)}
            required
          />
          <button type="submit">Apply Leave</button>
        </form>
      </div>

      {/* Leave History Section */}
      <div className="dashboard-section">
        <h3>My Leave Requests</h3>
        {leaveHistory.length === 0 ? (
          <p>No leave requests yet.</p>
        ) : (
            <ul className="leave-history">
              {leaveHistory.map(leave => (
                <li key={leave.id} className={`leave-item status-${leave.status.toLowerCase()}`}>
                  <strong>{leave.fromDate} ➡ {leave.toDate}</strong><br />
                  Reason: {leave.reason}<br />
                  <span className="status-text">Status: {leave.status}</span>
                </li>
              ))}
            </ul>

        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
