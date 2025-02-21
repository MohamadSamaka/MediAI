import axios from 'https://cdn.skypack.dev/axios?min';

const port = "3001"
const baseURL = `http://localhost:${port}/api`

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,                       
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Ensures cookies (like the refresh token) are sent
});


 

export default axiosInstance;
