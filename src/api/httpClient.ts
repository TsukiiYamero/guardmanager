import axios, { AxiosInstance } from 'axios';
import { API_CONFIG, tokenName } from './config';

const httpClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.baseUrl, // Usa variables de entorno para mayor flexibilidad
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use(config => {
    const token = localStorage.getItem(tokenName);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Manejo de errores global
        return Promise.reject(error);
    }
);

export default httpClient;