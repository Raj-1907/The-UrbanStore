import axios from 'axios';

/**
 * Task 1, 2, 3, 5, 9: Centralized API Configuration
 * Base URL: https://api.escuelajs.co/api/v1
 */
const axiosInstance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for basic error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;