import React, { useEffect, useState } from "react";
import { getAllLeaveRequests, updateLeaveStatus } from "../api";
import './Dashboard.css' ;

const LeaveReviewSection = () => {
  const [requests, setRequests] = useState([]);

  const fetchAllRequests = async () => {
    const data = await getAllLeaveRequests();
    setRequests(data);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await updateLeaveStatus(id, newStatus);
    fetchAllRequests();
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  return (
      <div className="leave-review-panel">
          <h3>Leave Approval Panel</h3>
          {requests.length === 0 ? (
              <p>No leave requests found.</p>
          ) : (
              <ul className="review-list">
                  {requests.map(req => (
                      <li key={req.id} className={`review-item status-${req.status.toLowerCase()}`}>
                          <strong>{req.name}</strong> | {req.fromDate} ➡ {req.toDate}<br />
                          Reason: {req.reason}<br />
                          Status: <span className="status-text">{req.status}</span><br />
                          {req.status === "pending" && (
                              <div className="review-actions">
                                  <button className="approve-btn" onClick={() => handleStatusUpdate(req.id, "approved")}>Approve</button>
                                  <button className="reject-btn" onClick={() => handleStatusUpdate(req.id, "rejected")}>Reject</button>
                              </div>
                          )}
                      </li>
                  ))}
              </ul>
          )}
      </div>

  );
};

export default LeaveReviewSection;
