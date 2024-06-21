import { guardsData, locationData } from "@/mocks/schedules.json"
import { IGuard } from "@/types/guards.types"
import { ILocations } from "@/types/locations.types"

export async function getGuardsData(): Promise<IGuard[]> {
    const guards = guardsData

    const guardsFormated = guards.map(guard => ({
        id: guard.id,
        first_name: guard.first_name,
        last_name: guard.last_name,
        full_name: guard.full_name,
        email: guard.email,
    }))

    return guardsFormated
}

export async function getLocationsData(): Promise<ILocations[]> {
    const locations = locationData

    const locationsFormated = locations.map(location => ({
        id: location.id,
        location_name: location.location_name,
        address: location.address,
        city: location.city,
        cellphone: location.cellphone
    }))

    return locationsFormated
}