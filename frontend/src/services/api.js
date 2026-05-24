// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getTasks = () => api.get('/tasks').then(res => res.data);

export const createTask = (task) => api.post('/tasks', task).then(res => res.data);

export const updateTask = (id, task) => api.put(`/tasks/${id}`, task).then(res => res.data);

export const deleteTask = (id) => api.delete(`/tasks/${id}`).then(res => res.data);