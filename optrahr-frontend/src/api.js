const API_BASE_URL = "http://localhost:8082/api/employees";

export async function getEmployees() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch employees");
  return await response.json();
}

export async function addEmployee(employee) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error("Failed to add employee");
}

export async function deleteEmployee(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete employee");
}

export async function updateEmployee(id, updatedData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Failed to update employee");
  return await response.json();
}

