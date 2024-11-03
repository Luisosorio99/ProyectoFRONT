// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://proyectoback-1.onrender.com/api', // URL base del backend
});

export default api;