import { useConfirmDialog } from "@/customHooks/useConfirmDialog";
import { addSchedule, deleteSchedule, getGuardsData, getLocationsData, getSchedulesData, getShiftsData, updateSchedule } from "@/services/schedule.service";
import { IGuard } from "@/types/guards.types";
import { ILocations } from "@/types/locations.types";
import { IScheduleItem } from "@/types/schedules.types";
import { formatInternationalizedDateToSQLDate } from "@/utils/utilities";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { IShift } from "@/types/shifts.types";

export const useSchedules = () => {
    const [schedulesItems, setSchedulesItems] = useState<IScheduleItem[]>([])
    const [modalData, setModalData] = useState<IScheduleItem | null>(null)
    const [guards, setGuards] = useState<IGuard[]>([])
    const [locations, setLocations] = useState<ILocations[]>([])
    const [shifts, setShifts] = useState<IShift[]>([])
    const [reloadData, setReloadData] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { dialog, showDialog } = useConfirmDialog()

    useEffect(() => {
        getSchedulesData().then(data => setSchedulesItems(data))
    }, [reloadData])

    const handleAdd = () => {
        setModalData(null)
        onOpen()
    }
    const handleEdit = (item: IScheduleItem) => {
        setModalData(item)
        onOpen()
    }
    const handleDelete = async (item: IScheduleItem) => {
        const removeSchedule = await showDialog({
            title: 'Eliminar horario',
            message: '¿Está seguro de eliminar el horario?'
        })

        if (removeSchedule) {
            await deleteSchedule(item.id || 0)
            setReloadData(!reloadData)
        }
    }

    const handleEditSubmit: SubmitHandler<IScheduleItem> = async (data) => {
        const endDate = data.end
        if (endDate)
            data.end = formatInternationalizedDateToSQLDate(endDate)!

        const startDate = data.start
        if (startDate)
            data.start = formatInternationalizedDateToSQLDate(startDate)!

        console.log(data);
        const location_id = locations.find(location => location.location_name === data.location)?.id ?? 0
        const shift_id = shifts.find(shift => shift.shift_name === data.shift)?.id ?? 0
        const guard_id = guards.find(guard => guard.full_name === data.name)?.id ?? 0
        
        await updateSchedule({ 
            id: modalData?.id ?? 0,
            startDate: data.start, 
            endDate: data.end,
            location_id,
            shift_id,
            guard_id 
        })
        setReloadData(!reloadData)
        onOpenChange()
    }

    const handleAddSubmit: SubmitHandler<IScheduleItem> = async (data) => {
        const endDate = data.end
        if (endDate)
            data.end = formatInternationalizedDateToSQLDate(endDate)!

        const startDate = data.start
        if (startDate)
            data.start = formatInternationalizedDateToSQLDate(startDate)!

        const location_id = locations.find(location => location.location_name === data.location)?.id ?? 0
        const shift_id = shifts.find(shift => shift.shift_name === data.shift)?.id ?? 0
        const guard_id = guards.find(guard => guard.full_name === data.name)?.id ?? 0
        
        await addSchedule({ 
            id: modalData?.id ?? 0,
            startDate: data.start, 
            endDate: data.end,
            location_id,
            shift_id,
            guard_id 
        })

        setReloadData(!reloadData)
        onOpenChange()
    }

    useEffect(() => {
        getGuardsData().then(data => setGuards(data))
        getLocationsData().then(data => setLocations(data))
        getShiftsData().then(data => setShifts(data))
    }, [])

    const guardsAutocomplete = useMemo(() => guards.map(guard => ({
        id: guard.id,
        name: guard.full_name
    })), [guards])

    const shiftsAutocomplete = useMemo(() => shifts.map(shift => ({
        id: shift.id,
        name: shift.shift_name
    })), [shifts])

    const locationsAutocomplete = useMemo(() => locations.map(location => ({
        id: location.id,
        name: location.location_name
    })), [locations])

    return {
        schedulesItems,
        modalData,
        isOpen,
        dialog,
        onOpenChange,
        handleAdd,
        handleEdit,
        handleDelete,
        handleEditSubmit,
        handleAddSubmit,
        guardsAutocomplete,
        shiftsAutocomplete,
        locationsAutocomplete
    }
}