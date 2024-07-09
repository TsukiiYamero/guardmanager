import { API_CONFIG } from "@/api/config"
import httpClient from "@/api/httpClient"
import { IGuard } from "@/types/guards.types"
import { ILocations } from "@/types/locations.types"
import { IScheduleItem } from "@/types/schedules.types"
import { IShift } from "@/types/shifts.types"
import { IUsers } from "@/types/users.types"

export async function getSchedulesData(): Promise<IScheduleItem[]> {
    const response = await httpClient.get(`${API_CONFIG.api}${API_CONFIG.schedules}/schedules`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schedules: Array<any> = await response.data

    const schedulesFormated = schedules.map(schedule => {
        const name = `${schedule.Guard.first_name} ${schedule.Guard.last_name}`
        const startDate = new Date(schedule.start_date)
        const start = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate() + 1}`
        const endDate = new Date(schedule.end_date)
        const end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate() + 1}`
        
        return {
            id: schedule.schedule_id,
            name,
            start,
            end,
            location: schedule.Location.location_name,
            shift: schedule.Shift.shift_name
        }
    })

    console.log("datos recargados");
    return schedulesFormated
}

export async function getGuardsData(): Promise<IGuard[]> {
    const response = await httpClient.get(`${API_CONFIG.api}${API_CONFIG.guards}`)
    const guards: Array<IGuard & IUsers> = await response.data

    const guardsFormated = guards.map(guard => ({
        id: guard.id,
        first_name: guard.first_name,
        last_name: guard.last_name,
        full_name: `${guard.first_name} ${guard.last_name}`,
        email: guard.email,
        cellphone: guard.cellphone,
        address: guard.address
    }))

    return guardsFormated
}

export async function getLocationsData(): Promise<ILocations[]> {
    const response = await httpClient.get(`${API_CONFIG.api}${API_CONFIG.locations}/locations`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const locations: Array<any> = await response.data

    const locationsFormated = locations.map(location => ({
        id: location.location_id,
        location_name: location.location_name,
        address: location.address,
        city: location.city,
        cellphone: location.cellphone
    }))

    return locationsFormated
}

export async function getShiftsData(): Promise<IShift[]> {
    const response = await httpClient.get(`${API_CONFIG.api}${API_CONFIG.shifts}`)
    const shifts: Array<IShift> = await response.data

    const shiftsFormated = shifts.map(shift => ({
        id: shift.id,
        shift_name: shift.shift_name,
        start_time: shift.start_time,
        end_time: shift.end_time,
    }))

    return shiftsFormated
}

interface IAddSchedule {
    id: number,
    startDate: string,
    endDate: string,
    location_id: number,
    shift_id: number,
    guard_id: number
}

export async function updateSchedule({
    id,
    startDate,
    endDate,
    location_id,
    shift_id,
    guard_id
}: IAddSchedule) {
    console.log("Updating schedule...");
    const response = await httpClient.put(`${API_CONFIG.api}${API_CONFIG.schedules}/schedules/${id}`, {
        id,
        start_date: startDate,
        end_date: endDate,
        location_id,
        shift_id,
        guard_id
    })
    const schedules = await response.data
    console.log(schedules);
}

export async function addSchedule({
    id,
    startDate,
    endDate,
    location_id,
    shift_id,
    guard_id
}: IAddSchedule) {
    console.log("Adding schedule...");
    const response = await httpClient.post(`${API_CONFIG.api}${API_CONFIG.schedules}/schedules/`, {
        id,
        start_date: startDate,
        end_date: endDate,
        location_id,
        shift_id,
        guard_id
    })
    const schedules = await response.data
    console.log(schedules);
}

export async function deleteSchedule(id: number) {
    const response = await httpClient.delete(`${API_CONFIG.api}${API_CONFIG.schedules}/schedules/${id}`)
    const responseData = await response.data
    console.log(responseData);
}
