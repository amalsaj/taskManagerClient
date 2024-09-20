import axios from "axios";
const API_URL = "https://taskmanagerserver-cxn2.onrender.com";
const token = localStorage.getItem("token");
console.log(token);

// Register User
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/signUp`, userData);
};

// Login User
export const loginUser = (loginData) => {
  return axios.post(`${API_URL}/auth/login`, loginData);
};

// Google Signup
export const googleSignup = () => {
  return axios.get(`${API_URL}/auth/google`, { withCredentials: true });
};

// Google Login
export const googleLogin = () => {
  return axios.get(`${API_URL}/auth/google`, { withCredentials: true });
};

// Fetch All Tasks
export const fetchTasks = () => {
  return axios.get(`${API_URL}/tasks/getTasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update Task
export const updateTask = (taskId, updatedData) => {
  return axios.put(`${API_URL}/tasks/editTask`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
    params: { taskId },
  });
};

// Create Task
export const createTask = (taskData) => {
  return axios.post(`${API_URL}/tasks/createTask`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete Task
export const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/tasks/deleteTask`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { taskId },
  });
};
