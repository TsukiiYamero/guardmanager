import type { IAuthState, TAuthAction } from "./auth.types"

export const authReducer = (state: IAuthState, action: TAuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }
}