// src/services/api.js
import axios from 'axios';

// Configuração básica do Axios para a API
const api = axios.create({
  baseURL: 'http://localhost:7057/api', // URL base da sua API C#
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
