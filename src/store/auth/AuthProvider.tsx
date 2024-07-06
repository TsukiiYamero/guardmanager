import { EAuthActionType, IAuthState, IUser } from "./auth.types";
import { useReducer, type ReactNode } from "react";
import { AuthContext } from "./AuthContext"
import { authReducer } from "./auth.reducer";
import { removeToken, setToken } from "@/utils/utilities";

const initialState: IAuthState = {
    user: null,
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (user: IUser, token: string) => {
        setToken(token);
        dispatch({ type: EAuthActionType.LOGIN, payload: user });
    };

    const logout = () => {
        removeToken()
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
