import { API_CONFIG } from '@/api/config'
import httpClient from '@/api/httpClient'
// import { guardsData } from '@/mocks/schedules.json'
import { IGuard } from '@/types/guards.types'
import { IUsers } from '@/types/users.types'

export const getWorkers = async () => {
    // const response: Response = await fetch(`${API_ENDPOINT}/guards`)
    const response = await httpClient.get(`${API_CONFIG.api}${API_CONFIG.guards}`)
    const workers: Array<IGuard & IUsers> = await response.data;

    const formatedWorkers = workers.map(data => ({
        id: data.id,
        full_name: `${data.first_name} ${data.last_name}`,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        cellphone: data.cellphone,
        address: data.address,
        username: data.username
    }))
    console.log(formatedWorkers);


    return formatedWorkers
}

export async function addWorker(data: IGuard) {
    console.log("Adding worker...");
    // console.log(data);
    try {
        /* const response = await fetch(`${API_ENDPOINT}/guards`, {
            method: "POST",
            headers: {
                "content-type": 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        }) */
        const response = await httpClient.post(`${API_CONFIG.api}${API_CONFIG.guards}`, data);
        const dataReponse = await response.data
        console.log(dataReponse);
    } catch (error) {
        throw new Error(`No se pudo añadir el guardia: ${error}`)
    }
}

export async function updateWorker(data: IGuard, id: number) {
    console.log("Updating worker...");
    // console.log(data, id)
    try {
        /* const response = await fetch(`${API_ENDPOINT}/guards/${id}`, {
            method: "PUT",
            headers: {
                "content-type": 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(data)
        }) */
        const response = await httpClient.put(`${API_CONFIG.api}${API_CONFIG.guards}/${id}`, data)
        console.log(response);
    } catch (error) {
        throw new Error(`No se pudo editar el guardia: ${error}`)
    }
}

export async function removeWorker(id: number | null | undefined) {
    try {
        if (!id)
            throw new Error("Id de guardia inválido")

        /* const response = await fetch(`${API_ENDPOINT}/guards/${id}`, {
            method: "DELETE"
        }) */
        const response = await httpClient.delete(`${API_CONFIG.api}${API_CONFIG.guards}/${id}`);
        const responseData = await response.data
        console.log(responseData);
    } catch (error) {
        throw new Error(`No se pudo editar el guardia: ${error}`)
    }
}