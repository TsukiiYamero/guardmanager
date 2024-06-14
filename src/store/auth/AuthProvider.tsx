import { EAuthActionType, IAuthState, IUser } from "./auth.types";
import { useReducer, type ReactNode } from "react";
import { AuthContext } from "./AuthContext"
import { authReducer } from "./auth.reducer";

const initialState: IAuthState = {
    user: null,
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (user: IUser) => {
        dispatch({ type: EAuthActionType.LOGIN, payload: user });
    };

    const logout = () => {
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
