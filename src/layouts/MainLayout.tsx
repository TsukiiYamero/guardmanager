import { Sidebar } from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {

    return (
        <div>
            <div className="flex">
                <Sidebar />

                <div className="container py-7 px-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
