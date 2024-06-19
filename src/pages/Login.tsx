import { useAuthContext } from "@/store/auth/AuthContext"
import { Button } from "@nextui-org/react";

export const Login = () => {
    const { login } = useAuthContext();

    const loginAdmin = () => {
        login({ username: 'admin', role: 'admin', id: 'admin' })
    }

    const loginUser = () => {
        login({ username: 'user', role: 'user', id: 'user' })
    }


    return (
        <div className="flex items-center p-10 gap-2">

            <Button onClick={loginAdmin}>Login Admin</Button>
            <Button onClick={loginUser}>Login User</Button>

        </div>
    )
}