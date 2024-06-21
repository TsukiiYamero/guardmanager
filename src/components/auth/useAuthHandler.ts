export const useAuthHandler = () => {
    const authHandler = () => {
        console.log('authHanddle')
    }

    return { authHandler, errorMessage: '', loading: false }
}