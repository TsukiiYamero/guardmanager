import { /* ZonedDateTime, parseAbsolute, */ parseDateTime, parseZonedDateTime } from "@internationalized/date"

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
        const formatedDate = `${zonedDateTime.year}-${String(zonedDateTime.month).padStart(2, '0')}-${String(zonedDateTime.day).padStart(2, '0')} ${String(zonedDateTime.hour).padStart(2, '0')}:${String(zonedDateTime.minute).padStart(2, '0')}:${String(zonedDateTime.second).padStart(2, '0')}`

        return formatedDate
    }
    return date
}
