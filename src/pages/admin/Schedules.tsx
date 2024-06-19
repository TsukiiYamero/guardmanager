import { DataTable } from "@/components/dataTable/dataTable";
import { MainLayout } from "@/layouts/MainLayout"
import schedules from '@/mocks/schedules.json'

interface IScheduleItem {
    id: number
    name: string
    inicio: string
    fin: string
    ubicacion: string
}


export const Schedules = () => {
    console.log(schedules);

    const handleEdit = (item: IScheduleItem) => {
        console.log(item);
    }
    const handleDelete = (item: IScheduleItem) => {
        console.log(item);
    }
    
    return (
        <MainLayout>
            <DataTable 
                items={schedules}
                handleEdit={handleEdit}  
                handleDelete={handleDelete}
            />
            {/* <div>
                Horarios Admin
            </div> */}
        </MainLayout>
    )
}
