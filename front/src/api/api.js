import axios from 'axios';




const api = axios.create({
  baseURL: process.env.NODE_ENV ? 'http://localhost:8080/api' : '',
  headers: {
    'Content-Type': 'application/json',
  }
});


export const saveService = (formData) => api.post('/service', formData);

export const getServiceAdminList = () => api.get('/service/all');

export const getManagerList = () => api.get('/manager/list');

export const getListByManager = (id) => api.get(`/manager/list/${id}`);

export const finishTicket = (id, ticketId) => api.patch(`/manager/close/${id}`, { ticketId });

export const removeTicket = (ticketId) => api.delete(`/manager/${ticketId}`);

export const updateTicket = (ticketId, formData, userId) => api.patch(`/manager/edit/ticket/${ticketId}/${userId}`, formData);

export const assignManager = (data) => api.patch('/manager/assign', data);

export const login = (formData) => api.post('/login', formData);
