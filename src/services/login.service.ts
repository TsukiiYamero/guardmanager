import { API_CONFIG } from "@/api/config"
import httpClient from "@/api/httpClient"

export const getLogin = async (userCredentials: { username: string, password: string }) => {
    const response = await httpClient.post(`${API_CONFIG.api}${API_CONFIG.login}`, userCredentials);

    return response.data;
}