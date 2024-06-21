import { DataTable } from "@/components/dataTable/dataTable";
import { FormTableModal } from "@/components/modal/formTableModal";
import { MainLayout } from "@/layouts/MainLayout"
import { schedules } from '@/mocks/schedules.json'
import { IScheduleItem } from "@/types/schedules.types";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const Schedules = () => {
    const [schedulesItems, setSchedulesItems] = useState<IScheduleItem[]>([])
    const [modalData, setModalData] = useState<IScheduleItem>()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        setSchedulesItems(schedules)
    }, [])

    const handleEdit = (item: IScheduleItem) => {
        console.log(item)
        setModalData(item)
        onOpen()
    }
    const handleDelete = (item: IScheduleItem) => {
        setSchedulesItems(prevState => {
            const indexToRemove = prevState.findIndex(schedule => schedule === item)
            return [
                ...prevState.slice(0, indexToRemove),
                ...prevState.slice(indexToRemove + 1)
            ]
        })
    }
    // console.log("schedulesItems: ", schedulesItems);

    return (
        <MainLayout>
            <DataTable
                items={schedulesItems}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            {isOpen &&
                <FormTableModal
                    data={modalData}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    title="Editar horario"
                />
            }
            {/* <div>
                Horarios Admin
            </div> */}
        </MainLayout>
    )
}
