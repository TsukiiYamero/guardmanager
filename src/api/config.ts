/* configuracion de la conexion de la api */

/* localstorage Names */
export const tokenName = 'authToken';
export const userName = 'authUser';

export const API_CONFIG = {
    baseUrl: 'https://guardmanager.jeanpaultc.tech',
    // baseUrl: 'http://localhost:3900',
    api: "/api",
    login: '/login',
    logout: '/logout',
    guards: '/guards',
    schedules: '/schedules',
    locations: '/location',
    shifts: '/shifts',
    auth: {
        username: 'XXXXXXXX',
        password: 'XXXXXXXX'
    }
};

// export const API_ENDPOINT = "https://guardmanager.jeanpaultc.tech/api"
// export const API_ENDPOINT = "https://ec2-34-203-40-176.compute-1.amazonaws.com/api"
// export const API_ENDPOINT = "http://localhost:3900/api"
