
import { API_CONFIG } from '@/api/config';
import httpClient from '@/api/httpClient';
import { IUsers } from '@/types/users.types';

export const getUserProfile = async (token: string, Id: number): Promise<IUsers> => {
    const response = await httpClient.get(`${API_CONFIG.api}/admins/${Id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const updateUserProfile = async (token: string, Id: number, data: IUsers): Promise<void> => {
    try {
        await httpClient.put(`${API_CONFIG.api}/admins/${Id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        throw new Error(`No se pudo actualizar el perfil del usuario: ${error}`);
    }
};
