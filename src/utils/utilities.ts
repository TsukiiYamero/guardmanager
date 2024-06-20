import { parseZonedDateTime } from "@internationalized/date"

/* cosas que necesitemos por aparte */
export const routePaths = {
    profile: '/profile',
    /* user */
    today: '/today',
    week: '/week',
    /* admin */
    schedules: '/schedules',
    workers: '/workers',
    locations: '/location',
    /* auth */
    login: '/login',

    unauthorized: '/unauthorized'
}

export const formatInternationalizedDateToSQLDate = (date: string) => {
    const zonedDateTime = parseZonedDateTime(date)
    const formatedDate = `${zonedDateTime.year}-${String(zonedDateTime.month).padStart(2, '0')}-${String(zonedDateTime.day).padStart(2, '0')} ${String(zonedDateTime.hour).padStart(2, '0')}:${String(zonedDateTime.minute).padStart(2, '0')}:${String(zonedDateTime.second).padStart(2, '0')}`

    return formatedDate
}