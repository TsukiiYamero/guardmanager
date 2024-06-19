export type TUserRole = 'user' | 'admin';

export enum EUserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface IUser {
    role: TUserRole;
    username: string;
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
