import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
      });

      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up to OptraHR</h2>
        <div className="auth-form">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={(e) => setRole(e.target.value)}
              />
              Employee
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="hr"
                checked={role === "hr"}
                onChange={(e) => setRole(e.target.value)}
              />
              HR
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="manager"
                checked={role === "manager"}
                onChange={(e) => setRole(e.target.value)}
              />
              Manager
            </label>
          </div>

          <button className="auth-btn" onClick={handleSignup}>Sign Up</button>
        </div>
        <div className="auth-link">
          <p>Already have an account?</p>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
