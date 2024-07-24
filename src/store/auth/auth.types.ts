export type TUserRole = EUserRole.USER | EUserRole.ADMIN;

export enum EUserRole {
    USER = 'guard',
    ADMIN = 'admin',
}

export interface IUser {
    role: TUserRole;
    user: string;
    id: string;
}
export enum EAuthActionType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

export type TAuthAction =
    | { type: EAuthActionType.LOGIN; payload: IUser }
    | { type: EAuthActionType.LOGOUT };

export interface IAuthState {
    user: IUser | null;
}
