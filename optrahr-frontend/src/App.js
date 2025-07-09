import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      alert("Logged out successfully");
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/EmployeeList" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/EmployeeList"
          element={user ? <EmployeeList onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
