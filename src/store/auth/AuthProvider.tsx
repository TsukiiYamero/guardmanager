import { EAuthActionType, IAuthState, IUser } from "./auth.types";
import { useEffect, useReducer, type ReactNode } from "react";
import { AuthContext } from "./AuthContext"
import { authReducer } from "./auth.reducer";
import { getToken, getUser, removeToken, removeUser, setToken, setUser } from "@/utils/utilities";

const initialState: IAuthState = {
    user: null,
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = getToken();
        const user = getUser();
        if (token && user) {
            login(user, token);
        }
    }, []);

    const login = (user: IUser, token: string) => {
        setToken(token);
        setUser(user);
        dispatch({ type: EAuthActionType.LOGIN, payload: user });
    };

    const logout = () => {
        removeToken()
        removeUser()
        dispatch({ type: EAuthActionType.LOGOUT });
    };

    return (
        <AuthContext.Provider value={{
            user: state.user, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
