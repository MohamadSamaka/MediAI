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
}
