import axios from 'axios';

const API_URL = '/api';

const authService = {
  async register(email, password, role = 'student') {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      role
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getCurrentToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getCurrentToken();
  }
};

// Add token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getCurrentToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService; 