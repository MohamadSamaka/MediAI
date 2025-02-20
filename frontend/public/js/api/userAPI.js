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
}
