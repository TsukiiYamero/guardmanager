import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config';

const httpClient: AxiosInstance = axios.create({
    baseURL: API_CONFIG.baseUrl, // Usa variables de entorno para mayor flexibilidad
    /* withCredentials: true, */
    headers: {
        'Content-Type': 'application/json',
    },
});



httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Manejo de errores global
        return Promise.reject(error);
    }
);

export default httpClient;