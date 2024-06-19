import axios from 'axios';

// Base URL for the API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://localhost:7101/api', // Use environment variables for configuration
  withCredentials: true // Ensure cookies are sent with requests
});

// Request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
getBooks: async () => {
  const response = await fetch('/api/books');
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
},


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await axios.post('/Klient/refresh-token', {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          },
          withCredentials: true
        });
        const { authToken } = response.data;
        localStorage.setItem('authToken', authToken);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + authToken;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export default api;
