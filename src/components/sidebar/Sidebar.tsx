import { routePaths } from "@/utils/utilities"
import './sidebar.css';
import { NavLink } from "react-router-dom"
import { IconCalendarEvent, IconHome, IconLogout, IconMapPin, IconSettings, IconUsers } from '@tabler/icons-react';
import { Button } from "@nextui-org/react";
import { useAuthContext } from "@/store/auth/AuthContext";
import { EUserRole, TUserRole } from "@/store/auth/auth.types";


const routes: Array<{
    path: string,
    title: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any,
    role: Array<TUserRole>
}> = [
        {
            path: routePaths.today,
            title: 'Horario',
            icon: IconHome,
            role: [EUserRole.USER]
        }, {
            path: routePaths.week,
            title: 'Semana',
            icon: IconCalendarEvent,
            role: [EUserRole.USER]
        },

        /* Admin */
        {
            path: routePaths.schedules,
            title: 'Horarios',
            icon: IconCalendarEvent,
            role: [EUserRole.ADMIN]
        }, {
            path: routePaths.workers,
            title: 'Trabajadores',
            icon: IconUsers,
            role: [EUserRole.ADMIN]
        }, {
            path: routePaths.locations,
            title: 'Lugares',
            icon: IconMapPin,
            role: [EUserRole.ADMIN]
        },
        {
            path: routePaths.profile,
            title: 'Settings',
            icon: IconSettings,
            role: [EUserRole.USER, EUserRole.ADMIN]
        }
    ]

export const Sidebar = () => {

    const { user } = useAuthContext();

    const filteredRoutes = !user
        ? []
        : routes.filter(route => route.role.includes(user.role))


    return (
        <div className="w-[220px] min-h-[100vh]" style={{
            border: '1px solid #ccc'
        }}>
            <div className="flex flex-col sidebar gap-10 h-full py-2 px-3">
                <div className="flex flex-col gap-5 avatar pt-7 text-center">
                    <div className="h-[150px]">
                        <img src="" alt="" />
                    </div>

                    <p className="">Diego Bello</p>
                </div>

                <div className="flex flex-col justify-between flex-grow pt-12">
                    <nav>
                        <ul className="flex flex-col gap-4">
                            {
                                filteredRoutes.map((route, index) => (
                                    <li key={index} className="item-menu">
                                        <NavLink className={({ isActive }) => `${isActive ? 'item-active' : ''} flex gap-2 items-center px-3 py-3`} to={route.path}>
                                            <route.icon />
                                            <p>{route.title}</p>
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>

                    <div className="flex flex-col pb-3">
                        <Button className="flex justify-start gap-4 text-[--text-color-dark]">
                            <IconLogout />

                            <p>Log out</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
