import axios from 'axios';

const api = axios.create({
  // In production (same origin), use relative /api. In dev, use env var pointing to localhost:5000
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
