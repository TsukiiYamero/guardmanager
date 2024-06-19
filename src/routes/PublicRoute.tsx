import { useAuthContext } from "@/store/auth/AuthContext"
import { routePaths } from "@/utils/utilities";
import { Navigate, Outlet } from "react-router-dom";


export const PublicRoute = () => {
    const { user } = useAuthContext();

    if (user?.role === 'admin')
        return <Navigate to={routePaths.schedules} />

    if (user?.role === 'user')
        return <Navigate to={routePaths.today} />

    return <Outlet />;
}
