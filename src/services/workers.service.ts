import { guardsData } from '@/mocks/schedules.json'
import { IGuard } from '@/types/guards.types'

export const getWorkers = async () => {
    const workers = guardsData

    const formatedWorkers = workers.map(data => ({
        id: data.id,
        full_name: data.full_name,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        cellphone: data.cellphone,
        address: data.address
    }))

    return formatedWorkers
}

export async function addWorker(data: IGuard) {
    console.log("Adding worker...");
    
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log(data)
            resolve()
        }, 1500);
    });
}

export async function updateWorker(data: IGuard) {
    console.log("Updating worker...");
    
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log(data)
            resolve()
        }, 1500);
    });
}