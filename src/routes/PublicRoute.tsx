import { EUserRole } from "@/store/auth/auth.types";
import { useAuthContext } from "@/store/auth/AuthContext"
import { routePaths } from "@/utils/utilities";
import { Navigate, Outlet } from "react-router-dom";


export const PublicRoute = () => {
    const { user } = useAuthContext();
    /* admin */
    if (user?.role === EUserRole.ADMIN)
        return <Navigate to={routePaths.schedules} />
    /* usuario */
    if (user?.role === EUserRole.USER)
        return <Navigate to={routePaths.today} />

    return <Outlet />;
}
