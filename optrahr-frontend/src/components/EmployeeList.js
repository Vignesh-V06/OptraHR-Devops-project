import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../api";
import "./EmployeeList.css";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
export default function EmployeeList({ onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", department: "", salary: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getEmployees().then(data => {
      setEmployees(data);
    });
  }, []);

  const handleAdd = async () => {
    if (form.name && form.department && form.salary) {
      await addEmployee(form);
      const updatedList = await getEmployees();
      setEmployees(updatedList);
      setForm({ name: "", department: "", salary: "" });
    }
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    const updatedList = await getEmployees();
    setEmployees(updatedList);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Define custom colors for chart slices
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  // Aggregate employee count by department
  const departmentData = Object.values(
    employees.reduce((acc, emp) => {
      const dept = emp.department;
      if (!acc[dept]) acc[dept] = { name: dept, value: 0 };
      acc[dept].value += 1;
      return acc;
    }, {})
  );
  
  return (
    <div className="container">
      {/* Neon Logo */}
      <div className="neon-header">
        <h1 className="neon-title">Optra<span className="HR">HR</span> Dashboard</h1>
        <div class="logout-container">
          <button class="logout-btn"  onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* HR Tip Marquee */}
      <div className=" hr-tip-marquee">
        <div className="marquee-container">
          <p className="marquee-text">
            “Train people well enough so they can leave, treat them well enough so they don't want to.” – Richard Branson
          </p>
        </div>
      </div>


      {/* Add Employee */}
      <div className="card">
        <h2>Add New Employee</h2>
        <div className="form-row">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <input
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>

      {/* Employee List with Search */}
      <div className="card">
        <h2>Employee List</h2>
        <input
          className="search-bar"
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredEmployees.length === 0 ? (
          <p className="no-data">No employees found.</p>
        ) : (
          <ul>
            {filteredEmployees.map((emp) => (
              <li key={emp.id} className="employee-item">
                <div>
                  <p className="emp-name">{emp.name}</p>
                  <p>{emp.department} Department</p>
                  <p>Salary: ₹{emp.salary}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card">
        <h2>Employee Dashboard</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* About Us Section */}
      <div className="card about-section">
        <h2>About Us</h2>
        <p>
          OptraHR is a modern, efficient employee management system designed to simplify HR operations.
          From hiring to tracking employee performance, our platform makes managing your workforce easier and smarter.
        </p>
      </div>

      {/* Blog Preview Section */}
      <div className="card blog-section">
        <h2>Latest HR Insights</h2>
        <ul>
          <li><strong>📘 How to Streamline Employee Onboarding</strong><br /><small>Published: June 10, 2025</small></li>
          <li><strong>💼 5 Ways to Improve Workplace Productivity</strong><br /><small>Published: May 28, 2025</small></li>
          <li><strong>📊 HR Metrics That Matter in 2025</strong><br /><small>Published: May 15, 2025</small></li>
        </ul>
      </div>
      {/* Quick Stats */}
      <div className="card stats-section">
        <h2>Quick Stats</h2>
        <div className="stats-grid">
          <div><strong>Total Employees:</strong> {employees.length}</div>
          <br/>
          <div><strong>Departments:</strong> {new Set(employees.map(e => e.department)).size}</div>
        </div>
      </div>

    </div>
  );
}

