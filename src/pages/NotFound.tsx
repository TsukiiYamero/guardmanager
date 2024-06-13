import { routePaths } from "@/utils/utilities"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="p-10">
            <Link className="text-sky-500" to={routePaths.profile}> - Volver</Link>
        </div>
    )
}
