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

export const PatternEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// nice pattern at least 8 characters 1 number & 1 letter and is not case sensitive could be a or A
// eslint-disable-next-line prefer-regex-literals
/* 8digitos */
export const PatternPassword = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/g);