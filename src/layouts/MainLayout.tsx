import { routePaths } from "@/utils/utilities"
import { ChangeEvent, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom"


const routes: Array<{
    path: string,
    title: string
}> = [
        {
            path: routePaths.login,
            title: 'Login'
        }, {
            path: routePaths.profile,
            title: 'Perfil'
        },
        {
            path: routePaths.today,
            title: 'Horario Trabajador'
        }, {
            path: routePaths.week,
            title: 'Semana'
        },
        /* Admin */
        {
            path: routePaths.schedules,
            title: 'Horarios admin'
        }, {
            path: routePaths.locations,
            title: 'Locaciones'
        }, {
            path: routePaths.workers,
            title: 'Trabajadores'
        }
    ]

export const MainLayout = ({ children }: { children: ReactNode }) => {
    const [input, setinput] = useState('');

    const handdleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setinput(e.target.value)
    }

    return (
        <div>
            <div>
                <nav>
                    menu lateral, navegacion provicional
                    <ul className="nav-temp flex gap-2">
                        {
                            routes.map((route, index) => (
                                <li key={index}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "active" : ""
                                        }
                                        to={route.path}>
                                        {
                                            route.title
                                        }
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <input type="text" value={input} onChange={handdleInput} />

                <div className="container pt-7">
                    {children}
                </div>
            </div>
        </div>
    )
}
