
import TablaWeek from "@/components/tablaWeek/TablaWeek"
import { MainLayout } from "@/layouts/MainLayout"

export const Week = () => {
    return (
        <MainLayout>
             <div className="h-full flex items-center">
                <TablaWeek/>
            </div>
        </MainLayout>
    )
}
