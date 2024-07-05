import { DataTable } from "@/components/dataTable/dataTable";
import { AutocompleteInput } from "@/components/inputs/Autocomplete";
import { CustomDateInput } from "@/components/inputs/Date";
import { FormTableModal } from "@/components/modals/FormTableModal";
import { useConfirmDialog } from "@/customHooks/useConfirmDialog";
import { MainLayout } from "@/layouts/MainLayout"
import { addSchedule, getGuardsData, getLocationsData, getSchedulesData, getShiftsData, updateSchedule } from "@/services/schedule.service";
import { IGuard } from "@/types/guards.types";
import { ILocations } from "@/types/locations.types";
import { IScheduleItem } from "@/types/schedules.types";
import { formatInternationalizedDateToSQLDate } from "@/utils/utilities";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { createSchedule } from '@/helpers/Validations';
import { IShift } from "@/types/shifts.types";


export const Schedules = () => {
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
        const deleteSchedule = await showDialog({
            title: 'Eliminar horario',
            message: '¿Está seguro de eliminar el horario?'
        })

        if (deleteSchedule) {
            setSchedulesItems(prevState => {
                const indexToRemove = prevState.findIndex(schedule => schedule === item)
                return [
                    ...prevState.slice(0, indexToRemove),
                    ...prevState.slice(indexToRemove + 1)
                ]
            })
        }
    }

    const handleEditSubmit: SubmitHandler<IScheduleItem> = async (data) => {
        const endDate = data.end
        if (endDate)
            data.end = formatInternationalizedDateToSQLDate(endDate)!

        const startDate = data.start
        if (startDate)
            data.start = formatInternationalizedDateToSQLDate(startDate)!

        await updateSchedule(data)

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

        await addSchedule(data)

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

    return (
        <MainLayout>
            {dialog}
            <DataTable
                items={schedulesItems}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleAdd={handleAdd}

                //Name of column to filter by the input value
                searchColumn={"name"}
            />
            {isOpen &&
                <FormTableModal
                    data={modalData}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    title={modalData ? "Editar horario" : "Agregar horario"}
                    onSubmit={modalData ? handleEditSubmit : handleAddSubmit}
                    resolver={createSchedule}
                >
                    <div className="flex flex-col gap-5">
                        <div className="form-table-item">
                            <AutocompleteInput
                                items={guardsAutocomplete}
                                name='name'
                                title='Nombre del guarda'
                                initialValue={modalData?.name}
                            />
                        </div>
                        <div className="form-table-item">
                            <CustomDateInput
                                title='Inicio de turno'
                                defaultDate={modalData?.start}
                                name='start'
                            />
                        </div>
                        <div className="form-table-item">
                            <CustomDateInput
                                title='Fin de turno'
                                defaultDate={modalData?.end}
                                name='end'
                            />
                        </div>
                        <div className="form-table-item">
                            <AutocompleteInput
                                items={shiftsAutocomplete}
                                name='shift'
                                title='Horario'
                                initialValue={modalData?.shift}
                            />
                        </div>
                        <div className="form-table-item">
                            <AutocompleteInput
                                items={locationsAutocomplete}
                                name='location'
                                title='Lugar'
                                initialValue={modalData?.location}
                            />
                        </div>
                    </div>
                </FormTableModal>
            }
        </MainLayout>
    )
}
