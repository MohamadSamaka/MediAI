<<<<<<< HEAD
import axiosInstance from './index.js';


export function getUsers() {
  return axiosInstance.get('/'); 
}

export function createUser(userData) {
  return axiosInstance.post('/users', userData);
}

export function updateUser(userId, userData) {
  return axiosInstance.put(`/users/${userId}`, userData);
}

export function deleteUser(userId) {
  return axiosInstance.delete(`/users/${userId}`);
=======
import axiosInstance from "./index.js";

export async function getUsers() {
  return await axiosInstance.get("/admin/user", {
    withCredentials: true,
  });
}

export async function createUser(userData) {
  try {
    const response = await axiosInstance.post("/admin/user", userData, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.log("error: ", error)
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching location"
    );
  }
}

export async function updateUser(userId, userData) {
  return await axiosInstance.put(`/admin/user/${userId}`, userData, {
    withCredentials: true,
  });
}

export async function deleteUser(userId) {
  return await axiosInstance.delete(`/admin/user/${userId}`, {
    withCredentials: true,
  });
>>>>>>> 3f3d0eedf098e2398cfbf1541f425ce098fb75c1
}
