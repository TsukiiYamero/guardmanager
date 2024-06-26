import { guardsData, locationData, schedulesData, shiftsData } from "@/mocks/schedules.json"
import { IGuard } from "@/types/guards.types"
import { ILocations } from "@/types/locations.types"
import { IScheduleItem } from "@/types/schedules.types"
import { IShift } from "@/types/shifts.types"

export async function getSchedulesData(): Promise<IScheduleItem[]> {
    const schedules = schedulesData

    const schedulesFormated = schedules.map(schedule => ({
        id: schedule.id,
        name: schedule.name,
        start: schedule.start,
        end: schedule.end,
        location: schedule.location,
        shift: schedule.shift.name
    }))

    console.log("datos recargados");
    return schedulesFormated
}

export async function getGuardsData(): Promise<IGuard[]> {
    const guards = guardsData

    const guardsFormated = guards.map(guard => ({
        id: guard.id,
        first_name: guard.first_name,
        last_name: guard.last_name,
        full_name: guard.full_name,
        email: guard.email,
        cellphone: guard.cellphone,
        address: guard.address
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

export async function getShiftsData(): Promise<IShift[]> {
    const shifts = shiftsData

    const shiftsFormated = shifts.map(shift => ({
        id: shift.id,
        shift_name: shift.shift_name,
        start_time: shift.start_time,
        end_time: shift.end_time,
    }))

    return shiftsFormated
}

export async function updateSchedule(data: IScheduleItem) {
    console.log("Updating schedule...");

    return new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log(data)
            resolve()
        }, 1500);
    });
}

export async function addSchedule(data: IScheduleItem) {
    console.log("Adding schedule...");
    
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            console.log(data)
            resolve()
        }, 1500);
    });
}