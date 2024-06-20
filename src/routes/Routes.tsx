import { Locations } from "@/pages/admin/Locations";
import { Schedules } from "@/pages/admin/Schedules";
import { Workers } from "@/pages/admin/Workers";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { Profile } from "@/pages/Profile";
import { Unauthorized } from "@/pages/Unauthorized";
import { Today } from "@/pages/worker/Today";
import { Week } from "@/pages/worker/Week";
import { routePaths } from "@/utils/utilities";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { TablaHome } from "@/components/tablaHome/TablaHome";



export const routerApp = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Navigate to={routePaths.login} />} />

            <Route path={routePaths.login} element={<PublicRoute />}>
                <Route index element={<Login />} />
            </Route>

            <Route element={<PrivateRoute roles={['user', 'admin']} />}>
                <Route path={routePaths.profile} element={<Profile />} />
            </Route>

            {/* user */}
            <Route path={routePaths.today} element={<Today />} />
            <Route path={routePaths.week} element={<Week />} />
            <Route path={routePaths.home} element={<TablaHome />} />
            <Route element={<PrivateRoute roles={['user']} />}>
                <Route path={routePaths.today} element={<Today />} />
                <Route path={routePaths.week} element={<Week />} />
            </Route>
            {/* admin */}
            <Route element={<PrivateRoute roles={['admin']} />}>
                <Route path={routePaths.schedules} element={<Schedules />} />
                <Route path={routePaths.locations} element={<Locations />} />
                <Route path={routePaths.workers} element={<Workers />} />
            </Route>

            <Route path={routePaths.unauthorized} element={<Unauthorized />} />

            <Route path="*" element={<NotFound />} />
        </>
    )
);
