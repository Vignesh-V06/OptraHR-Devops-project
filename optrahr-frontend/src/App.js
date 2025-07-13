import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import EmployeeList from "./components/EmployeeList";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import HRDashboard from "./pages/HRDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
    console.log("👤 Auth Changed:", currentUser?.email);

    if (currentUser) {
      setUser(currentUser);

      try {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) {
          const role = docSnap.data().role;
          console.log("🔐 Fetched Role:", role);
          setUserRole(role);
        } else {
          console.log("⚠️ Role not found, defaulting to employee");
          setUserRole("employee");
        }
      } catch (err) {
        console.error("❌ Role fetch failed", err);
      }
    } else {
      console.log("🚪 No user");
      setUser(null);
      setUserRole(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      window.location.replace("/"); // hard reload to reset auth state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : loading || !userRole ? (
              <div>Loading role...</div>
            ) : userRole === "hr" ? (
              <Navigate to="/hr-dashboard" replace />
            ) : userRole === "manager" ? (
              <Navigate to="/manager-dashboard" replace />
            ) : (
              <Navigate to="/employee-dashboard" replace />
            )
          }
        />


        <Route path="/signup" element={<Signup />} />
        <Route path="/hr-dashboard" element={<HRDashboard onLogout={handleLogout} />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard onLogout={handleLogout} />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard onLogout={handleLogout} />} />
        <Route path="/EmployeeList" element={<EmployeeList onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
};

export default App;
