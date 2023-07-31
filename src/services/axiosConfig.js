import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
  timeout: 5000, // Set a timeout value in milliseconds
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    // Add any other default headers you need
  },
};

const axiosInstance = axios.create(axiosConfig);

// Custom method to set the user object


export default axiosInstance;
