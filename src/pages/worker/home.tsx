import { TablaHome } from "@/components/tablaHome/TablaHome"
import { MainLayout } from "@/layouts/MainLayout"

export const home = () => {
    return (
        <MainLayout>
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center">
                    <TablaHome />
                </div>
            </div>
        </MainLayout>
    )
}