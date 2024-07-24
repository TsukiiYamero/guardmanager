import { API_CONFIG } from '@/api/config'
import httpClient from '@/api/httpClient'
import { ILocations } from '@/types/locations.types'

export const getLocations = async () => {
    const response = await httpClient.get(`${API_CONFIG.api}${API_CONFIG.locations}/locations`)
    const locations: Array<any> = await response.data;

    const formattedLocations = locations.map(location => ({
        id: location.location_id,
        location_name: location.location_name,
        address: location.address,
        city: location.city,
        cellphone: location.cellphone
    }))
    console.log(formattedLocations);

    return formattedLocations
}

export async function addLocation(data: ILocations) {
    try {
        const response = await httpClient.post(`${API_CONFIG.api}${API_CONFIG.locations}/locations`, data);
        const dataResponse = await response.data
        console.log(dataResponse);
    } catch (error) {
        throw new Error(`No se pudo añadir la ubicación: ${error}`)
    }
}

export async function updateLocation(data: ILocations, id: number) {
    try {
        const response = await httpClient.put(`${API_CONFIG.api}${API_CONFIG.locations}/locations/${id}`, data)
        console.log(response);
    } catch (error) {
        throw new Error(`No se pudo editar la ubicación: ${error}`)
    }
}

export async function removeLocation(id: number | null | undefined) {
    try {
        if (!id)
            throw new Error("Id de ubicación inválido")

        const response = await httpClient.delete(`${API_CONFIG.api}${API_CONFIG.locations}/locations/${id}`);
        const responseData = await response.data
        console.log(responseData);
    } catch (error) {
        throw new Error(`No se pudo eliminar la ubicación: ${error}`)
    }
}
