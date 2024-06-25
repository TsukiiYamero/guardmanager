import { TablaHome } from "@/components/tablaHome/TablaHome"
import { MainLayout } from "@/layouts/MainLayout"

export const Today = () => {
    return (
        <MainLayout>
            <div className="h-full flex items-center">
                <TablaHome />
            </div>
        </MainLayout>
    )
}
