import { API_CONFIG } from "@/api/config"
import httpClient from "@/api/httpClient"

export const getLogout = async () => {
    const response = await httpClient.post(`${API_CONFIG.api}${API_CONFIG.logout}`);

    return response.data;
}