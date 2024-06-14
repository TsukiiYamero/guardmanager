import { IUser } from "@/store/auth/auth.types";
import { createContext, useContext } from "react";

interface AuthContextType {
    user: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }

    return context;
}