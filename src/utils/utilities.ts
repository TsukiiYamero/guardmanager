import { /* ZonedDateTime, parseAbsolute, */ parseDateTime, parseZonedDateTime } from "@internationalized/date"
import { tokenName, userName } from "@/api/config"
import { EUserRole } from "@/store/auth/auth.types";

/* cosas que necesitemos por aparte */
export const routePaths = {
    profile: '/profile',
    /* user */
    today: '/today',
    week: '/week',
    home: '/home',

    /* admin */
    schedules: '/schedules',
    workers: '/workers',
    locations: '/location',
    /* auth */
    login: '/login',

    unauthorized: '/unauthorized'
}

export const PatternEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// nice pattern at least 8 characters 1 number & 1 letter and is not case sensitive could be a or A
// eslint-disable-next-line prefer-regex-literals
/* 8digitos */
export const PatternPassword = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/g);

export const formatInternationalizedDateToSQLDate = (date: string | null | undefined) => {
    if (date) {
        let zonedDateTime

        try {
            zonedDateTime = parseZonedDateTime(date)
        } catch (error) {
            zonedDateTime = parseDateTime(date)
            // console.log(zonedDateTime);
        }
        const formatedDate = `${zonedDateTime.year}-${String(zonedDateTime.month).padStart(2, '0')}-${String(zonedDateTime.day).padStart(2, '0')}`

        return formatedDate
    }
    return date
}


export const getToken = () => {
    return localStorage.getItem(tokenName) ? localStorage.getItem(tokenName) : ''
}

export const setToken = (token: string) => {
    if (!token) return;

    localStorage.setItem(tokenName, token)
}

export const removeToken = () => {
    localStorage.removeItem(tokenName)
}

export const getUser = () => {
    const userJson = localStorage.getItem(userName) ? localStorage.getItem(userName) : undefined;
    if (!userJson)
        return userJson

    return JSON.parse(userJson)
}

export const setUser = (data: { user: string, role: EUserRole, id: string }) => {
    if (!data) return;

    const dataToJSON = JSON.stringify(data)

    localStorage.setItem(userName, dataToJSON);
}

export const removeUser = () => {
    localStorage.removeItem(userName)
}