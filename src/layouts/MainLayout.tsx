import { routePaths } from "@/utils/utilities"
import { NavLink } from "react-router-dom"

const routes = [
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

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
                                        {route.title}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className="container pt-7">
                    {children}
                </div>
            </div>
        </div>
    )
}
