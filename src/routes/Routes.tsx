
import { TablaHome } from "@/components/tablaHome/TablaHome";
import { Locations } from "@/pages/admin/Locations";
import { Schedules } from "@/pages/admin/Schedules";
import { Workers } from "@/pages/admin/Workers";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { Profile } from "@/pages/Profile";
import { Today } from "@/pages/worker/Today";
import { Week } from "@/pages/worker/Week";
import { routePaths } from "@/utils/utilities";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";


export const routerApp = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path={routePaths.login} element={<Login />} />


            <Route path={routePaths.profile} element={<Profile />} />
            {/* user */}
            <Route path={routePaths.today} element={<Today />} />
            <Route path={routePaths.week} element={<Week />} />
            <Route path={routePaths.home} element={<TablaHome/>} />
            {/* admin */}
            <Route path={routePaths.schedules} element={<Schedules />} />
            <Route path={routePaths.locations} element={<Locations />} />
            <Route path={routePaths.workers} element={<Workers />} />

            <Route path="*" element={<NotFound />} />
        </>
    )
);
