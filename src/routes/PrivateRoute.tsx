import type { TUserRole } from "@/store/auth/auth.types";
import { useAuthContext } from "@/store/auth/AuthContext"
import { routePaths } from "@/utils/utilities";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoute {
    roles: TUserRole[];
}

export const PrivateRoute: React.FC<PrivateRoute> = ({ roles }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to={routePaths.login} replace={true} />;
    }

    if (!roles.includes(user.role))
        return <Navigate to={routePaths.unauthorized} replace={true} />;

    return (
        <Outlet />
    )
}
