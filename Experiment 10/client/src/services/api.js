import axios from 'axios';

const API_URL = '/api';

// Auth Services
export const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get(`${API_URL}/auth/profile`);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axios.put(`${API_URL}/auth/profile`, userData);
    return response.data;
  },
};

// Post Services
export const postService = {
  uploadPost: async (formData) => {
    const response = await axios.post(`${API_URL}/posts/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  analyzePost: async (postId, data) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/analyze`, data);
    return response.data;
  },

  getPosts: async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  getPost: async (postId) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
  },

  deletePost: async (postId) => {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    return response.data;
  },

  updateMetrics: async (postId, metrics) => {
    const response = await axios.put(`${API_URL}/posts/${postId}/metrics`, metrics);
    return response.data;
  },
};
