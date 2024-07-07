/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLogin } from "@/services/login.service";
import { getLogout } from "@/services/logout.service";
import { EUserRole } from "@/store/auth/auth.types";
import { useAuthContext } from "@/store/auth/AuthContext";
import { useState } from "react"

export const useLogin = () => {
    const [data, setData] = useState<{ user: { user: string, role: EUserRole, id: string }, token: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLogin = async ({ username, password }: { username: string, password: string }) => {
        try {
            setLoading(true);
            const data = await getLogin({ username, password });
            if (data)
                setData(data);
            else {
                setError('Opps... Algo a salido mal');
                console.error('Faltan datos para setear el usuario');
            }
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        fetchLogin
    }
}

export const useLogout = () => {
    const { logout } = useAuthContext();

    const handdleLogout = () => {
        getLogout()
        logout()
    };

    return handdleLogout;
}