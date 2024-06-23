import { DataTable } from "@/components/dataTable/dataTable";
import { FormTableModal } from "@/components/scheduleModal/FormTableModal";
import { useConfirmDialog } from "@/customHooks/useConfirmDialog";
import { MainLayout } from "@/layouts/MainLayout"
import { addSchedule, getSchedulesData, updateSchedule } from "@/services/schedule.service";
import { IScheduleItem } from "@/types/schedules.types";
import { formatInternationalizedDateToSQLDate } from "@/utils/utilities";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const Schedules = () => {
    const [schedulesItems, setSchedulesItems] = useState<IScheduleItem[]>([])
    const [modalData, setModalData] = useState<IScheduleItem | null>(null)
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

        if(deleteSchedule){
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
                />
            }
        </MainLayout>
    )
}
