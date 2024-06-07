import type { LoginI } from "@/types/login.types";
import { createContext, useContext } from "react";

export const AuthContext = createContext<LoginI>(null!);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }

    return context;
}