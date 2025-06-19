import React, { useState } from "react";
import { addEmployee } from "../api";

const AddEmployee = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(formData);
    setFormData({ name: "", email: "" });

    if (onEmployeeAdded) {
      onEmployeeAdded(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Employee Name"
          className="border p-2 rounded w-1/3"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded w-1/3"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddEmployee;

