// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const registerAdmin = (data) => api.post('/auth/register', data);
export const getAdminProfile = () => api.get('/auth/profile');

// Project APIs
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Skill APIs
export const getSkills = () => api.get('/skills');
export const createSkill = (data) => api.post('/skills', data);

// Contact APIs
export const sendContact = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');

// Testimonial APIs
export const getTestimonials = () => api.get('/testimonials');
export const createTestimonial = (data) => api.post('/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);
