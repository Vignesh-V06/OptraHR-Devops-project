import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "./firebase";

export const submitLeaveRequest = async (leaveData) => {
  return await addDoc(collection(db, "leaveRequests"), {
    ...leaveData,
    status: "pending",
    submittedAt: serverTimestamp()
  });
};

export const getUserLeaveRequests = async (userId) => {
  const q = query(collection(db, "leaveRequests"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const getAllLeaveRequests = async () => {
  const snapshot = await getDocs(collection(db, "leaveRequests"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update leave request status
export const updateLeaveStatus = async (id, newStatus) => {
  const ref = doc(db, "leaveRequests", id);
  await updateDoc(ref, { status: newStatus });
};

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

