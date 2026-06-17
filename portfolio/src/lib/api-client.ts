import axios from 'axios';

// Get base URL from environment variables, fallback to local development port
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For cookie-based refresh tokens if needed
});

// Request Interceptor: Attach JWT token to authorization header
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data wrapped inside the standard NestJS wrapper { success, data, message }
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Handle unauthorized session expiration
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // Optional: Trigger logout or redirect to login page if we have a state store
      }
    }

    // Extract error message from standard NestJS exception filters
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(Array.isArray(message) ? message[0] : message));
  }
);
