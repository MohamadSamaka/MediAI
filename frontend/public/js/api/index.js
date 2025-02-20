import axios from 'https://cdn.skypack.dev/axios?min';

const port = "3001"
const baseURL = `"http://localhost:${port}/api`

// Create an Axios instance with default configuration.
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,                       
  headers: { 'Content-Type': 'application/json' }
});


 

export default axiosInstance;
